import { NextResponse } from 'next/server';
import { verifyJWT, signJWT } from '@/lib/auth';
import { cookies } from 'next/headers';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const { email, otp, token } = await request.json();
    
    // 1. Verify the temporary token format and expiration
    const payload = await verifyJWT(token);
    
    if (!payload || payload.email !== email) {
      return NextResponse.json({ error: 'Invalid or expired OTP session. Please request a new code.' }, { status: 400 });
    }

    // 2. Verify the OTP hash
    const secret = process.env.JWT_SECRET || 'fallback-secret-for-development-only-please-change-in-production';
    const expectedHash = crypto.createHash('sha256').update(otp + secret).digest('hex');
    
    if (payload.hash !== expectedHash) {
      return NextResponse.json({ error: 'Incorrect OTP code.' }, { status: 400 });
    }

    // 3. OTP is valid! Create the actual 24-hour admin session
    const sessionToken = await signJWT({ email, role: 'admin' }, '24h');

    // 4. Set HttpOnly secure cookie
    const cookieStore = await cookies();
    cookieStore.set('admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/'
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json({ error: 'Failed to verify OTP' }, { status: 500 });
  }
}

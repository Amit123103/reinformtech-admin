import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { signJWT } from '@/lib/auth';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    // We don't even need to read the requested email anymore. 
    // It ALWAYS goes to the owner.
    const adminEmail = process.env.ADMIN_EMAIL || process.env.GMAIL_EMAIL;

    if (!adminEmail) {
      return NextResponse.json({ error: 'Admin email is not configured on the server.' }, { status: 500 });
    }

    // Generate a secure 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Send the OTP via email directly to the adminEmail
    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Admin Login OTP</h2>
        <p>Someone requested to log into the Admin Dashboard. Your One-Time Password is:</p>
        <h1 style="letter-spacing: 0.2em; color: #4F46E5;">${otp}</h1>
        <p>This code expires in 5 minutes.</p>
      </div>
    `;
    
    await sendEmail({ 
      to: adminEmail, 
      subject: 'Your Admin Dashboard Login Code', 
      html 
    });

    // Hash the OTP with a secret to send to the client securely
    const secret = process.env.JWT_SECRET || 'fallback-secret-for-development-only-please-change-in-production';
    const otpHash = crypto.createHash('sha256').update(otp + secret).digest('hex');

    // Create a temporary JWT (valid for 5 mins) containing the master admin email and the hash
    const token = await signJWT({ email: adminEmail.toLowerCase(), hash: otpHash }, '5m');

    return NextResponse.json({ success: true, token, email: adminEmail });
  } catch (error) {
    console.error("Error requesting OTP:", error);
    return NextResponse.json({ error: 'Failed to request OTP' }, { status: 500 });
  }
}

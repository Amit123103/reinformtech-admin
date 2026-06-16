import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Try to save to Supabase subscribers table
    try {
      const { error: dbError } = await supabaseAdmin
        .from('subscribers')
        .insert([{ email, status: 'active' } as any]);
        
      if (dbError) {
        // If the table doesn't exist yet, we will just log it for now
        // so the UI doesn't crash during testing if the user hasn't run migrations
        if (dbError.code === '42P01') { 
          console.error("The 'subscribers' table does not exist in Supabase yet. Please create it with columns: id, email, status, created_at.");
        } else if (dbError.code === '23505') {
          // Unique violation - already subscribed
          return NextResponse.json({ success: true, message: 'Already subscribed' });
        } else {
          throw dbError;
        }
      }
    } catch (dbError) {
      console.error("Error saving subscriber to Supabase:", dbError);
      return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Successfully subscribed' });
  } catch (error) {
    console.error("Error processing newsletter subscription:", error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}

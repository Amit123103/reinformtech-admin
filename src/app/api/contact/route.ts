import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { sendEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // 1. Store in Supabase
    let docId = 'pending';
    try {
      const { data: dbData, error: dbError } = await supabaseAdmin
        .from('projects')
        .insert([{
          ...data,
          status: 'new'
        }])
        .select()
        .single();
        
      if (dbError) throw dbError;
      if (dbData) docId = dbData.id;
    } catch (dbError) {
      console.error("Error saving to Supabase:", dbError);
      // We continue even if DB fails, to try sending the email
    }

    // 2. Send Email to Admin (reinformtech@gmail.com)
    const adminHtml = `
      <h2>New Project Request</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Company:</strong> ${data.company || 'N/A'}</p>
      <p><strong>Service Needed:</strong> ${data.service}</p>
      <p><strong>Budget:</strong> ${data.budget}</p>
      <p><strong>Timeline:</strong> ${data.timeline}</p>
      <h3>Details:</h3>
      <p>${data.details}</p>
      <hr />
      <p><small>Firebase Doc ID: ${docId}</small></p>
    `;

    await sendEmail({
      to: 'reinformtech@gmail.com', // Admin email
      subject: `New Project Request from ${data.name}`,
      html: adminHtml,
    });

    // 3. Send Auto-Reply to Client
    const clientHtml = `
      <h2>Hi ${data.name},</h2>
      <p>Thank you for reaching out to ReInformTech! We have received your project request regarding <strong>${data.service}</strong>.</p>
      <p>One of our technical partners will review your details and get back to you within 24 hours to discuss the next steps.</p>
      <br/>
      <p>Best regards,</p>
      <p><strong>The ReInformTech Team</strong></p>
      <p><a href="https://reinformtech.com">reinformtech.com</a></p>
    `;

    await sendEmail({
      to: data.email, // Client email
      subject: 'We received your project request - ReInformTech',
      html: clientHtml,
    });

    return NextResponse.json({ success: true, id: docId });
  } catch (error) {
    console.error("Error processing contact request:", error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}

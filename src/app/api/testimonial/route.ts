import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Store in Supabase
    const { data: dbData, error } = await supabaseAdmin
      .from('testimonials')
      .insert([{
        ...data,
        approved: true // Admin can insert pre-approved testimonials
      } as any])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, id: dbData?.id });
  } catch (error) {
    console.error("Error saving testimonial:", error);
    return NextResponse.json({ error: 'Failed to save testimonial' }, { status: 500 });
  }
}

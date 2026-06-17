import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    if (!data.name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const { data: newClient, error } = await supabaseAdmin
      .from('clients')
      .insert([
        {
          name: data.name,
          logo_url: data.logo_url || null,
        }
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: 'Failed to create client' }, { status: 500 });
    }

    return NextResponse.json({ success: true, client: newClient });
  } catch (error) {
    console.error("Error creating client:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

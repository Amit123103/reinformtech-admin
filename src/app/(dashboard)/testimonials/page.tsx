import { supabaseAdmin } from "@/lib/supabase/server";
import { TestimonialsClient } from "./TestimonialsClient"; // Client component for interactively editing testimonials

export default async function TestimonialsPage() {
  const { data: testimonials, error } = await supabaseAdmin
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    if (error.code === '42P01') {
      console.warn("Testimonials table doesn't exist yet.");
    } else {
      console.error("Error fetching testimonials:", error);
    }
  }

  const list = testimonials || [];

  return <TestimonialsClient initialData={list} />;
}

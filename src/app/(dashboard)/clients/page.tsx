import { supabaseAdmin } from "@/lib/supabase/server";
import { ClientsClient } from "./ClientList";

export default async function ClientsPage() {
  const { data: clients, error } = await supabaseAdmin
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    if (error.code === '42P01') {
      console.warn("Clients table doesn't exist yet.");
    } else {
      console.error("Error fetching clients:", error);
    }
  }

  const list = clients || [];

  return <ClientsClient initialData={list} />;
}


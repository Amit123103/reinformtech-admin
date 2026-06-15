import { supabaseAdmin } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  // Fetch projects from Supabase
  const { data: projects, error } = await supabaseAdmin
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error.message || error);
  }

  const submissions = projects || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text)]">Form Submissions</h1>
          <p className="text-sm text-[var(--color-muted)] mt-1">
            View and manage project requests and leads.
          </p>
        </div>
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-4 py-2 shadow-sm">
          <span className="text-sm font-medium text-[var(--color-muted)]">Total Submissions: </span>
          <span className="text-lg font-bold text-[var(--color-accent)]">{submissions.length}</span>
        </div>
      </div>

      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-sm overflow-hidden">
        {submissions.length === 0 ? (
          <div className="p-8 text-center text-[var(--color-muted)]">
            <p>No submissions found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[var(--color-background)] border-b border-[var(--color-border)]">
                <tr>
                  <th className="px-6 py-4 font-semibold text-[var(--color-text)]">Date</th>
                  <th className="px-6 py-4 font-semibold text-[var(--color-text)]">Client</th>
                  <th className="px-6 py-4 font-semibold text-[var(--color-text)]">Service</th>
                  <th className="px-6 py-4 font-semibold text-[var(--color-text)]">Budget</th>
                  <th className="px-6 py-4 font-semibold text-[var(--color-text)]">Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {submissions.map((sub: any) => (
                  <tr key={sub.id} className="hover:bg-[var(--color-background)]/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-[var(--color-muted)]">
                      {new Date(sub.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-[var(--color-text)]">{sub.name}</div>
                      <div className="text-[var(--color-muted)] text-xs mt-0.5">{sub.email}</div>
                      {sub.company && <div className="text-[var(--color-muted)] text-xs mt-0.5 opacity-70">{sub.company}</div>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#D65A7C]/10 text-[#D65A7C]">
                        {sub.service || 'General Inquiry'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-[var(--color-text)]">
                      {sub.budget || 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs xl:max-w-lg overflow-hidden text-ellipsis whitespace-normal line-clamp-2 text-[var(--color-muted)] text-xs leading-relaxed" title={sub.details}>
                        {sub.details || 'No message provided.'}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

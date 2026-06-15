import { supabaseAdmin } from "@/lib/supabase/server";

export default async function SubscribersPage() {
  // Fetch subscribers from Supabase
  const { data: subscribers, error } = await supabaseAdmin
    .from("subscribers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    if (error.code === '42P01') {
      console.warn("Subscribers table doesn't exist yet. Users need to subscribe first or create it.");
    } else {
      console.error("Error fetching subscribers:", error);
    }
  }

  const list = subscribers || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text)]">Subscribers</h1>
          <p className="text-sm text-[var(--color-muted)] mt-1">
            Manage your newsletter audience.
          </p>
        </div>
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-4 py-2 shadow-sm">
          <span className="text-sm font-medium text-[var(--color-muted)]">Total Audience: </span>
          <span className="text-lg font-bold text-[var(--color-accent)]">{list.length}</span>
        </div>
      </div>

      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-sm overflow-hidden">
        {list.length === 0 ? (
          <div className="p-8 text-center text-[var(--color-muted)]">
            <p>No subscribers found. Wait for someone to sign up via the footer!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[var(--color-background)] border-b border-[var(--color-border)]">
                <tr>
                  <th className="px-6 py-4 font-semibold text-[var(--color-text)]">Email Address</th>
                  <th className="px-6 py-4 font-semibold text-[var(--color-text)]">Date Subscribed</th>
                  <th className="px-6 py-4 font-semibold text-[var(--color-text)]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {list.map((sub: any) => (
                  <tr key={sub.id} className="hover:bg-[var(--color-background)]/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-[var(--color-text)]">{sub.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-[var(--color-muted)]">
                      {new Date(sub.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${sub.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'}`}>
                        {sub.status || 'active'}
                      </span>
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

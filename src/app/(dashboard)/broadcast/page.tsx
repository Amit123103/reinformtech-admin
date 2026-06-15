"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Send, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

export default function BroadcastPage() {
  const [subject, setSubject] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !htmlContent) return;

    if (!confirm("Are you sure you want to send this email to ALL your subscribers?")) {
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/admin/broadcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, htmlContent }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(`Successfully sent email to ${data.count} subscribers!`);
        setSubject("");
        setHtmlContent("");
      } else {
        setStatus("error");
        setMessage(data.error || "Failed to send broadcast");
      }
    } catch (error) {
      setStatus("error");
      setMessage("An unexpected error occurred while sending.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Broadcast Email</h1>
        <p className="text-sm text-[var(--color-muted)] mt-1">
          Compose and send a newsletter to all your active subscribers.
        </p>
      </div>

      {status === "success" && (
        <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-lg p-4 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-green-800 dark:text-green-300">Broadcast Complete</h3>
            <p className="text-sm text-green-700 dark:text-green-400/80 mt-1">{message}</p>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-red-800 dark:text-red-300">Broadcast Failed</h3>
            <p className="text-sm text-red-700 dark:text-red-400/80 mt-1">{message}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSend} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 space-y-6">
          
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-[var(--color-text)] mb-2">
              Email Subject
            </label>
            <input
              type="text"
              id="subject"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-2.5 text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[#D65A7C] transition-shadow"
              placeholder="e.g. Exciting News from ReInformTech!"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-[var(--color-text)] mb-2">
              Email Content (HTML supported)
            </label>
            <textarea
              id="content"
              required
              rows={12}
              value={htmlContent}
              onChange={(e) => setHtmlContent(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[#D65A7C] transition-shadow font-mono text-sm"
              placeholder="<h1>Hello!</h1><p>Write your amazing newsletter here...</p>"
            />
            <p className="text-xs text-[var(--color-muted)] mt-2">
              You can write plain text or use HTML tags (like &lt;h1&gt;, &lt;p&gt;, &lt;a&gt;) to style your email.
            </p>
          </div>

        </div>

        <div className="bg-[var(--color-background)] px-6 py-4 border-t border-[var(--color-border)] flex justify-end">
          <Button 
            type="submit" 
            disabled={status === "loading" || !subject || !htmlContent}
            className="flex items-center gap-2 bg-gradient-to-r from-[#D65A7C] to-[#FF8C69] hover:from-[#C24669] hover:to-[#E87A9A] border-0 text-white min-w-[140px]"
          >
            {status === "loading" ? (
              <Loader2 className="w-5 h-5 animate-spin mx-auto" />
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Broadcast
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [otp, setOtp] = useState("");
  const [token, setToken] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Permanently fix the credentialed URL issue
  useEffect(() => {
    try {
      if (window.location.href.includes('@') && window.location.protocol.startsWith('http')) {
        const url = new URL(window.location.href);
        if (url.username || url.password) {
          url.username = '';
          url.password = '';
          window.history.replaceState({}, '', url.toString());
        }
      }
    } catch (e) {
      // Ignore URL parsing errors
    }
  }, []);

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(window.location.origin + "/api/auth/request-otp", {
        method: "POST",
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to request OTP");
      }

      setToken(data.token || "");
      setAdminEmail(data.email || "");
      setStep(2);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(window.location.origin + "/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: adminEmail, otp, token }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to verify OTP");
      }

      // Success! Redirect to dashboard
      window.location.href = "/";
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-surface)] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8 text-center border-b border-[var(--color-border)]">
          <div className="h-12 w-12 rounded-xl bg-[var(--color-text)] flex items-center justify-center mx-auto mb-4">
            <span className="text-[var(--color-background)] font-bold text-2xl leading-none">R</span>
          </div>
          <h1 className="text-2xl font-bold text-[var(--color-text)]">Admin Secure Login</h1>
          <p className="text-sm text-[var(--color-muted)] mt-2">
            {step === 1 
              ? "Access is restricted to the site owner." 
              : `We sent a 6-digit code to your admin email!`}
          </p>
        </div>

        <div className="p-8">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-lg mb-6 text-center">
              {error}
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleRequestOtp} className="space-y-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white py-3 rounded-lg text-sm font-medium transition-colors shadow-sm disabled:opacity-50"
              >
                {loading ? "Sending Code..." : "Send Code to Admin Email"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--color-text)]">6-Digit Code</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-center text-xl tracking-widest focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 text-[var(--color-text)] transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={loading || otp.length < 6}
                className="w-full bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white py-3 rounded-lg text-sm font-medium transition-colors shadow-sm disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify and Log In"}
              </button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-center text-sm text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors mt-4"
              >
                Cancel
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

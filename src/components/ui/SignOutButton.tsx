"use client";

import { LogOut } from "lucide-react";
import { useState } from "react";

export function SignOutButton() {
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      // Fix fetch credentials error by using an absolute URL
      await fetch(window.location.origin + '/api/auth/logout', { method: 'POST' });
      
      // Also clean up the URL when redirecting to login
      window.location.href = window.location.origin + '/login';
    } catch (error) {
      console.error("Logout failed:", error);
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleSignOut}
      disabled={loading}
      className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-[var(--color-muted)] hover:text-red-500 w-full rounded-lg transition-colors hover:bg-red-500/10 disabled:opacity-50"
    >
      <LogOut className="w-5 h-5" /> {loading ? 'Signing out...' : 'Sign Out'}
    </button>
  );
}

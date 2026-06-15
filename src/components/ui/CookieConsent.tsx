"use client";

import { useState, useEffect } from "react";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie_consent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 w-full z-[9999]"
        >
          <div className="bg-[var(--color-surface)] border-t border-[var(--color-border)] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-4 pb-6 md:p-6 relative overflow-hidden backdrop-blur-xl bg-opacity-95 dark:bg-opacity-95 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
            {/* Background glowing orb */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#D65A7C] opacity-5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-start md:items-center gap-4 max-w-4xl relative z-10 w-full md:w-auto">
              <div className="hidden md:flex bg-gradient-to-br from-[#D65A7C] to-[#FF8C69] p-3 rounded-full shrink-0 shadow-lg shadow-[#D65A7C]/20">
                <Cookie className="w-6 h-6 text-white" />
              </div>
              
              <div className="flex-1 pr-6 md:pr-0">
                <h3 className="text-base md:text-lg font-bold text-[var(--color-text)] mb-1 flex items-center gap-2">
                  <Cookie className="w-5 h-5 text-[#D65A7C] md:hidden shrink-0" />
                  We value your privacy
                </h3>
                <p className="text-xs md:text-sm text-[var(--color-muted)] leading-relaxed mt-2">
                  We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies and agree to our{" "}
                  <Link href="/privacy" className="text-[#D65A7C] hover:text-[#C24669] font-semibold underline transition-colors">
                    Privacy Policy
                  </Link>.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3 shrink-0 relative z-10">
              <Button 
                onClick={handleAccept}
                className="w-full sm:w-auto min-w-[140px] bg-gradient-to-r from-[#D65A7C] to-[#FF8C69] hover:from-[#C24669] hover:to-[#E87A9A] text-white border-0"
              >
                Accept All
              </Button>
              <Button 
                onClick={handleDecline}
                variant="outline"
                className="w-full sm:w-auto min-w-[140px]"
              >
                Decline
              </Button>
            </div>

            <button 
              onClick={handleDecline}
              className="absolute top-4 right-4 md:hidden text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

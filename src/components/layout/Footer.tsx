"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, Loader2 } from "lucide-react";

const footerNavigation = {
  services: [
    { name: "Custom Software", href: "/solutions/custom-crm" },
    { name: "Web Development", href: "/solutions/enterprise-saas" },
    { name: "Mobile Apps", href: "/solutions/mobile-applications" },
    { name: "UI/UX Design", href: "/#services" },
    { name: "Cloud Migration", href: "/solutions/cloud-architecture" },
  ],
  company: [
    { name: "About Us", href: "/#about" },
    { name: "Careers", href: "/careers" },
    { name: "Our Team", href: "/#team" },
    { name: "Contact", href: "/#contact" },
  ],
  resources: [
    { name: "Blog", href: "/#blog" },
    { name: "Case Studies", href: "/#case-studies" },
    { name: "Webinars", href: "/#webinars" },
    { name: "Help Center", href: "/#help" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
  social: [
    {
      name: "Twitter",
      href: "#",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "#",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "#",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus("loading");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        setStatus("success");
        setEmail("");
        // Reset after 3 seconds
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <footer className="bg-[var(--color-surface)] border-t border-[var(--color-border)] pt-24 pb-8">
      <Container>
        <div className="xl:grid xl:grid-cols-4 xl:gap-12">
          
          <div className="space-y-8 xl:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="h-10 w-10 rounded-full overflow-hidden bg-white flex-shrink-0 shadow-sm ring-1 ring-black/10">
                <img src="/logo-icon.png" alt="ReInformTech" className="h-full w-full object-contain p-0.5" />
              </div>
              <div className="text-[21px] font-extrabold tracking-tight">
                <span className="text-[var(--color-text)]">ReInform</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D65A7C] to-[#FF8C69]">Tech</span>
              </div>
            </Link>
            <p className="text-sm leading-6 text-[var(--color-muted)] max-w-xs">
              Building scalable, enterprise-grade software solutions for modern businesses outgrowing their tech stack.
            </p>
            <div className="flex space-x-6">
              {footerNavigation.social.map((item) => (
                <a key={item.name} href={item.href} className="text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-bold tracking-wider uppercase text-[var(--color-text)]">Services</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.services.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-bold tracking-wider uppercase text-[var(--color-text)]">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.company.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-bold tracking-wider uppercase text-[var(--color-text)]">Resources</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.resources.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-bold tracking-wider uppercase text-[var(--color-text)]">Legal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-16 xl:mt-0 xl:col-span-1">
            <h3 className="text-sm font-bold tracking-wider uppercase text-[var(--color-text)] mb-6">Subscribe to our newsletter</h3>
            <p className="text-sm text-[var(--color-muted)] mb-4">
              Get the latest insights on enterprise software architecture and engineering leadership.
            </p>
            <form onSubmit={handleSubscribe} className="mt-2 sm:flex sm:max-w-md xl:max-w-none flex-col gap-3">
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading" || status === "success"}
                className="w-full min-w-0 appearance-none rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 text-base text-[var(--color-text)] placeholder-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all disabled:opacity-50"
                placeholder="Enter your email"
              />
              <div className="mt-3 rounded-md sm:mt-0 sm:shrink-0">
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={status === "loading" || status === "success"}
                >
                  {status === "loading" ? (
                    <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                  ) : status === "success" ? (
                    <span className="flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Subscribed!
                    </span>
                  ) : (
                    "Subscribe"
                  )}
                </Button>
              </div>
              {status === "error" && (
                <p className="text-xs text-red-500 mt-1">Failed to subscribe. Please try again.</p>
              )}
            </form>
          </div>
          
        </div>
        
        <div className="mt-16 border-t border-[var(--color-border)] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm leading-5 text-[var(--color-muted)] font-medium">
            &copy; {new Date().getFullYear()} ReInformTech Enterprise. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm font-medium text-[var(--color-muted)]">
            <span className="flex items-center gap-2">Built for scale. Designed for humans.</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

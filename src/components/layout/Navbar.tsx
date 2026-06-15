"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";
import { ServiceTicker } from "@/components/layout/ServiceTicker";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/#services" },
  { 
    name: "Solutions", 
    href: "/#solutions",
    dropdown: [
      { name: "Enterprise SaaS", href: "/solutions/enterprise-saas" },
      { name: "Cloud Architecture", href: "/solutions/cloud-architecture" },
      { name: "Mobile Applications", href: "/solutions/mobile-applications" },
      { name: "AI Automation", href: "/solutions/ai-automation" },
      { name: "Custom CRM", href: "/solutions/custom-crm" },
      { name: "E-Commerce Platforms", href: "/solutions/e-commerce" }
    ]
  },
  { name: "About", href: "/#about" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      if (pathname === "/") {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        router.push(href);
      }
    } else {
      router.push(href);
    }
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-[var(--color-background)]/80 backdrop-blur-md shadow-sm border-b border-black/10 bg-black/5 py-1"
          : "bg-black/5 backdrop-blur-sm border-b border-black/5 py-2"
      )}
    >
      <Container>
        <nav
          className="flex items-center justify-between"
          aria-label="Global"
        >
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
              <div className="h-8 w-8 rounded-full overflow-hidden bg-white flex-shrink-0 shadow-sm ring-1 ring-black/10">
                <img src="/logo-icon.png" alt="ReInformTech" className="h-full w-full object-contain p-0.5" />
              </div>
              <div className="text-[19px] font-extrabold tracking-tight">
                <span className="text-[var(--color-text)]">ReInform</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D65A7C] to-[#FF8C69]">Tech</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  onClick={(e) => {
                    if (!item.dropdown) handleNavClick(e, item.href);
                  }}
                  className="text-sm font-medium leading-6 text-[var(--color-text)] hover:text-[var(--color-muted)] transition-colors py-2 flex items-center gap-1"
                >
                  {item.name}
                  {item.dropdown && <ChevronDown className="w-4 h-4 opacity-70" />}
                </Link>
                
                {item.dropdown && (
                  <div className="absolute left-0 top-full mt-1 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                    <div className="rounded-xl shadow-lg ring-1 ring-black/5 bg-[var(--color-surface)] overflow-hidden border border-[var(--color-border)] p-2">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          onClick={(e) => handleNavClick(e, subItem.href)}
                          className="block rounded-lg px-4 py-3 text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-background)] hover:text-[var(--color-accent)] transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-4">
            <ThemeToggle />
            <Button size="sm" onClick={(e) => handleNavClick(e, '/#contact')}>Book Consultation</Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-[var(--color-text)]"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden transition-opacity duration-300",
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
        <div
          className={cn(
            "fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[var(--color-background)] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-[var(--color-border)] transition-transform duration-300",
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
              <div className="h-8 w-8 rounded-full overflow-hidden bg-white flex-shrink-0 shadow-sm ring-1 ring-black/10">
                <img src="/logo-icon.png" alt="ReInformTech" className="h-full w-full object-contain p-0.5" />
              </div>
              <div className="text-[19px] font-extrabold tracking-tight">
                <span className="text-[var(--color-text)]">ReInform</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D65A7C] to-[#FF8C69]">Tech</span>
              </div>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-[var(--color-text)]"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-[var(--color-border)]">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className="-mx-3 flex items-center justify-between rounded-lg px-3 py-2 text-base font-semibold leading-7 text-[var(--color-text)] hover:bg-[var(--color-surface)]"
                      onClick={(e) => {
                        if (!item.dropdown) {
                          setMobileMenuOpen(false);
                          handleNavClick(e, item.href);
                        }
                      }}
                    >
                      {item.name}
                      {item.dropdown && <ChevronDown className="w-5 h-5 opacity-70" />}
                    </Link>
                    {item.dropdown && (
                      <div className="pl-4 mt-1 border-l-2 border-[var(--color-border)] ml-3 space-y-1">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block rounded-lg px-3 py-2 text-sm font-medium text-[var(--color-text)] opacity-80 hover:opacity-100 hover:bg-[var(--color-surface)]"
                            onClick={(e) => {
                              setMobileMenuOpen(false);
                              handleNavClick(e, subItem.href);
                            }}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="py-6">
                <Button className="w-full" onClick={() => setMobileMenuOpen(false)}>
                  Book Consultation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling Ticker at the bottom of Navbar */}
      <ServiceTicker />
    </header>
  );
}

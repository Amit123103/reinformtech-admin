"use client";

import { Zap, BellRing } from "lucide-react";

const services = [
  "Custom Software Apps",
  "Enterprise CRM Projects",
  "School Management Software",
  "IT Infrastructure Projects",
  "E-Commerce Platforms",
  "Mobile Application Development",
  "AI & Workflow Automation",
  "Healthcare Software Solutions",
  "Real Estate Portals",
  "FinTech & Banking Apps",
  "Inventory Management Systems",
  "HRMS & Payroll Software",
  "SaaS Product Development",
  "Cloud Migration & DevOps",
  "Data Analytics Dashboards",
  "Cybersecurity Solutions",
  "IoT Integrations",
  "Blockchain Development",
  "UI/UX Design Systems",
  "Legacy System Modernization"
];

export function ServiceTicker() {
  return (
    <div className="w-full overflow-hidden bg-gradient-to-r from-[#D65A7C] via-[#E87A9A] to-[#D65A7C] text-white py-1 relative flex items-center shadow-md">
      {/* Badge matching the image style */}
      <div className="absolute left-0 top-0 bottom-0 z-10 bg-[#C24669] px-3 sm:px-6 flex items-center shadow-[5px_0_15px_-5px_rgba(0,0,0,0.5)]">
        <span className="font-bold text-[10px] sm:text-xs md:text-sm tracking-wider flex items-center gap-2 whitespace-nowrap">
          <BellRing className="w-3 h-3 sm:w-4 sm:h-4 text-white animate-pulse" /> OUR SERVICES
        </span>
      </div>
      
      {/* Marquee container */}
      <div className="flex pl-[120px] sm:pl-[160px] md:pl-[180px]">
        <div className="flex w-max animate-scroll-left hover:[animation-play-state:paused]">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center">
              {services.map((service, idx) => (
                <div key={idx} className="flex items-center">
                  <span className="text-xs md:text-sm font-medium hover:text-yellow-200 transition-colors cursor-pointer px-4 whitespace-nowrap">
                    {service}
                  </span>
                  <span className="text-yellow-400/60 text-[10px] md:text-xs mx-1">➜</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

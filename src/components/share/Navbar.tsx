"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, CalendarCheck2, Menu, X } from "lucide-react";

const navigation = [
  { label: "Home", href: "/", sectionId: "home" },
  { label: "About", href: "/#about", sectionId: "about" },
  { label: "Services", href: "/#services", sectionId: "services" },
  { label: "FAQ", href: "/#faq", sectionId: "faq" },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const updateActiveSection = () => {
      const sectionOffset = 120;
      let currentSection = "home";

      navigation.slice(1).forEach((item) => {
        const section = document.getElementById(item.sectionId);
        if (section && section.getBoundingClientRect().top <= sectionOffset) {
          currentSection = item.sectionId;
        }
      });

      setActiveSection(currentSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("hashchange", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("hashchange", updateActiveSection);
    };
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 shadow-[0_1px_12px_rgba(15,23,42,0.04)] backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-[72px] container items-center justify-between"
      >
        <Link
          href="/"
          aria-label="Booking Is Yours home"
          className="group flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
        >
          <span className="grid size-10 place-items-center rounded-xl bg-[#29236c] text-white shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5">
            <CalendarCheck2 aria-hidden="true" size={21} strokeWidth={2} />
          </span>
          <span className="flex flex-col uppercase text-[#201b63]">
            <span className="text-[15px] font-bold leading-[17px] tracking-[0.04em]">
              Booking Is
            </span>
            <span className="text-[11px] font-semibold leading-[14px] tracking-[0.24em]">
              Yours
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              aria-current={activeSection === item.sectionId ? "page" : undefined}
              onClick={() => setActiveSection(item.sectionId)}
              className={`relative rounded-lg px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 ${
                activeSection === item.sectionId
                  ? "text-[#29236c]"
                  : "text-slate-600 hover:bg-indigo-50/60 hover:text-[#29236c]"
              }`}
            >
              {item.label}
              {activeSection === item.sectionId && (
                <span className="absolute inset-x-4 -bottom-[7px] h-0.5 rounded-full bg-[#29236c]" />
              )}
            </Link>
          ))}
        </div>

        <Link
          href="/request-demo"
          className="group hidden items-center gap-2 rounded-full bg-[#29236c] px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(41,35,108,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1f1a57] hover:shadow-[0_10px_24px_rgba(41,35,108,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 sm:inline-flex"
        >
          Request a Demo
          <ArrowUpRight
            aria-hidden="true"
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>

        <button
          type="button"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="grid size-10 place-items-center rounded-lg border border-slate-200 text-[#29236c] transition-colors hover:bg-indigo-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 sm:ml-3 lg:hidden"
        >
          {isMenuOpen ? <X aria-hidden="true" size={21} /> : <Menu aria-hidden="true" size={21} />}
        </button>
      </nav>

      <div
        id="mobile-navigation"
        className={`overflow-hidden border-t border-slate-100 bg-white transition-all duration-300 lg:hidden ${
          isMenuOpen ? "max-h-[420px] opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              aria-current={activeSection === item.sectionId ? "page" : undefined}
              onClick={() => {
                setActiveSection(item.sectionId);
                setIsMenuOpen(false);
              }}
              className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                activeSection === item.sectionId
                  ? "bg-indigo-50 text-[#29236c]"
                  : "text-slate-600 hover:bg-slate-50 hover:text-[#29236c]"
              }`}
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/request-demo"
            onClick={() => setIsMenuOpen(false)}
            className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-[#29236c] px-5 py-3 text-sm font-semibold text-white sm:hidden"
          >
            Request a Demo
            <ArrowUpRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

"use client";
import { memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { links } from "@/share/helpers";
import { SpaceSwitcher } from "@/share/components/SpaceSwitcher";

/**
 * ⚡ Bolt Optimization: Hoist static array computations to the module level
 * and use React.memo to prevent layout-level component re-renders during state updates.
 * 📊 Impact: Skips the expensive filter calculation and layout reconciliation on every page-level state update.
 */
const shownLinks = links.filter((v) => v.show);

const Navbar = memo(function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex flex-col bg-slate-950/70 backdrop-blur-xl text-slate-200 font-wf-headline-md text-sm font-medium w-64 border-r border-slate-800/80 shrink-0 h-full">
      <div className="flex-1 py-4 flex flex-col gap-1.5 px-3 overflow-y-auto custom-scrollbar">
        <div className="pb-3 mb-1.5 border-b border-slate-800/80">
          <SpaceSwitcher variant="menu" />
        </div>
        {shownLinks.map((link, index) => {
          const isActive = pathname === link.link;

          if (typeof link.link === "string") {
            return (
              <Link
                href={link.link}
                key={index}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-150 ease-in-out ${
                  isActive
                    ? "bg-emerald-500/10 text-emerald-400 font-semibold border-l-2 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                    : "text-slate-400 hover:bg-slate-900/60 hover:text-slate-100"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`material-symbols-outlined text-xl transition-transform ${
                    isActive ? "filled text-emerald-400 scale-105" : "text-slate-400"
                  }`}
                >
                  {link.icon}
                </span>
                <span className="font-wf-body-regular text-sm">{link.name}</span>
              </Link>
            );
          }
        })}
      </div>
      <div className="p-4 border-t border-slate-800/80 flex flex-col gap-3 bg-slate-950/40">
        <Link href="/moves">
          <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold py-3 px-4 rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm tracking-wide">
            <span
              aria-hidden="true"
              className="material-symbols-outlined text-xl"
            >
              add_circle
            </span>
            Nueva transacción
          </button>
        </Link>
      </div>
    </nav>
  );
});

export default Navbar;

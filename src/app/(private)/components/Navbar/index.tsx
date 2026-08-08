"use client";
import { memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { links } from "@/share/helpers";
import { useTheme } from "@/share/components/ThemeProvider";

/**
 * ⚡ Bolt Optimization: Hoist static array computations to the module level
 * and use React.memo to prevent layout-level component re-renders during state updates.
 * 📊 Impact: Skips the expensive filter calculation and layout reconciliation on every page-level state update.
 */
const shownLinks = links.filter((v) => v.show);

const Navbar = memo(function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="hidden lg:flex flex-col bg-white text-wf-primary font-wf-headline-md text-sm font-medium w-64 border-r border-wf-outline-variant/30 shrink-0 h-full">
      <div className="flex-1 py-4 flex flex-col gap-2 px-4 overflow-y-auto">
        {shownLinks.map((link, index) => {
          const isActive = pathname === link.link;

          if (typeof link.link === "string") {
            return (
              <Link
                href={link.link}
                key={index}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ease-in-out ${
                  isActive
                    ? "bg-wf-surface-container text-wf-primary font-semibold border-r-4 border-wf-primary"
                    : "text-wf-on-surface-variant hover:bg-wf-surface-container-low"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`material-symbols-outlined ${
                    isActive ? "filled" : ""
                  }`}
                >
                  {link.icon}
                </span>
                <span className="font-wf-body-regular">{link.name}</span>
              </Link>
            );
          }
        })}
      </div>
      <div className="p-4 border-t border-wf-outline-variant/30 flex flex-col gap-3">
        <Link href="/moves">
          <button className="w-full bg-wf-primary text-wf-on-primary font-wf-body-regular py-3 rounded-lg shadow-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            <span
              aria-hidden="true"
              className="material-symbols-outlined text-[20px]"
            >
              add
            </span>
            Nueva transacción
          </button>
        </Link>
      </div>
    </nav>
  );
});

export default Navbar;

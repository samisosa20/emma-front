"use client";
import { memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const linksMobile = [
  {
    id: "home",
    name: "Dashboard",
    link: "/dashboard",
    show: true,
    icon: "dashboard",
  },
  {
    id: "accounts",
    name: "Cuentas",
    link: "/accounts",
    show: true,
    icon: "account_balance_wallet",
  },
  {
    id: "moves",
    name: "",
    link: "/moves",
    show: true,
    icon: "receipt_long",
    isPrimary: true,
  },
  {
    id: "budgets",
    name: "Presupuestos",
    link: "/budgets",
    show: true,
    icon: "savings",
  },
  {
    id: "investments",
    name: "Inversiones",
    link: "/investments",
    show: true,
    icon: "candlestick_chart",
  },
];

const shownLinksMobile = linksMobile.filter((v) => v.show);

/**
 * ⚡ Bolt Optimization: Hoist static array computations to the module level
 * and use React.memo to prevent layout-level component re-renders during state updates.
 * 📊 Impact: Skips redundant calculations on every page render.
 */
const BottomBar = memo(function BottomBar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navegación móvil"
      className="lg:hidden fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 w-[94%] max-w-md z-40 bg-slate-950/85 backdrop-blur-2xl border border-slate-800/80 shadow-[0_12px_40px_rgba(0,0,0,0.7)] rounded-3xl px-2 sm:px-3 h-[60px] flex justify-around items-center"
    >
      {shownLinksMobile.map((link) => {
        const isActive = pathname === link.link;

        if (link.isPrimary) {
          return (
            <div
              key={link.id}
              className="relative flex flex-col items-center justify-center w-14 sm:w-16 h-full shrink-0"
            >
              <Link
                id={`fiona-menuBottom_${link.id}`}
                href={link.link}
                aria-current={isActive ? "page" : undefined}
                aria-label="Ir a Transacciones"
                className="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center group"
              >
                <div
                  className={`p-2.5 rounded-full shadow-lg transition-all duration-200 border-[3px] border-slate-950 flex items-center justify-center active:scale-90 ${
                    isActive
                      ? "bg-gradient-to-br from-emerald-400 to-teal-500 text-slate-950 shadow-emerald-500/40 scale-105"
                      : "bg-gradient-to-br from-emerald-500 to-teal-600 text-slate-950 shadow-emerald-500/25 hover:scale-105"
                  }`}
                >
                  <span className="material-symbols-outlined text-2xl font-bold">
                    {link.icon}
                  </span>
                </div>
                <span
                  className={`font-wf-body-regular text-[11px] font-bold tracking-tight mt-0.5 transition-colors whitespace-nowrap ${
                    isActive ? "text-emerald-400" : "text-slate-400"
                  }`}
                >
                  {link.name}
                </span>
              </Link>
            </div>
          );
        }

        return (
          <Link
            id={`fiona-menuBottom_${link.id}`}
            href={link.link}
            key={link.id}
            aria-current={isActive ? "page" : undefined}
            aria-label={`Ir a ${link.name}`}
            className={`flex-1 min-w-0 flex flex-col items-center justify-center py-1 px-1 sm:px-2.5 rounded-2xl transition-all duration-200 active:scale-95 ${
              isActive
                ? "text-emerald-400 font-bold"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <span
              aria-hidden="true"
              className={`material-symbols-outlined text-xl transition-transform ${
                isActive ? "filled text-emerald-400 scale-110" : "text-slate-400"
              }`}
            >
              {link.icon}
            </span>
            <span className="font-wf-body-regular text-[10px] tracking-tight mt-0.5 truncate max-w-full">
              {link.name}
            </span>
            {isActive && (
              <span className="w-1 h-1 bg-emerald-400 rounded-full mt-0.5 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
            )}
          </Link>
        );
      })}
    </nav>
  );
});

export default BottomBar;

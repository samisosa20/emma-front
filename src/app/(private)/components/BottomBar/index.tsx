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
      className="lg:hidden fixed bottom-3 left-1/2 -translate-x-1/2 w-[94%] max-w-md z-40 bg-wf-surface/95 backdrop-blur-2xl border border-wf-outline-variant/40 shadow-[0_8px_30px_rgba(4,12,33,0.08)] rounded-3xl px-2 h-[56px] flex justify-around items-center"
    >
      {shownLinksMobile.map((link) => {
        const isActive = pathname === link.link;

        if (link.isPrimary) {
          return (
            <div
              key={link.id}
              className="relative flex flex-col items-center justify-center w-16 h-full"
            >
              <Link
                id={`fiona-menuBottom_${link.id}`}
                href={link.link}
                aria-current={isActive ? "page" : undefined}
                aria-label="Ir a Transacciones"
                className="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center group"
              >
                <div
                  className={`p-2.5 rounded-full shadow-md transition-all duration-200 border-[3px] border-wf-surface flex items-center justify-center active:scale-90 ${
                    isActive
                      ? "bg-wf-primary text-wf-on-primary shadow-wf-primary/40 scale-105"
                      : "bg-wf-primary text-wf-on-primary shadow-wf-primary/25 hover:scale-105"
                  }`}
                >
                  <span className="material-symbols-outlined text-2xl">
                    {link.icon}
                  </span>
                </div>
                <span
                  className={`font-wf-body-regular text-[11px] font-bold tracking-tight mt-0.5 transition-colors whitespace-nowrap ${
                    isActive ? "text-wf-primary" : "text-wf-on-surface-variant"
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
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all duration-200 active:scale-95 ${
              isActive
                ? "text-wf-primary font-bold"
                : "text-wf-on-surface-variant hover:text-wf-primary"
            }`}
          >
            <span
              aria-hidden="true"
              className={`material-symbols-outlined text-xl transition-transform ${
                isActive ? "filled text-wf-primary scale-110" : "text-wf-surface-tint"
              }`}
            >
              {link.icon}
            </span>
            <span className="font-wf-body-regular text-[10px] tracking-tight mt-0.5">
              {link.name}
            </span>
            {isActive && (
              <span className="w-1 h-1 bg-wf-primary rounded-full mt-0.5 animate-pulse" />
            )}
          </Link>
        );
      })}
    </nav>
  );
});

export default BottomBar;

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

//components
import useComponents from "@/share/components";

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
    name: "Accounts",
    link: "/accounts",
    show: true,
    icon: "account_balance_wallet",
  },
  {
    id: "moves",
    name: "Transactions",
    link: "/moves",
    show: true,
    icon: "receipt_long",
  },
  {
    id: "events",
    name: "Eventos",
    link: "/events",
    show: true,
    icon: "event",
  },
  {
    id: "budgets",
    name: "Budgets",
    link: "/budgets",
    show: true,
    icon: "savings",
  },
];

export default function BottomBar() {
  const { Typography } = useComponents();
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pt-3 pb-safe bg-white/95 backdrop-blur-lg text-wf-primary font-wf-headline-md text-[10px] font-bold border-t border-wf-outline-variant/30 rounded-t-2xl shadow-[0_-4px_12px_rgba(0,0,0,0.05)] tap-highlight-transparent pb-4">
      {linksMobile
        .filter((v) => v.show)
        .map((link, index) => {
          const isActive = pathname === link.link;
          return (
            <Link
              id={`fiona-menuBottom_${link.id}`}
              href={link.link}
              key={index}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
                isActive ? "text-wf-primary" : "text-wf-outline"
              }`}
            >
              <span
                className={`material-symbols-outlined mb-1 ${
                  isActive ? "filled" : ""
                }`}
              >
                {link.icon}
              </span>
              <span className="font-wf-body-regular text-[10px]">
                {link.name}
              </span>
            </Link>
          );
        })}
    </nav>
  );
}

"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Assets
import imgLogo from "../../../../../public/img/logo.png";

import { links } from "@/share/helpers";
import { authClient } from "@/share/lib/auth-client";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const user = session?.user || { name: "", image: "" };

  return (
    <aside className="hidden lg:flex flex-col bg-white dark:bg-slate-900 text-[#1A2238] dark:text-blue-400 font-manrope text-sm font-medium w-64 border-r border-slate-100 dark:border-slate-800 shrink-0 h-full">
      <div className="p-6 pb-2 border-b border-slate-100 flex flex-col items-center">
        <Link href="/dashboard">
          <Image src={imgLogo} alt="WealthFlow Logo" width={120} height={32} className="h-8 w-auto mb-1" />
        </Link>
        <div className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-bold">WealthFlow</div>
      </div>

      <div className="flex-1 py-4 flex flex-col gap-1 px-4 overflow-y-auto">
        {links
          .filter((v) => v.show)
          .map((link, index) => {
            const Icon = link.icon;
            const isActive = pathname === link.link;

            if (typeof link.link === "string") {
              return (
                <Link
                  href={link.link}
                  key={index}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ease-in-out ${
                    isActive
                      ? "bg-slate-50 dark:bg-slate-800 text-wf-primary border-r-4 border-wf-primary"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-wf-primary" : ""}`} />
                  <span className="font-semibold">{link.name}</span>
                </Link>
              );
            }

            return (
              <button
                onClick={link.onClick}
                key={index}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-200 ease-in-out w-full text-left"
              >
                <Icon className="w-5 h-5" />
                <span className="font-semibold">{link.name}</span>
              </button>
            );
          })}
      </div>

      <div className="p-4 border-t border-slate-100">
        <Link href="/moves" className="block">
          <button className="w-full bg-wf-primary text-wf-on-primary font-manrope font-bold py-3 rounded-lg shadow-sm hover:opacity-90 transition-opacity uppercase text-xs tracking-wider">
            Agregar Movimiento
          </button>
        </Link>
      </div>
    </aside>
  );
}

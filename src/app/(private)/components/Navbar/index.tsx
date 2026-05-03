"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { links } from "@/share/helpers";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex flex-col bg-white text-wf-primary font-wf-headline-md text-sm font-medium w-64 border-r border-wf-outline-variant/30 shrink-0 h-full">
      <div className="flex-1 py-4 flex flex-col gap-2 px-4 overflow-y-auto">
        {links
          .filter((v) => v.show)
          .map((link, index) => {
            const isActive = pathname === link.link;

            if (typeof link.link === "string") {
              return (
                <Link
                  href={link.link}
                  key={index}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ease-in-out ${
                    isActive
                      ? "bg-wf-surface-container text-wf-primary font-semibold border-r-4 border-wf-primary"
                      : "text-wf-on-surface-variant hover:bg-wf-surface-container-low"
                  }`}
                >
                  <span
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
      <div className="p-4 border-t border-wf-outline-variant/30">
        <Link href="/moves">
          <button className="w-full bg-wf-primary text-wf-on-primary font-wf-body-regular py-3 rounded-lg shadow-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[20px]">add</span>
            Nueva transacción
          </button>
        </Link>
      </div>
    </nav>
  );
}

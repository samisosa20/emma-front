"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Assets
import imgLogo from "../../../../../public/img/logo.png";

// Components
import useComponents from "@/share/components";

import { links } from "@/share/helpers";

export default function Navbar() {
  const { Typography } = useComponents();
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex flex-col bg-white text-wf-primary font-wf-headline-md text-sm font-medium w-64 border-r border-wf-outline-variant/30 shrink-0 h-full">
      <div className="p-6 pb-2 border-b border-wf-outline-variant/30">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image
            src={imgLogo}
            alt="WealthFlow Logo"
            className="h-8 w-auto mb-1"
            width={32}
            height={32}
          />
          <div className="text-xs text-wf-on-surface-variant mt-1 font-wf-body-regular">
            WealthFlow
          </div>
        </Link>
      </div>
      <div className="flex-1 py-4 flex flex-col gap-2 px-4 overflow-y-auto">
        {links
          .filter((v) => v.show)
          .map((link, index) => {
            const Icon = link.icon;
            const isActive = pathname === link.link;
            const isEvent = link.name.toLowerCase() === "eventos";

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
                    {isEvent ? "event" : link.iconName || "dashboard"}
                  </span>
                  <span className="font-wf-body-regular">{link.name}</span>
                </Link>
              );
            }
            return (
              <button
                onClick={link.onClick}
                key={index}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-wf-on-surface-variant hover:bg-wf-surface-container-low transition-all duration-200 ease-in-out w-full text-left"
              >
                <span className="material-symbols-outlined">
                  {link.iconName || "settings"}
                </span>
                <span className="font-wf-body-regular">{link.name}</span>
              </button>
            );
          })}
      </div>
      <div className="p-4 border-t border-wf-outline-variant/30">
        <Link href="/moves">
          <button className="w-full bg-wf-primary text-wf-on-primary font-wf-body-regular py-3 rounded-lg shadow-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[20px]">add</span>
            Add Transaction
          </button>
        </Link>
      </div>
    </nav>
  );
}

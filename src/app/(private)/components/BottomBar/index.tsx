"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { links } from "@/share/helpers";

const BottomBar = () => {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pt-3 bg-white/95 backdrop-blur-lg text-slate-400 font-manrope text-[10px] font-bold border-t border-slate-200 rounded-t-2xl shadow-[0_-4px_12px_rgba(0,0,0,0.05)] tap-highlight-transparent pb-6">
      {links
        .filter((v) => v.show && v.mobile)
        .slice(0, 5)
        .map((link, index) => {
          const Icon = link.icon;
          const isActive = pathname === link.link;

          if (typeof link.link === "string") {
            return (
              <Link
                key={index}
                href={link.link}
                className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
                  isActive ? "text-wf-primary" : "text-slate-400"
                }`}
              >
                <Icon className={`w-6 h-6 mb-1 ${isActive ? "fill-current" : ""}`} />
                <span className="uppercase tracking-tighter">{link.name}</span>
              </Link>
            );
          }

          return (
            <button
              key={index}
              onClick={link.onClick}
              className="flex flex-col items-center justify-center text-slate-400 p-2 rounded-lg"
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="uppercase tracking-tighter">{link.name}</span>
            </button>
          );
        })}
    </nav>
  );
};

export default BottomBar;

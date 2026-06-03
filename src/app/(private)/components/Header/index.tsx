"use client";
import Link from "next/link";
import Image from "next/image";

// Assets
import imgLogo from "../../../../../public/img/logo.png";
import { useSession } from "@/share/components/SessionProvider";

const Header = () => {
  const { session } = useSession();
  const user = session?.user;

  return (
    <header className="hidden md:flex bg-white/80 backdrop-blur-md text-slate-900 font-wf-headline-md antialiased w-full top-0 border-b border-wf-outline-variant/30 shadow-sm sticky z-40 justify-between items-center px-6 py-3">
      <div className="text-xl font-extrabold tracking-tight text-wf-primary">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image
            src={imgLogo}
            alt="Fiona Logo"
            className="h-8 mb-1"
            height={32}
            style={{ width: "auto" }}
          />
        </Link>
      </div>
      <div className="flex items-center gap-wf-md">
        <Link
          href="/profile"
          aria-label="Perfil"
          className="hover:bg-wf-surface-container transition-colors active:scale-95 duration-150 p-2 rounded-full flex items-center justify-center"
        >
          {user?.image ? (
            <img
              src={user.image}
              alt={user.name}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <span aria-hidden="true" className="material-symbols-outlined text-wf-on-surface-variant">
              account_circle
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;

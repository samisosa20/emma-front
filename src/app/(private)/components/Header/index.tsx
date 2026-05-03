import Link from "next/link";
import Image from "next/image";
import { headers } from "next/headers";
import { authClient } from "@/share/lib/auth-client";

// Assets
import imgLogo from "../../../../../public/img/logo.png";

const Header = async () => {
  const reqHeaders = await headers();
  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: reqHeaders,
    },
  });
  const user = session?.user;

  return (
    <header className="hidden md:flex bg-white/80 backdrop-blur-md text-slate-900 font-wf-headline-md antialiased w-full top-0 border-b border-wf-outline-variant/30 shadow-sm sticky z-40 justify-between items-center px-6 py-3">
      <div className="text-xl font-extrabold tracking-tight text-wf-primary">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image
            src={imgLogo}
            alt="Fiona Logo"
            className="h-8 mb-1"
            width={32}
            height={32}
            style={{ width: "auto" }}
          />
        </Link>
      </div>
      <div className="flex items-center gap-wf-md">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-wf-outline">
            search
          </span>
          <input
            className="bg-wf-surface-container-low border border-wf-outline-variant focus:border-wf-primary text-wf-on-surface rounded-full py-2 pl-10 pr-4 text-sm w-64 transition-colors outline-none"
            placeholder="Search..."
            type="text"
          />
        </div>
        <button className="hover:bg-wf-surface-container transition-colors active:scale-95 duration-150 p-2 rounded-full flex items-center justify-center">
          {user?.image ? (
            <img
              src={user.image}
              alt={user.name}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <span className="material-symbols-outlined text-wf-on-surface-variant">
              account_circle
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;

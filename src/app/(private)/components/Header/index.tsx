"use client";
import { memo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

// Assets
import imgLogo from "../../../../../public/img/logo.png";
import { useSession } from "@/share/components/SessionProvider";
import { authClient } from "@/share/lib/auth-client";

import { SpaceSwitcher } from "@/share/components/SpaceSwitcher";

const navigationSections = [
  {
    title: "Principal",
    items: [
      { name: "Dashboard", link: "/dashboard", icon: "dashboard" },
      { name: "Transacciones", link: "/moves", icon: "receipt_long" },
      { name: "Cuentas", link: "/accounts", icon: "account_balance_wallet" },
      { name: "Finanzas en Pareja", link: "/shared-spaces", icon: "diversity_3" },
    ],
  },
  {
    title: "Finanzas",
    items: [
      { name: "Inversiones", link: "/investments", icon: "candlestick_chart" },
      { name: "Presupuesto", link: "/budgets", icon: "savings" },
      { name: "Patrimonio", link: "/heritages", icon: "money_bag" },
    ],
  },
  {
    title: "Organización",
    items: [
      { name: "Categorías", link: "/categories", icon: "category" },
      { name: "Eventos", link: "/events", icon: "event" },
      { name: "Pagos", link: "/payments", icon: "receipt" },
    ],
  },
  {
    title: "Más",
    items: [
      { name: "Experimentos", link: "/tools", icon: "science" },
      /* { name: "Soporte", link: "/support", icon: "help" }, */
      { name: "Perfil", link: "/profile", icon: "person" },
    ],
  },
];

/**
 * ⚡ Bolt Optimization: Use React.memo to prevent layout-level component re-renders during state updates.
 * 📊 Impact: Skips the header layout reconciliation on every page-level state update.
 */
const Header = memo(function Header() {
  const { session } = useSession();
  const user = session?.user;
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Close mobile drawer & profile dropdown whenever pathname changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
  }, [pathname]);

  // Close profile dropdown on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsProfileMenuOpen(false);
      }
    };
    if (isProfileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isProfileMenuOpen]);

  const handleLogout = async () => {
    setIsProfileMenuOpen(false);
    setIsMobileMenuOpen(false);
    try {
      await authClient.signOut();
    } catch {
      // ignore signOut failures cleanly
    }
    if (typeof window !== "undefined") {
      localStorage.removeItem("fiona-user");
    }
    router.push("/login");
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="flex bg-slate-950/80 backdrop-blur-xl text-slate-100 font-wf-headline-md antialiased w-full top-0 border-b border-slate-800/80 shadow-[0_4px_20px_rgba(0,0,0,0.35)] sticky z-40 justify-between items-center gap-3 px-3.5 sm:px-6 py-2.5 sm:py-3">
        {/* Left: Mobile Menu Toggle & Brand Logo */}
        <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Abrir menú de navegación"
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-emerald-400 hover:bg-slate-900 active:scale-95 transition-all duration-150 flex items-center justify-center border border-slate-800 shrink-0"
          >
            <span className="material-symbols-outlined text-2xl">
              {isMobileMenuOpen ? "close" : "menu"}
            </span>
          </button>

          <Link href="/dashboard" className="flex items-center gap-2.5 group min-w-0">
            <div className="p-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 group-hover:border-emerald-500/40 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all shrink-0">
              <Image
                src={imgLogo}
                alt="Fiona Logo"
                className="w-6 h-6 sm:w-7 sm:h-7 object-contain group-hover:scale-105 transition-transform"
                width={28}
                height={28}
                priority
              />
            </div>
            <span className="font-wf-headline-md font-extrabold tracking-wider text-lg sm:text-xl uppercase bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent truncate">
              Fiona
            </span>
          </Link>
        </div>

        {/* Right: Profile */}
        <div className="flex items-center gap-2.5 md:gap-3.5 shrink-0">

          {/* Profile Dropdown */}
          <div className="relative" ref={profileMenuRef}>
            <button
              type="button"
              onClick={() => setIsProfileMenuOpen((prev) => !prev)}
              aria-label="Menú de usuario"
              aria-expanded={isProfileMenuOpen}
              className={`hover:bg-slate-900 transition-all active:scale-95 duration-150 p-1 rounded-full flex items-center justify-center gap-1 border ${
                isProfileMenuOpen
                  ? "bg-slate-900 border-emerald-500/60 ring-2 ring-emerald-500/20"
                  : "border-slate-800 hover:border-emerald-500/40"
              }`}
            >
              {user?.image ? (
                <img
                  src={user.image}
                  alt={user.name || "Usuario"}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/30"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="material-symbols-outlined text-emerald-400 text-2xl"
                >
                  account_circle
                </span>
              )}
              <span
                aria-hidden="true"
                className={`material-symbols-outlined text-slate-400 text-base transition-transform duration-150 ${
                  isProfileMenuOpen ? "rotate-180 text-emerald-400" : ""
                }`}
              >
                expand_more
              </span>
            </button>

            {isProfileMenuOpen && (
              <div
                role="menu"
                aria-label="Opciones de cuenta"
                className="absolute right-0 mt-2 w-64 rounded-2xl bg-slate-950/95 backdrop-blur-2xl border border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.8)] py-2 z-50 animate-in fade-in zoom-in-95 duration-150 overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-slate-800/80 bg-slate-900/40">
                  <p className="text-xs font-semibold text-slate-100 truncate">
                    {user?.name || "Usuario Fiona"}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate font-mono mt-0.5">
                    {user?.email || ""}
                  </p>
                  {user?.isConfirmed ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-950/50 border border-emerald-800/40 px-2 py-0.5 rounded-full mt-2">
                      <span className="material-symbols-outlined text-[12px]">
                        verified
                      </span>
                      Cuenta verificada
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-400 bg-amber-950/50 border border-amber-800/40 px-2 py-0.5 rounded-full mt-2">
                      <span className="material-symbols-outlined text-[12px]">
                        warning
                      </span>
                      Verificación pendiente
                    </span>
                  )}
                </div>

                <div className="p-1.5 space-y-1">
                  <Link
                    href="/profile"
                    role="menuitem"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:text-emerald-400 hover:bg-slate-900/80 transition-colors group"
                  >
                    <span className="material-symbols-outlined text-xl text-slate-400 group-hover:text-emerald-400 transition-colors">
                      person
                    </span>
                    <span>Mi Perfil</span>
                  </Link>

                  <div className="my-1 border-t border-slate-800/60" />

                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors text-left group"
                  >
                    <span className="material-symbols-outlined text-xl text-rose-400 group-hover:text-rose-300 transition-colors">
                      logout
                    </span>
                    <span>Cerrar sesión</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Navigation Sheet / Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Content Panel */}
          <aside className="relative w-4/5 max-w-xs bg-slate-950/95 backdrop-blur-2xl text-slate-100 h-full shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col z-10 overflow-hidden animate-in slide-in-from-left duration-300 border-r border-slate-800">
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-800/80 flex justify-between items-center bg-slate-900/60">
              <div className="flex items-center gap-3">
                {user?.image ? (
                  <img
                    src={user.image}
                    alt={user.name || "Usuario"}
                    className="flex-shrink-0 w-10 h-10 rounded-full border border-emerald-500/30 shadow-xs object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold text-lg">
                    {user?.name ? user.name.charAt(0).toUpperCase() : "F"}
                  </div>
                )}
                <div className="flex flex-col min-w-0">
                  <span className="font-wf-headline-md text-sm font-semibold text-slate-100 truncate">
                    {user?.name || "Usuario"}
                  </span>
                  <span className="text-xs text-slate-400 truncate font-mono">
                    {user?.email || "Navegación general"}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-slate-800/60 rounded-full transition-colors"
                aria-label="Cerrar menú"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {/* Quick Add Button */}
            <div className="p-3 bg-slate-950 border-b border-slate-800/60">
              <Link
                href="/moves"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold py-2.5 px-4 rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm"
              >
                <span className="material-symbols-outlined text-lg">
                  add_circle
                </span>
                <span>Nueva Transacción</span>
              </Link>
            </div>

            {/* Navigation Groups List */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5 bg-slate-950 custom-scrollbar">
              {/* Space Switcher in Navigation Menu */}
              <div className="pb-3 border-b border-slate-800/70">
                <SpaceSwitcher
                  variant="menu"
                  onNavigate={() => setIsMobileMenuOpen(false)}
                  onSpaceChange={() => setIsMobileMenuOpen(false)}
                />
              </div>

              {navigationSections.map((section, idx) => (
                <div key={idx} className="space-y-1.5">
                  <h4 className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono">
                    {section.title}
                  </h4>
                  <div className="space-y-1">
                    {section.items.map((item) => {
                      const isActive = pathname === item.link;
                      return (
                        <Link
                          key={item.link}
                          href={item.link}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                            isActive
                              ? "bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.1)]"
                              : "text-slate-400 hover:bg-slate-900/60 hover:text-slate-100"
                          }`}
                        >
                          <span
                            aria-hidden="true"
                            className={`material-symbols-outlined text-xl ${
                              isActive
                                ? "filled text-emerald-400"
                                : "text-slate-400"
                            }`}
                          >
                            {item.icon}
                          </span>
                          <span className="font-wf-body-regular">
                            {item.name}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Drawer Footer */}
            <div className="p-3 border-t border-slate-800/80 bg-slate-900/60 space-y-2.5">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all"
              >
                <span className="material-symbols-outlined text-lg">
                  logout
                </span>
                <span>Cerrar sesión</span>
              </button>
              <p className="text-xs text-slate-400 font-wf-body-regular text-center">
                Fiona App © {new Date().getFullYear()}
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
});

export default Header;

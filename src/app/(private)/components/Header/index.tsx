"use client";
import { memo, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

// Assets
import imgLogo from "../../../../../public/img/logo.png";
import { useSession } from "@/share/components/SessionProvider";
import { useTheme } from "@/share/components/ThemeProvider";

const navigationSections = [
  {
    title: "Principal",
    items: [
      { name: "Dashboard", link: "/dashboard", icon: "dashboard" },
      { name: "Transacciones", link: "/moves", icon: "receipt_long" },
      { name: "Cuentas", link: "/accounts", icon: "account_balance_wallet" },
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
  const { theme, toggleTheme, mounted } = useTheme();
  const user = session?.user;
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile drawer whenever pathname changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

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
      <header className="flex bg-wf-surface/95 backdrop-blur-md text-wf-on-surface font-wf-headline-md antialiased w-full top-0 border-b border-wf-outline-variant/30 shadow-xs sticky z-40 justify-between items-center px-3.5 sm:px-5 md:px-6 py-2.5">
        {/* Left: Mobile Menu Toggle & Brand Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Abrir menú de navegación"
            className="lg:hidden p-2 rounded-xl text-wf-on-surface-variant hover:text-wf-primary hover:bg-wf-surface-container active:scale-95 transition-all duration-150 flex items-center justify-center border border-wf-outline-variant/30"
          >
            <span className="material-symbols-outlined text-2xl">
              {isMobileMenuOpen ? "close" : "menu"}
            </span>
          </button>

          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <Image
              src={imgLogo}
              alt="Fiona Logo"
              className="w-7 h-7 sm:w-8 sm:h-8 object-contain group-hover:scale-105 transition-transform"
              width={32}
              height={32}
              priority
            />
            <span className="font-wf-headline-md font-extrabold tracking-wider text-lg sm:text-xl text-wf-on-surface uppercase">
              Fiona
            </span>
          </Link>
        </div>

        {/* Right: Quick Action & Profile */}
        <div className="flex items-center gap-2 md:gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Cambiar tema oscuro/claro"
            title={
              mounted && theme === "dark"
                ? "Cambiar a modo claro"
                : "Cambiar a modo oscuro"
            }
            className="p-2 rounded-full text-wf-on-surface-variant hover:text-wf-primary hover:bg-wf-surface-container active:scale-95 transition-all duration-150 flex items-center justify-center border border-wf-outline-variant/30"
          >
            <span
              className="material-symbols-outlined text-xl"
              suppressHydrationWarning
            >
              {mounted && theme === "dark" ? "light_mode" : "dark_mode"}
            </span>
          </button>

          <Link
            href="/profile"
            aria-label="Perfil de usuario"
            className="hover:bg-wf-surface-container transition-all active:scale-95 duration-150 p-1 rounded-full flex items-center justify-center border border-wf-outline-variant/40"
          >
            {user?.image ? (
              <img
                src={user.image}
                alt={user.name || "Usuario"}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <span
                aria-hidden="true"
                className="material-symbols-outlined text-wf-primary text-2xl"
              >
                account_circle
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* Mobile Navigation Sheet / Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Content Panel */}
          <aside className="relative w-4/5 max-w-xs bg-wf-surface text-wf-on-surface h-full shadow-2xl flex flex-col z-10 overflow-hidden animate-in slide-in-from-left duration-300 border-r border-wf-outline-variant/30">
            {/* Drawer Header */}
            <div className="p-4 border-b border-wf-outline-variant/30 flex justify-between items-center bg-wf-surface-container-low">
              <div className="flex items-center gap-3">
                {user?.image ? (
                  <img
                    src={user.image}
                    alt={user.name || "Usuario"}
                    className="flex-shrink-0 w-10 h-10 rounded-full border border-wf-primary/20 shadow-xs object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-wf-primary/10 text-wf-primary flex items-center justify-center font-bold text-lg">
                    {user?.name ? user.name.charAt(0).toUpperCase() : "F"}
                  </div>
                )}
                <div className="flex flex-col min-w-0">
                  <span className="font-wf-headline-md text-sm font-semibold text-wf-on-surface truncate">
                    {user?.name || "Usuario"}
                  </span>
                  <span className="text-xs text-wf-on-surface-variant truncate">
                    {user?.email || "Navegación general"}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 text-wf-outline hover:text-wf-primary hover:bg-wf-surface-container rounded-full transition-colors"
                aria-label="Cerrar menú"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {/* Quick Add Button */}
            <div className="p-3 bg-wf-surface-container-lowest border-b border-wf-outline-variant/20">
              <Link
                href="/moves"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full bg-wf-primary text-wf-on-primary font-wf-body-regular font-semibold py-2.5 px-4 rounded-xl shadow-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 text-sm"
              >
                <span className="material-symbols-outlined text-lg">
                  add_circle
                </span>
                <span>Nueva Transacción</span>
              </Link>
            </div>

            {/* Navigation Groups List */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5 bg-wf-surface">
              {navigationSections.map((section, idx) => (
                <div key={idx} className="space-y-1.5">
                  <h4 className="px-3 text-[11px] font-bold uppercase tracking-wider text-wf-surface-tint font-wf-label-caps">
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
                              ? "bg-wf-surface-container text-wf-primary font-bold border-r-4 border-wf-primary shadow-xs"
                              : "text-wf-on-surface-variant hover:bg-wf-surface-container-low hover:text-wf-on-surface"
                          }`}
                        >
                          <span
                            aria-hidden="true"
                            className={`material-symbols-outlined text-xl ${
                              isActive
                                ? "filled text-wf-primary"
                                : "text-wf-surface-tint"
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
            <div className="p-4 border-t border-wf-outline-variant/30 bg-wf-surface-container-low text-center">
              <p className="text-xs text-wf-on-surface-variant font-wf-body-regular">
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

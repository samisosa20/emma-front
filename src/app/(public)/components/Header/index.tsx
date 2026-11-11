"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdAccountCircle } from "react-icons/md";
import { HiBars3, HiXMark, HiShieldCheck, HiArrowRight } from "react-icons/hi2";

// Assets
import imgLogo from "../../../../../public/img/logo.png";

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    try {
      const userStr = localStorage.getItem("fiona-user");
      if (userStr) {
        const user = JSON.parse(userStr);
        setIsLogin(!!user?.id || !!user?.email || !!user?.token);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const navLinks = [
    { name: "Características", href: "/#caracteristicas" },
    { name: "Seguridad", href: "/#seguridad" },
    { name: "Módulos", href: "/#modulos" },
    { name: "FAQ", href: "/#faq" },
    { name: "Blogs", href: "/blogs" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-slate-950/80 border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo & Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center p-1.5 rounded-xl bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 group-hover:border-emerald-400/60 transition-all duration-300">
            <Image
              src={imgLogo}
              alt="Logo Fiona"
              priority
              width={32}
              height={32}
              className="w-8 h-8 object-contain group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-wf-headline-md font-extrabold tracking-wider text-xl text-white uppercase leading-none">
              Fiona
            </span>
            <span className="text-[10px] text-emerald-400 font-mono tracking-widest uppercase">
              Financial Tech
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-slate-300 hover:text-white transition-colors duration-200 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-emerald-400 after:to-cyan-400 hover:after:w-full after:transition-all after:duration-300"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA / Auth buttons */}
        <div className="hidden md:flex items-center gap-4">
          {isLogin ? (
            <Link
              href="/dashboard"
              className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-900 border border-emerald-500/40 hover:border-emerald-400 text-white text-sm font-semibold transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]"
            >
              <MdAccountCircle className="text-emerald-400 text-2xl" />
              <span>Mi Panel</span>
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-slate-300 hover:text-white px-3 py-2 transition-colors"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/login"
                className="relative group overflow-hidden px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-sm font-bold shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:shadow-[0_0_35px_rgba(16,185,129,0.55)] transition-all duration-300 active:scale-95 flex items-center gap-2"
              >
                <span>Crear cuenta gratis</span>
                <HiArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          {isLogin && (
            <Link href="/dashboard" className="p-1">
              <MdAccountCircle className="text-emerald-400 text-3xl" />
            </Link>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? (
              <HiXMark className="w-6 h-6" />
            ) : (
              <HiBars3 className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-slate-950/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 text-base font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            {isLogin ? (
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-semibold text-sm"
              >
                Ir a mi Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl border border-white/20 text-white font-medium text-sm hover:bg-white/10 transition-colors"
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-sm shadow-lg"
                >
                  Crear cuenta gratis
                </Link>
              </>
            )}
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2">
              <HiShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Cifrado bancario · Cero venta de datos</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

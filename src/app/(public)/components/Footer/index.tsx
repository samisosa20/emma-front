"use client";
import Image from "next/image";
import Link from "next/link";
import { HiShieldCheck, HiLockClosed, HiArrowUpRight } from "react-icons/hi2";

// Assets
import imgLogo from "../../../../../public/img/logo.png";

const CURRENT_YEAR = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="w-full bg-slate-950 text-slate-300 border-t border-white/10 pt-16 pb-12 overflow-hidden relative">
      {/* Background ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-emerald-500/10 via-cyan-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="p-1.5 rounded-xl bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30">
                <Image
                  src={imgLogo}
                  alt="Logo Fiona"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <span className="font-wf-headline-md font-extrabold tracking-wider text-xl text-white uppercase">
                Fiona
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Plataforma de alta tecnología para la gestión integral de finanzas
              personales, control multidivisa con TRM en vivo, seguimiento de
              inversiones y consolidación patrimonial 360°.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-emerald-400">
                <HiShieldCheck className="w-3.5 h-3.5" />
                Cifrado Bancario
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400">
                <HiLockClosed className="w-3.5 h-3.5" />
                Privacidad Absoluta
              </span>
            </div>
          </div>

          {/* Column: Plataforma */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Plataforma
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/#caracteristicas" className="hover:text-emerald-400 transition-colors">
                  Presupuestos Inteligentes
                </Link>
              </li>
              <li>
                <Link href="/#caracteristicas" className="hover:text-emerald-400 transition-colors">
                  Patrimonio Consolidado
                </Link>
              </li>
              <li>
                <Link href="/#caracteristicas" className="hover:text-emerald-400 transition-colors">
                  Seguimiento de Inversiones
                </Link>
              </li>
              <li>
                <Link href="/#caracteristicas" className="hover:text-emerald-400 transition-colors">
                  Motor Multidivisa & TRM
                </Link>
              </li>
              <li>
                <Link href="/#caracteristicas" className="hover:text-emerald-400 transition-colors">
                  Arquitectura PWA Offline
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Seguridad & Privacidad */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Seguridad & Privacidad
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/#seguridad" className="hover:text-emerald-400 transition-colors">
                  Cero venta de datos
                </Link>
              </li>
              <li>
                <Link href="/#seguridad" className="hover:text-emerald-400 transition-colors">
                  Sesiones HttpOnly blindadas
                </Link>
              </li>
              <li>
                <Link href="/#seguridad" className="hover:text-emerald-400 transition-colors">
                  Sin custodia de contraseñas
                </Link>
              </li>
              <li>
                <Link href="/#seguridad" className="hover:text-emerald-400 transition-colors">
                  Control y exportación total
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Recursos & Acceso */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Recursos
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/blogs" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <span>Blog Financiero</span>
                  <HiArrowUpRight className="w-3 h-3 text-slate-500" />
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-emerald-400 transition-colors">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-emerald-400 transition-colors">
                  Iniciar Sesión
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
                  Crear Cuenta Gratis →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {CURRENT_YEAR} Fiona Financial Technologies. Todos los derechos reservados.</p>
          <p className="flex items-center gap-2">
            <span>Construido con tecnología moderna para tu libertad financiera</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

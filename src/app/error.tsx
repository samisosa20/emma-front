"use client";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HiExclamationTriangle,
  HiArrowPath,
  HiArrowLeft,
  HiShieldCheck,
  HiHome,
} from "react-icons/hi2";

// Assets
import imgLogo from "../../public/img/logo.png";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application Error (500):", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 sm:p-6 lg:p-8 relative overflow-hidden selection:bg-emerald-500 selection:text-slate-950">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[140px]" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[160px]" />
      </div>

      {/* Top Header */}
      <header className="relative z-10 max-w-7xl w-full mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group px-3 py-1.5 rounded-xl hover:bg-white/5"
        >
          <HiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Volver al inicio</span>
        </Link>

        <Link href="/" className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-xl bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30">
            <Image
              src={imgLogo}
              alt="Logo Fiona"
              width={26}
              height={26}
              className="w-6 h-6 object-contain"
            />
          </div>
          <span className="font-wf-headline-md font-extrabold tracking-wider text-lg text-white uppercase">
            Fiona
          </span>
        </Link>
      </header>

      {/* Error Card */}
      <main className="relative z-10 w-full max-w-lg mx-auto my-auto py-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/80 backdrop-blur-2xl border border-white/10 shadow-[0_20px_70px_rgba(0,0,0,0.8)] relative overflow-hidden space-y-6 text-center">
          {/* Card Accent Glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Error Badge */}
          <div className="flex flex-col items-center space-y-3 relative z-10">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-rose-500/20 to-amber-500/20 border border-rose-500/30 shadow-[0_0_25px_rgba(244,63,94,0.2)] text-rose-400">
              <HiExclamationTriangle className="w-10 h-10" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
              <span>Código 500 · Interrupción Temporal del Servidor</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Problema al procesar la solicitud
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
              Hemos registrado una anomalía temporal en la comunicación con el
              servidor. Tu información financiera y tus registros se encuentran
              completamente a salvo y cifrados.
            </p>
          </div>

          {/* Technical Digest Box (if available) */}
          {error?.digest && (
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/10 text-xs text-slate-400 font-mono flex items-center justify-between text-left relative z-10">
              <span className="truncate max-w-[280px]">
                ID: {error.digest}
              </span>
              <span className="text-emerald-400 font-bold shrink-0">
                Registrado ✓
              </span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 relative z-10">
            <button
              onClick={() => reset()}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-sm shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:shadow-[0_0_35px_rgba(16,185,129,0.55)] hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <HiArrowPath className="w-4 h-4" />
              <span>Reintentar conexión</span>
            </button>

            <Link href="/dashboard" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-950 border border-white/15 hover:border-white/30 text-white font-semibold text-sm transition-all duration-200 cursor-pointer">
                <HiHome className="w-4 h-4 text-slate-400" />
                <span>Ir al Panel</span>
              </button>
            </Link>
          </div>

          {/* Security Guarantee */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-slate-400 relative z-10">
            <HiShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Tus datos permanecen cifrados bajo protocolo bancario</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-4 text-xs text-slate-500">
        <p>© Fiona Financial Technologies · Monitor de Salud del Servidor</p>
      </footer>
    </div>
  );
}

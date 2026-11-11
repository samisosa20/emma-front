"use client";
import { useEffect } from "react";
import Link from "next/link";
import {
  HiExclamationTriangle,
  HiArrowPath,
  HiShieldCheck,
  HiHome,
} from "react-icons/hi2";

export default function PrivateErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Private Area Error:", error);
  }, [error]);

  return (
    <div className="w-full min-h-[70vh] flex items-center justify-center p-4 sm:p-6 lg:p-8 relative">
      <div className="w-full max-w-lg p-8 sm:p-10 rounded-3xl bg-slate-900/80 backdrop-blur-2xl border border-white/10 shadow-[0_20px_70px_rgba(0,0,0,0.8)] relative overflow-hidden space-y-6 text-center">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Error Badge */}
        <div className="flex flex-col items-center space-y-3 relative z-10">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-rose-500/20 to-amber-500/20 border border-rose-500/30 shadow-[0_0_25px_rgba(244,63,94,0.2)] text-rose-400">
            <HiExclamationTriangle className="w-10 h-10" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
            <span>Interrupción en la carga del módulo</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Error al consultar los datos
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
            Ocurrió una pausa inesperada al sincronizar este reporte con el servidor. Tus registros financieros están completamente protegidos.
          </p>
        </div>

        {/* Technical Digest Box (if available) */}
        {error?.digest && (
          <div className="p-3 rounded-xl bg-slate-950/70 border border-white/10 text-xs text-slate-400 font-mono flex items-center justify-between text-left relative z-10">
            <span className="truncate max-w-[280px]">ID: {error.digest}</span>
            <span className="text-emerald-400 font-bold shrink-0">Registrado ✓</span>
          </div>
        )}

        {/* Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 relative z-10">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-sm shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:shadow-[0_0_35px_rgba(16,185,129,0.55)] hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <HiArrowPath className="w-4 h-4" />
            <span>Reintentar carga</span>
          </button>

          <Link href="/dashboard" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-950 border border-white/15 hover:border-white/30 text-white font-semibold text-sm transition-all duration-200 cursor-pointer">
              <HiHome className="w-4 h-4 text-slate-400" />
              <span>Volver al Dashboard</span>
            </button>
          </Link>
        </div>

        {/* Security Guarantee */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-slate-400 relative z-10">
          <HiShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Tus datos permanecen cifrados bajo protocolo bancario</span>
        </div>
      </div>
    </div>
  );
}

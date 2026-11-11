import Link from "next/link";
import Image from "next/image";
import { HiMagnifyingGlass, HiHome, HiArrowLeft } from "react-icons/hi2";

// Assets
import imgLogo from "../../public/img/logo.png";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 sm:p-6 lg:p-8 relative overflow-hidden selection:bg-emerald-500 selection:text-slate-950">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px]" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px]" />
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

      {/* Main 404 Card */}
      <main className="relative z-10 w-full max-w-lg mx-auto my-auto py-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/80 backdrop-blur-2xl border border-white/10 shadow-[0_20px_70px_rgba(0,0,0,0.8)] relative overflow-hidden space-y-6 text-center">
          <div className="flex flex-col items-center space-y-3 relative z-10">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 text-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.2)]">
              <HiMagnifyingGlass className="w-10 h-10" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
              <span>Código 404 · Ruta no localizada</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Página no encontrada
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
              El recurso o la dirección solicitada no existe, ha sido movida o ya
              no se encuentra disponible en la plataforma.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 relative z-10">
            <Link href="/" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-sm shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:shadow-[0_0_35px_rgba(16,185,129,0.55)] hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer">
                <HiHome className="w-4 h-4" />
                <span>Ir al Inicio</span>
              </button>
            </Link>

            <Link href="/dashboard" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-950 border border-white/15 hover:border-white/30 text-white font-semibold text-sm transition-all duration-200 cursor-pointer">
                <span>Ir a mi Dashboard</span>
              </button>
            </Link>
          </div>
        </div>
      </main>

      <footer className="relative z-10 text-center py-4 text-xs text-slate-500">
        <p>© Fiona Financial Technologies · Navegación Segura</p>
      </footer>
    </div>
  );
}

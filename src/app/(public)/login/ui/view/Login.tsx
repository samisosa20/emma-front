"use client";
import Image from "next/image";
import Link from "next/link";
import {
  HiShieldCheck,
  HiLockClosed,
  HiSparkles,
  HiArrowLeft,
  HiCheckBadge,
  HiDevicePhoneMobile,
} from "react-icons/hi2";

// Assets
import imgLogo from "../../../../../../public/img/logo.png";

const CURRENT_YEAR = new Date().getFullYear();

export default function Login(props: any) {
  const { onGoogleLogin, isSubmitting } = props;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 sm:p-6 lg:p-8 relative overflow-hidden selection:bg-emerald-500 selection:text-slate-950">
      {/* Background Tech Gradients / Ambient Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px]" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[160px]" />
      </div>

      {/* Top Bar: Return to Home & Logo */}
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

      {/* Main Login Card */}
      <main className="relative z-10 w-full max-w-md mx-auto my-auto py-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/80 backdrop-blur-2xl border border-white/10 shadow-[0_20px_70px_rgba(0,0,0,0.8)] relative overflow-hidden space-y-6">
          {/* Subtle card glow accent */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Branding Header */}
          <div className="flex flex-col items-center text-center space-y-3 relative z-10">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 shadow-[0_0_25px_rgba(16,185,129,0.2)]">
              <Image
                src={imgLogo}
                alt="Fiona Logo"
                width={44}
                height={44}
                className="w-11 h-11 object-contain"
                priority
              />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <HiSparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Acceso Seguro a la Plataforma</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Bienvenido a Fiona
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Inicia sesión o crea tu cuenta con Google. Si es tu primera vez,
              configuraremos tu espacio financiero automáticamente.
            </p>
          </div>

          {/* Security Banner */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/10 flex items-start gap-3.5 text-xs text-slate-300 relative z-10">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5">
              <HiShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="font-semibold text-white">
                Protección Criptográfica
              </div>
              <p className="text-slate-400 leading-tight">
                Sesión blindada con Better Auth y cookies HttpOnly. Cero acceso o
                solicitud de claves bancarias reales.
              </p>
            </div>
          </div>

          {/* Primary Action: Google SSO */}
          <div className="pt-2 relative z-10">
            <button
              onClick={onGoogleLogin}
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-3.5 bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm rounded-2xl py-4 px-6 transition-all duration-200 shadow-[0_4px_25px_rgba(255,255,255,0.15)] hover:shadow-[0_4px_30px_rgba(255,255,255,0.25)] hover:scale-[1.01] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed group cursor-pointer"
            >
              <svg
                className="w-5 h-5 shrink-0"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span>{isSubmitting ? "Conectando..." : "Continuar con Google"}</span>
            </button>
          </div>

          {/* Micro Benefits */}
          <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] text-slate-400 border-t border-white/10 relative z-10">
            <div className="flex items-center gap-1.5">
              <HiCheckBadge className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Registro en 1 clic</span>
            </div>
            <div className="flex items-center gap-1.5">
              <HiLockClosed className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Cero contraseñas bancarias</span>
            </div>
            <div className="flex items-center gap-1.5 col-span-2 justify-center pt-1 text-slate-400">
              <HiDevicePhoneMobile className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>Disponible en iOS PWA, Android PWA y Web</span>
            </div>
          </div>

          {/* Footer Terms */}
          <div className="text-center pt-2 relative z-10">
            <p className="text-xs text-slate-400 leading-relaxed">
              Al continuar, aceptas la soberanía de tus datos y nuestras políticas de
              <Link
                href="/#seguridad"
                className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2 ml-1"
              >
                Seguridad & Privacidad
              </Link>
              .
            </p>
          </div>
        </div>
      </main>

      {/* Bottom Footer */}
      <footer className="relative z-10 text-center py-4 text-xs text-slate-400">
        <p>© {CURRENT_YEAR} Fiona Financial Technologies · Cifrado bancario</p>
      </footer>
    </div>
  );
}

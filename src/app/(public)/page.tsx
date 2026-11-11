"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HiShieldCheck,
  HiLockClosed,
  HiFingerPrint,
  HiKey,
  HiArrowTrendingUp,
  HiGlobeAmericas,
  HiSparkles,
  HiCheckBadge,
  HiDevicePhoneMobile,
  HiArrowRight,
  HiChevronDown,
  HiChevronUp,
  HiArrowsRightLeft,
  HiUserGroup,
  HiTag,
  HiWifi,
  HiChartPie,
  HiScale,
  HiCheck,
} from "react-icons/hi2";

// Assets
import imgLogoLetter from "../../../public/img/logo-letter.svg";
import imgMainIphone from "../../../public/img/iphone.png";
import imgInvestment from "../../../public/img/investment.png";
import imgHeritage from "../../../public/img/heritage.png";
import imgBudget from "../../../public/img/budget.png";

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "¿Fiona solicita contraseñas o acceso a mis cuentas bancarias?",
      answer:
        "No. Fiona está diseñada bajo un principio de soberanía y privacidad estricta. Nunca te pediremos tus credenciales bancarias ni contraseñas de terceros. Tú tienes el control total para registrar tus saldos, movimientos y cuentas sin ceder acceso a tus instituciones bancarias.",
    },
    {
      question: "¿Cómo funciona la arquitectura Offline-First (PWA)?",
      answer:
        "Fiona está construida como una Progressive Web App (PWA) de última generación. Puedes instalarla en tu iPhone, Android o computadora. Gracias a su caché inteligente, puedes registrar transacciones en el metro, en un avión o en lugares sin cobertura; al recuperar conexión, tus datos se sincronizan automáticamente sin pérdidas.",
    },
    {
      question: "¿Cómo gestiona Fiona las finanzas en múltiples monedas?",
      answer:
        "Fiona cuenta con un motor multidivisa que soporta USD, EUR, COP y otras divisas globales. Puedes registrar cuentas y transacciones en su moneda de origen y consultar tu balance consolidado convertido con tasas de cambio y TRM en tiempo real.",
    },
    {
      question: "¿Por qué Fiona es superior a una hoja de cálculo o Excel?",
      answer:
        "Las hojas de cálculo se desactualizan, son lentas en móvil, no ofrecen sincronización offline confiable y son propensas a errores de fórmulas. Fiona automatiza el cálculo de patrimonio neto, techos presupuestarios 50/30/20, conversiones TRM y visualizaciones interactivas en una interfaz ultra rápida y segura.",
    },
    {
      question: "¿Es gratis o existen cobros ocultos?",
      answer:
        "Puedes comenzar a usar Fiona de manera gratuita de inmediato. No solicitamos tarjetas de crédito para registrarte y todos los módulos core (cuentas, presupuestos, patrimonio, inversiones y eventos) están disponibles desde el primer día.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-slate-950 overflow-x-hidden relative">
      {/* Background Tech Gradients / Ambient Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/4 -right-40 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-600/5 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32 py-10 sm:py-16">
        {/* ============================================================ */}
        {/* 1. HERO SECTION                                              */}
        {/* ============================================================ */}
        <section className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16 pt-4 sm:pt-8">
          <div className="max-w-2xl text-center lg:text-left space-y-6">
            {/* Tech pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold tracking-wide">
              <HiSparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>Plataforma Financiera PWA · Seguridad & Criptografía</span>
            </div>

            <div className="hidden lg:block">
              <Image
                src={imgLogoLetter}
                alt="Fiona"
                width={150}
                height={40}
                className="w-[140px] h-auto object-contain brightness-110"
                priority
              />
            </div>

            <h1 className="font-wf-headline-lg text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.12]">
              Toma el control absoluto de tus finanzas con{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                precisión tecnológica
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
              Centraliza cuentas, monitorea tu patrimonio consolidado 360°,
              optimiza presupuestos y gestiona activos multidivisa con la app
              diseñada para inspirar seguridad, velocidad y libertad.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link href="/login" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-base shadow-[0_0_35px_rgba(16,185,129,0.35)] hover:shadow-[0_0_45px_rgba(16,185,129,0.55)] hover:scale-[1.02] active:scale-95 transition-all duration-200">
                  <span>Comenzar gratis hoy</span>
                  <HiArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="#caracteristicas" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800/80 border border-white/10 hover:border-white/25 text-white font-semibold text-base transition-all duration-200">
                  Explorar capacidades
                </button>
              </Link>
            </div>

            {/* Micro Trust Indicators */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-400 text-left">
              <div className="flex items-center gap-2">
                <HiCheckBadge className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Sin acceso a tus claves bancarias</span>
              </div>
              <div className="flex items-center gap-2">
                <HiWifi className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>100% Funcional Offline (PWA)</span>
              </div>
              <div className="flex items-center gap-2">
                <HiGlobeAmericas className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Multidivisa con TRM en vivo</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Mockup with Floating Badges */}
          <div className="relative flex-shrink-0 flex items-center justify-center">
            {/* Ambient device glow behind iPhone */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/25 via-cyan-500/20 to-transparent blur-3xl rounded-full scale-110" />

            {/* iPhone Frame */}
            <div className="relative z-10 p-2 sm:p-3 rounded-[40px] bg-slate-900/60 border border-white/15 backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
              <Image
                src={imgMainIphone}
                alt="Fiona Mobile App"
                width={300}
                height={600}
                className="w-[220px] sm:w-[270px] md:w-[310px] h-auto object-contain drop-shadow-2xl"
                priority
              />
            </div>

            {/* Floating Glass Widget 1: Net Worth */}
            <div className="hidden sm:flex absolute -top-4 -left-8 z-20 items-center gap-3 p-3.5 rounded-2xl bg-slate-900/85 backdrop-blur-xl border border-emerald-500/30 shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-500">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                <HiArrowTrendingUp className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-slate-400 font-medium">Patrimonio Neto</div>
                <div className="text-sm font-bold text-white">$ 148,250.00 <span className="text-[10px] font-mono text-emerald-400">+24.8%</span></div>
              </div>
            </div>

            {/* Floating Glass Widget 2: Security */}
            <div className="hidden sm:flex absolute bottom-8 -left-10 z-20 items-center gap-3 p-3.5 rounded-2xl bg-slate-900/85 backdrop-blur-xl border border-cyan-500/30 shadow-2xl">
              <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
                <HiShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-slate-400 font-medium">Seguridad Criptográfica</div>
                <div className="text-xs font-semibold text-white">Sesión HttpOnly Blindada</div>
              </div>
            </div>

            {/* Floating Glass Widget 3: Multicurrency */}
            <div className="hidden sm:flex absolute top-1/2 -right-10 z-20 items-center gap-3 p-3.5 rounded-2xl bg-slate-900/85 backdrop-blur-xl border border-teal-500/30 shadow-2xl">
              <div className="p-2 rounded-xl bg-teal-500/20 text-teal-400">
                <HiArrowsRightLeft className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-slate-400 font-medium">Conversión Automática</div>
                <div className="text-xs font-semibold text-white">USD · EUR · COP (TRM)</div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 2. TRUST & SECURITY STRIP                                    */}
        {/* ============================================================ */}
        <section id="seguridad" className="scroll-mt-24 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Privacidad de Grado Financiero
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Seguridad diseñada desde el código, no como un añadido
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Tus finanzas son sagradas. Fiona está construida bajo una estricta política de soberanía de datos y cero fricción con tus credenciales privadas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1 */}
            <div className="p-6 rounded-3xl bg-slate-900/50 border border-white/10 hover:border-emerald-500/40 transition-all duration-300 space-y-4 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <HiShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Cifrado Integral</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Toda la comunicación e información se transmite mediante protocolos criptográficos modernos con aislamiento de datos por usuario.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-3xl bg-slate-900/50 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 space-y-4 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] group">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <HiLockClosed className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Cookies HttpOnly</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Autenticación blindada con Better Auth. Las credenciales de sesión viajan protegidas contra accesos no autorizados por scripts XSS.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-3xl bg-slate-900/50 border border-white/10 hover:border-teal-500/40 transition-all duration-300 space-y-4 hover:shadow-[0_0_30px_rgba(20,184,166,0.15)] group">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
                <HiFingerPrint className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Cero Venta de Datos</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                No monetizamos tus hábitos financieros. Tus movimientos jamás son compartidos, vendidos ni analizados con fines publicitarios.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="p-6 rounded-3xl bg-slate-900/50 border border-white/10 hover:border-emerald-500/40 transition-all duration-300 space-y-4 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <HiKey className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Sin Claves Externas</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Cero riesgo de vulneración bancaria. No almacenamos credenciales de acceso a tus bancos reales; tú mantienes la soberanía.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 3. BENTO GRID OF CORE CAPABILITIES                           */}
        {/* ============================================================ */}
        <section id="caracteristicas" className="scroll-mt-24 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Arquitectura & Capacidades
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ingeniería financiera para decisiones inteligentes
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Herramientas de nivel profesional agrupadas en un ecosistema sincronizado, reactivo y multidispositivo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Bento Card 1: Patrimonio 360° (Col span 2 on lg) */}
            <div className="lg:col-span-2 p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/80 to-slate-950 border border-white/10 relative overflow-hidden flex flex-col justify-between group hover:border-emerald-500/50 transition-all duration-300">
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/15 transition-all" />

              <div className="space-y-4 relative z-10 max-w-lg">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  <HiScale className="w-4 h-4" />
                  <span>Visión Consolidada</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Patrimonio Neto Consolidado (Net Worth 360°)
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Conoce con exactitud el valor real de tu libertad financiera. Fiona unifica tus cuentas líquidas, efectivo, bienes raíces, vehículos e inversiones, deduciendo pasivos y deudas en un balance patrimonial neto actualizado en tiempo real.
                </p>
              </div>

              {/* Visual mini-indicator inside card */}
              <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-3 gap-4 relative z-10 text-center sm:text-left">
                <div>
                  <div className="text-xs text-slate-400">Activos Líquidos</div>
                  <div className="text-base sm:text-lg font-bold text-emerald-400">+ Cuentas & Cash</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Inmovilizados</div>
                  <div className="text-base sm:text-lg font-bold text-cyan-400">+ Inmuebles & Autos</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Pasivos</div>
                  <div className="text-base sm:text-lg font-bold text-rose-400">- Deudas & Créditos</div>
                </div>
              </div>
            </div>

            {/* Bento Card 2: Motor Multidivisa */}
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/10 relative overflow-hidden flex flex-col justify-between group hover:border-teal-500/50 transition-all duration-300">
              <div className="space-y-4 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs font-bold uppercase tracking-wider">
                  <HiGlobeAmericas className="w-4 h-4" />
                  <span>Finanzas Globales</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Motor Multidivisa & TRM Continua
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Registra movimientos y mantén balances en USD, EUR o tu moneda local. Fiona recalcula el patrimonio consolidado con tasas de cambio y TRM precisas.
                </p>
              </div>

              <div className="mt-6 p-4 rounded-2xl bg-slate-950/80 border border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300">1 USD ≈ TRM Actual</span>
                <span className="text-emerald-400 font-bold">Auto-Sync</span>
              </div>
            </div>

            {/* Bento Card 3: Presupuestos 50/30/20 */}
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/10 relative overflow-hidden flex flex-col justify-between group hover:border-cyan-500/50 transition-all duration-300">
              <div className="space-y-4 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                  <HiChartPie className="w-4 h-4" />
                  <span>Planificación Dinámica</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Presupuestos Inteligentes 50/30/20
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Establece techos de gasto por categoría (Necesidades, Deseos y Ahorro). Recibe alertas visuales antes de sobrepasar tus límites del mes.
                </p>
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Presupuesto mensual</span>
                  <span className="text-emerald-400 font-bold">68% utilizado</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 w-[68%]" />
                </div>
              </div>
            </div>

            {/* Bento Card 4: Tags de Vida & Eventos */}
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/10 relative overflow-hidden flex flex-col justify-between group hover:border-emerald-500/50 transition-all duration-300">
              <div className="space-y-4 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  <HiTag className="w-4 h-4" />
                  <span>Contexto Real</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Eventos & Tags de Vida
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  El dinero no solo se divide en categorías. Agrupa gastos transversales en eventos como <em>Vacaciones</em>, <em>Mudanza</em> o <em>Proyecto Casa</em> para auditar cuánto te costó cada hito.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 text-xs">
                <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-slate-300">🏖️ Vacaciones 2026</span>
                <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-slate-300">📦 Mudanza</span>
                <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-slate-300">🎓 Certificación</span>
              </div>
            </div>

            {/* Bento Card 5: Espacios Compartidos */}
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/10 relative overflow-hidden flex flex-col justify-between group hover:border-cyan-500/50 transition-all duration-300">
              <div className="space-y-4 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                  <HiUserGroup className="w-4 h-4" />
                  <span>Colaborativo</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Espacios Compartidos
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Gestiona finanzas en pareja, con socios o compañeros de piso. Lleva cuentas claras de quién pagó qué y balances netos sin mezclar tus cuentas individuales.
                </p>
              </div>

              <div className="mt-6 p-4 rounded-2xl bg-slate-950/80 border border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400">Balance Pareja</span>
                <span className="text-emerald-400 font-bold">Cuentas al día ✓</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 4. PRODUCT MODULES IN ACTION                                 */}
        {/* ============================================================ */}
        <section id="modulos" className="scroll-mt-24 space-y-20 sm:space-y-28">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Módulos Especializados
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Construido para el día a día y para tus metas a largo plazo
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Cada pantalla de Fiona está diseñada para minimizar la fricción de entrada y maximizar la claridad en tus decisiones.
            </p>
          </div>

          {/* Module 1: Presupuestos */}
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 justify-between p-8 sm:p-12 rounded-3xl bg-slate-900/40 border border-white/10">
            <div className="max-w-xl space-y-5 text-center lg:text-left">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-widest uppercase">
                Módulo Presupuestos
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Presupuestos que se adaptan a tu vida real
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Olvídate de presupuestos rígidos que se rompen al tercer día. Fiona te permite definir techos por categorías jerárquicas, monitorear el ritmo de gasto diario proyectado y ajustar desviaciones antes de que impacten tu capacidad de ahorro.
              </p>
              <ul className="space-y-3 text-sm text-slate-300 text-left pt-2">
                <li className="flex items-center gap-3">
                  <HiCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Techos mensuales configurables por moneda y categoría.</span>
                </li>
                <li className="flex items-center gap-3">
                  <HiCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Alertas visuales de advertencia temprana al superar el 80%.</span>
                </li>
                <li className="flex items-center gap-3">
                  <HiCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Visualización gráfica del progreso porcentual en tiempo real.</span>
                </li>
              </ul>
            </div>
            <div className="relative shrink-0 flex justify-center">
              <div className="absolute inset-0 bg-emerald-500/15 rounded-3xl blur-2xl" />
              <div className="relative p-2 rounded-3xl bg-slate-950 border border-white/15 shadow-2xl">
                <Image
                  src={imgBudget}
                  alt="Módulo de Presupuestos Fiona"
                  width={240}
                  height={480}
                  className="w-[200px] sm:w-[240px] md:w-[260px] h-auto object-contain rounded-2xl"
                />
              </div>
            </div>
          </div>

          {/* Module 2: Patrimonio */}
          <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16 justify-between p-8 sm:p-12 rounded-3xl bg-slate-900/40 border border-white/10">
            <div className="relative shrink-0 flex justify-center">
              <div className="absolute inset-0 bg-cyan-500/15 rounded-3xl blur-2xl" />
              <div className="relative p-2 rounded-3xl bg-slate-950 border border-white/15 shadow-2xl">
                <Image
                  src={imgHeritage}
                  alt="Módulo de Patrimonio Fiona"
                  width={240}
                  height={480}
                  className="w-[200px] sm:w-[240px] md:w-[260px] h-auto object-contain rounded-2xl"
                />
              </div>
            </div>
            <div className="max-w-xl space-y-5 text-center lg:text-left">
              <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-widest uppercase">
                Módulo Patrimonio
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Consolidación patrimonial y valoración de activos
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Tus finanzas van mucho más allá del saldo de tu cuenta de ahorros. Registra activos tangibles como inmuebles y vehículos con su apreciación o depreciación estimada y mantén un inventario claro de todo lo que has construido.
              </p>
              <ul className="space-y-3 text-sm text-slate-300 text-left pt-2">
                <li className="flex items-center gap-3">
                  <HiCheck className="w-5 h-5 text-cyan-400 shrink-0" />
                  <span>Separación clara entre patrimonio líquido y patrimonio inmovilizado.</span>
                </li>
                <li className="flex items-center gap-3">
                  <HiCheck className="w-5 h-5 text-cyan-400 shrink-0" />
                  <span>Seguimiento de valorización histórica de bienes raíces y vehículos.</span>
                </li>
                <li className="flex items-center gap-3">
                  <HiCheck className="w-5 h-5 text-cyan-400 shrink-0" />
                  <span>Balance neto unificado con pasivos e hipotecas asociadas.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Module 3: Inversiones */}
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 justify-between p-8 sm:p-12 rounded-3xl bg-slate-900/40 border border-white/10">
            <div className="max-w-xl space-y-5 text-center lg:text-left">
              <span className="inline-block px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-bold tracking-widest uppercase">
                Módulo Inversiones
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Rendimientos, aportes y plusvalías en un solo lugar
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Monitorea tus fondos indexados, acciones, criptoactivos y CDTs sin hojas de cálculo confusas. Registra tus aportes periódicos y visualiza la rentabilidad neta acumulada de tu portafolio de inversión.
              </p>
              <ul className="space-y-3 text-sm text-slate-300 text-left pt-2">
                <li className="flex items-center gap-3">
                  <HiCheck className="w-5 h-5 text-teal-400 shrink-0" />
                  <span>Cálculo automático de plusvalías latentes y realizadas.</span>
                </li>
                <li className="flex items-center gap-3">
                  <HiCheck className="w-5 h-5 text-teal-400 shrink-0" />
                  <span>Soporte para múltiples activos y valorizaciones periódicas.</span>
                </li>
                <li className="flex items-center gap-3">
                  <HiCheck className="w-5 h-5 text-teal-400 shrink-0" />
                  <span>Gráficas evolutivas de rendimiento con Recharts.</span>
                </li>
              </ul>
            </div>
            <div className="relative shrink-0 flex justify-center">
              <div className="absolute inset-0 bg-teal-500/15 rounded-3xl blur-2xl" />
              <div className="relative p-2 rounded-3xl bg-slate-950 border border-white/15 shadow-2xl">
                <Image
                  src={imgInvestment}
                  alt="Módulo de Inversiones Fiona"
                  width={240}
                  height={480}
                  className="w-[200px] sm:w-[240px] md:w-[260px] h-auto object-contain rounded-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 5. COMPARISON TABLE: EXCEL VS APPS VS FIONA                  */}
        {/* ============================================================ */}
        <section className="space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Comparativa Tecnológica
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              ¿Por qué elegir Fiona frente a las alternativas?
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Diseñado específicamente para quienes buscan rigor analítico sin sacrificar velocidad ni privacidad.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-white/10 bg-slate-900/60 p-4 sm:p-6 backdrop-blur-xl">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-4 px-4 sm:px-6">Característica</th>
                  <th className="py-4 px-4 sm:px-6">Hojas de Cálculo / Excel</th>
                  <th className="py-4 px-4 sm:px-6">Apps Bancarias Tradicionales</th>
                  <th className="py-4 px-4 sm:px-6 text-emerald-400 font-extrabold">Fiona Platform</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                <tr>
                  <td className="py-4 px-4 sm:px-6 font-semibold text-white">Privacidad y Cero Publicidad</td>
                  <td className="py-4 px-4 sm:px-6 text-slate-400">Varía según proveedor nube</td>
                  <td className="py-4 px-4 sm:px-6 text-rose-400">Venta de perfil para créditos</td>
                  <td className="py-4 px-4 sm:px-6 text-emerald-400 font-bold">100% Privado · Sin trackers</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 sm:px-6 font-semibold text-white">Funcionamiento Offline (PWA)</td>
                  <td className="py-4 px-4 sm:px-6 text-rose-400">Lento e incómodo en móvil</td>
                  <td className="py-4 px-4 sm:px-6 text-rose-400">Bloqueado sin internet</td>
                  <td className="py-4 px-4 sm:px-6 text-emerald-400 font-bold">Instantáneo · Sync automático</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 sm:px-6 font-semibold text-white">Motor Multidivisa con TRM</td>
                  <td className="py-4 px-4 sm:px-6 text-rose-400">Fórmulas manuales frágiles</td>
                  <td className="py-4 px-4 sm:px-6 text-slate-400">Solo su propia moneda</td>
                  <td className="py-4 px-4 sm:px-6 text-emerald-400 font-bold">Tasas en vivo automatizadas</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 sm:px-6 font-semibold text-white">Patrimonio Neto 360°</td>
                  <td className="py-4 px-4 sm:px-6 text-slate-400">Complejo de mantener</td>
                  <td className="py-4 px-4 sm:px-6 text-rose-400">Solo ve su propio banco</td>
                  <td className="py-4 px-4 sm:px-6 text-emerald-400 font-bold">Líquido + Fijo + Inversiones</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 sm:px-6 font-semibold text-white">Espacios y Finanzas en Pareja</td>
                  <td className="py-4 px-4 sm:px-6 text-slate-400">Archivos compartidos caóticos</td>
                  <td className="py-4 px-4 sm:px-6 text-rose-400">Inexistente</td>
                  <td className="py-4 px-4 sm:px-6 text-emerald-400 font-bold">Espacios con balances netos</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 6. INTERACTIVE FAQ                                           */}
        {/* ============================================================ */}
        <section id="faq" className="scroll-mt-24 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Claridad Total
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Preguntas Frecuentes
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Todo lo que necesitas saber sobre la seguridad, tecnología y funcionamiento de Fiona.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-slate-900/60 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors focus:outline-none"
                  >
                    <span className="font-semibold text-white text-base sm:text-lg">
                      {faq.question}
                    </span>
                    <span className="p-1 rounded-full bg-white/5 text-emerald-400 shrink-0">
                      {isOpen ? (
                        <HiChevronUp className="w-5 h-5" />
                      ) : (
                        <HiChevronDown className="w-5 h-5" />
                      )}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-300 text-sm sm:text-base leading-relaxed border-t border-white/5 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 7. HIGH-CONVERSION FINAL CALL TO ACTION                      */}
        {/* ============================================================ */}
        <section className="relative rounded-3xl p-8 sm:p-14 md:p-16 overflow-hidden border border-emerald-500/30 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-center shadow-[0_0_80px_rgba(16,185,129,0.15)]">
          {/* Ambient glow inside CTA */}
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <HiDevicePhoneMobile className="w-4 h-4" />
              <span>Instálalo en tu móvil o utilízalo en la web</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Comienza a construir tu{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                soberanía financiera
              </span>{" "}
              hoy mismo
            </h2>

            <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed">
              Crea tu cuenta en 30 segundos. Sin tarjetas de crédito, sin ceder claves bancarias y con la certeza de que tu información está 100% blindada.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/login" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-base shadow-[0_0_35px_rgba(16,185,129,0.35)] hover:shadow-[0_0_50px_rgba(16,185,129,0.55)] hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2">
                  <span>Registrarse gratis</span>
                  <HiArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="/login" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 border border-white/20 hover:border-white/40 text-white font-semibold text-base transition-all duration-200">
                  Ya tengo una cuenta
                </button>
              </Link>
            </div>

            <p className="text-xs text-slate-500 pt-2">
              Disponible en Web, iOS PWA y Android PWA · Cero publicidad
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

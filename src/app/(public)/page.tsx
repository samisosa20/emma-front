"use client";
import Image from "next/image";
import Link from "next/link";

// Assets
import imgLogoLetter from "../../../public/img/logo-letter.svg";
import imgMainIphone from "../../../public/img/iphone.png";
import imgInvestment from "../../../public/img/investment.png";
import imgHeritage from "../../../public/img/heritage.png";
import imgBudget from "../../../public/img/budget.png";

import iconLineChart from "../../../public/img/icon-line-chart.svg";
import iconPieChart from "../../../public/img/icon-pie-chart.svg";
import iconPigBank from "../../../public/img/icon-pig-bank.svg";
import iconManagment from "../../../public/img/icon-managment.svg";

//components
import useComponents from "@/share/components";

export default function Home() {
  const { Typography, Button } = useComponents();
  return (
    <div className="min-h-screen bg-primary text-white space-y-12 sm:space-y-16 py-8 overflow-x-hidden">
      <article className="px-4 sm:px-8 max-w-[1280px] mx-auto space-y-16 sm:space-y-24">
        {/* Hero Section */}
        <section className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-16 justify-between pt-4 sm:pt-8">
          <div className="max-w-[600px] text-center lg:text-left">
            <Image
              src={imgLogoLetter}
              alt="Logo Fiona"
              width={160}
              height={44}
              className="mb-6 hidden lg:block w-[160px] h-auto object-contain"
              priority
            />
            <h1 className="font-wf-headline-lg text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Manejo de finanzas personales
            </h1>
            <p className="text-white/80 font-wf-body-regular text-base sm:text-lg leading-relaxed mb-8">
              No se trata solo de cuánto ganas, sino de cómo manejas lo que
              tienes. Transforma tus hábitos financieros y verás cómo cada
              centavo cuenta en la creación de tu prosperidad.
            </p>
            <div className="flex justify-center lg:justify-start gap-4">
              <Link href="/register">
                <button className="bg-yellow-400 text-slate-950 font-bold px-6 py-3 rounded-full hover:bg-yellow-300 transition-all active:scale-95 shadow-lg">
                  Comenzar gratis
                </button>
              </Link>
              <Link href="/login">
                <button className="border border-white/40 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition-all active:scale-95">
                  Iniciar sesión
                </button>
              </Link>
            </div>
          </div>
          <div className="flex-shrink-0 flex justify-center">
            <Image
              src={imgMainIphone}
              alt="Dashboard Fiona"
              width={240}
              height={480}
              className="w-[200px] sm:w-[240px] md:w-[280px] h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              priority
            />
          </div>
        </section>

        {/* Feature Banner Section */}
        <section className="relative my-8 sm:my-16 bg-white text-slate-900 rounded-3xl p-6 sm:p-10 md:p-14 shadow-2xl overflow-hidden border border-white/20">
          {/* Subtle Decorative Floating Icons (Properly sized) */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 opacity-20 hover:opacity-80 transition-opacity pointer-events-none">
            <Image
              src={iconLineChart}
              alt="Gráfico"
              width={40}
              height={40}
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
            />
          </div>
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 opacity-20 hover:opacity-80 transition-opacity pointer-events-none">
            <Image
              src={iconPieChart}
              alt="Gráfico Pie"
              width={40}
              height={40}
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
            />
          </div>
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 opacity-20 hover:opacity-80 transition-opacity pointer-events-none">
            <Image
              src={iconPigBank}
              alt="Alcancía"
              width={40}
              height={40}
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
            />
          </div>
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 opacity-20 hover:opacity-80 transition-opacity pointer-events-none">
            <Image
              src={iconManagment}
              alt="Manejo"
              width={40}
              height={40}
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
            />
          </div>

          <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
            <h2 className="font-wf-headline-lg text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
              Todo lo que necesitas en un solo lugar
            </h2>
            <p className="text-slate-600 font-wf-body-regular text-sm sm:text-base leading-relaxed">
              Descubre <strong className="text-slate-900">Fiona</strong>, tu aliado financiero gratuito. Con esta
              aplicación, gestionar tus finanzas personales se vuelve fácil y
              accesible. Registra tus ingresos y gastos de manera sencilla, crea
              presupuestos personalizados y recibe análisis detallados de tu
              actividad financiera. Además, <strong>Fiona</strong> ofrece
              herramientas intuitivas para ayudarte a ahorrar, planificar metas y
              realizar un seguimiento de tus inversiones.
            </p>
            <div className="pt-2">
              <Link href="/register">
                <button className="bg-primary text-white font-bold px-8 py-3.5 rounded-full hover:bg-primary/90 transition-all active:scale-95 shadow-md">
                  Registrarse gratis
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Feature 1: Presupuesto */}
        <section className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 justify-between">
          <div className="max-w-[600px] text-center lg:text-left">
            <span className="text-xs font-bold font-wf-label-caps uppercase tracking-widest text-emerald-400 block mb-2">
              Planificación
            </span>
            <h2 className="font-wf-headline-lg text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Presupuestos Inteligentes
            </h2>
            <p className="text-white/80 font-wf-body-regular text-sm sm:text-base leading-relaxed">
              Imagina que tu dinero es como un tesoro, y el presupuesto es como
              un plan para usar ese tesoro de la mejor manera posible. Te ayuda
              a decidir en qué gastar tu dinero, a ahorrar un poquito, y a
              asegurarte de que siempre tengas suficiente para las cosas
              importantes. Es como un mapa para que tu dinero trabaje contigo y
              te ayude a conseguir lo que quieres.
            </p>
          </div>
          <div className="flex-shrink-0 flex justify-center">
            <Image
              src={imgBudget}
              alt="Presupuesto Fiona"
              width={220}
              height={440}
              className="w-[180px] sm:w-[220px] md:w-[260px] h-auto object-contain drop-shadow-2xl rounded-2xl"
            />
          </div>
        </section>

        {/* Feature 2: Patrimonio */}
        <section className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-16 justify-between">
          <div className="flex-shrink-0 flex justify-center">
            <Image
              src={imgHeritage}
              alt="Patrimonio Fiona"
              width={220}
              height={440}
              className="w-[180px] sm:w-[220px] md:w-[260px] h-auto object-contain drop-shadow-2xl rounded-2xl"
            />
          </div>
          <div className="max-w-[600px] text-center lg:text-left">
            <span className="text-xs font-bold font-wf-label-caps uppercase tracking-widest text-yellow-400 block mb-2">
              Consolidación
            </span>
            <h2 className="font-wf-headline-lg text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Control de Patrimonio
            </h2>
            <p className="text-white/80 font-wf-body-regular text-sm sm:text-base leading-relaxed">
              Mantener y hacer crecer tu patrimonio significa cuidar bien de
              tus posesiones y, si es posible, agregar más al tesoro con el
              tiempo. Construye tu propia fortaleza financiera para sentirte
              seguro y tener más opciones en la vida.
            </p>
          </div>
        </section>

        {/* Feature 3: Inversión */}
        <section className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 justify-between">
          <div className="max-w-[600px] text-center lg:text-left">
            <span className="text-xs font-bold font-wf-label-caps uppercase tracking-widest text-sky-400 block mb-2">
              Rendimiento
            </span>
            <h2 className="font-wf-headline-lg text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Seguimiento de Inversiones
            </h2>
            <p className="text-white/80 font-wf-body-regular text-sm sm:text-base leading-relaxed">
              Manejar una inversión es como dirigir un barco: necesitas un rumbo
              claro y ajustar las velas según el viento del mercado.
              Constantemente evalúas el rendimiento, haces ajustes según el
              panorama financiero y te aseguras de que estás en camino hacia tus
              metas.
            </p>
          </div>
          <div className="flex-shrink-0 flex justify-center">
            <Image
              src={imgInvestment}
              alt="Inversión Fiona"
              width={220}
              height={440}
              className="w-[180px] sm:w-[220px] md:w-[260px] h-auto object-contain drop-shadow-2xl rounded-2xl"
            />
          </div>
        </section>
      </article>
    </div>
  );
}

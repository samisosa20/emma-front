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
    <div className="min-h-screen bg-primary space-y-4">
      <article className="px-8 max-w-[1280px] mx-auto">
        <section className="flex flex-wrap items-center gap-y-8 lg:gap-y-0 lg:gap-x-24 justify-center">
          <div className="max-w-[600px]">
            <Image
              src={imgLogoLetter}
              alt="Logo Fiona"
              loading="lazy"
              width={148}
              height={40}
              className="mx-auto mb-4 hidden lg:block"
            />
            <Typography variant="h2" className="text-white mb-8">
              Manejo de finanzas personales
            </Typography>
            <Typography variant="p" className="text-white">
              No se trata solo de cuánto ganas, sino de cómo manejas lo que
              tienes. Transforma tus hábitos financieros y verás cómo cada
              centavo cuenta en la creación de tu prosperidad.
            </Typography>
          </div>
          <div className="flex-shink-0">
            <Image
              src={imgMainIphone}
              alt="Dashboard Fiona"
              loading="lazy"
              width={200}
              height={390}
            />
          </div>
        </section>
        <section className="relative py-12 mb-24 lg:mb-48">
          <div className="bg-white absolute w-screen left-1/2 transform -translate-x-1/2">
            <div className="px-8 max-w-[1280px] mx-auto py-4">
              <Typography variant="h2" className="mb-8 text-center">
                Todo lo que necesitan en un solo lugar
              </Typography>
              <Typography className="max-w-[1280px]">
                Descubre <b>Fiona</b>, tu aliado financiero gratuito. Con esta
                aplicación, gestionar tus finanzas personales se vuelve fácil y
                accesible. Registra tus ingresos y gastos de manera sencilla,
                crea presupuestos personalizados y recibe análisis detallados de
                tu actividad financiera. Además, <b>Fiona</b> ofrece
                herramientas intuitivas para ayudarte a ahorrar, planificar
                metas y realizar un seguimiento de tus inversiones. Con una
                interfaz amigable y sin costos ocultos, es la opción perfecta
                para tener el control total de tus finanzas sin complicaciones.
                ¡Regístrate ahora y da el primer paso hacia una gestión
                financiera inteligente!
              </Typography>
              <div className="text-center mt-4">
                <Link href="/register">
                  <Button>Registrarse</Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute top-8 -left-4 2xl:-left-48 transform -rotate-[25deg]">
            <Image
              src={iconLineChart}
              alt="Gráfico Linea Fiona"
              loading="lazy"
              width={50}
              height={50}
            />
          </div>
          <div className="absolute top-20 lg:top-8 -right-6 lg:-right-4 2xl:-right-48 transform -rotate-[25deg]">
            <Image
              src={iconPieChart}
              alt="Gráfico Pie Fiona"
              loading="lazy"
              width={50}
              height={50}
            />
          </div>
          <div className="absolute -bottom-[400px] lg:-bottom-[200px] -right-4 2xl:-right-32 transform -rotate-[25deg]">
            <Image
              src={iconPigBank}
              alt="Pig Bank Fiona"
              loading="lazy"
              width={50}
              height={50}
            />
          </div>
          <div className="absolute -bottom-[400px] lg:-bottom-[200px] -left-4 2xl:-left-32 transform -rotate-[25deg]">
            <Image
              src={iconManagment}
              alt="Manejo Fiona"
              loading="lazy"
              width={50}
              height={50}
            />
          </div>
        </section>
        <section className="flex flex-wrap items-center gap-y-8 lg:gap-y-0 lg:gap-x-24 justify-center py-4">
          <div className="max-w-[600px]">
            <Typography variant="h2" className="mb-2 text-green-400">
              Presupuesto
            </Typography>
            <Typography variant="h3" className="mb-8 text-white text-justify">
              Imagina que tu dinero es como un tesoro, y el presupuesto es como
              un plan para usar ese tesoro de la mejor manera posible. Te ayuda
              a decidir en qué gastar tu dinero, a ahorrar un poquito, y a
              asegurarte de que siempre tengas suficiente para las cosas
              importantes. Es como un mapa para que tu dinero trabaje contigo y
              te ayude a conseguir lo que quieres.
            </Typography>
          </div>
          <div className="flex-shink-0">
            <Image
              src={imgBudget}
              alt="Presupuesto Fiona"
              loading="lazy"
              width={200}
              height={390}
            />
          </div>
        </section>
        <section className="flex flex-wrap flex-col-reverse lg:flex-row items-center gap-y-8 lg:gap-y-0 lg:gap-x-24 justify-center py-4">
          <div className="flex-shink-0">
            <Image
              src={imgHeritage}
              alt="Patrimonio Fiona"
              loading="lazy"
              width={200}
              height={390}
            />
          </div>
          <div className="max-w-[600px]">
            <Typography variant="h2" className="mb-2 text-yellow-400">
              Patrimonio
            </Typography>
            <Typography variant="h3" className="mb-8 text-white text-justify">
              Tener una colección de cosas valiosas que posees, como tu casa,
              tus ahorros y otras posesiones. Es como tu &quot;tesoro
              total&quot;. Mantener y hacer crecer tu patrimonio significa
              cuidar bien de esas cosas y, si es posible, agregar más al tesoro
              con el tiempo. Piensa en ello como construir tu propia fortaleza
              financiera para sentirte seguro y tener más opciones en la vida.
            </Typography>
          </div>
        </section>
        <section className="flex flex-wrap items-center gap-y-8 lg:gap-y-0 lg:gap-x-24 justify-center py-4">
          <div className="max-w-[600px]">
            <Typography variant="h2" className="mb-2 text-blue-400">
              Inversión
            </Typography>
            <Typography variant="h3" className="mb-8 text-white text-justify">
              Manejar una inversión es como dirigir un barco: necesitas un rumbo
              claro y ajustar las velas según el viento del mercado.
              Constantemente evalúas el rendimiento, haces ajustes según el
              panorama financiero y te aseguras de que estás en camino hacia tus
              metas.
            </Typography>
          </div>
          <div className="flex-shink-0">
            <Image
              src={imgInvestment}
              alt="Inversión Fiona"
              loading="lazy"
              width={200}
              height={390}
            />
          </div>
        </section>
      </article>
    </div>
  );
}

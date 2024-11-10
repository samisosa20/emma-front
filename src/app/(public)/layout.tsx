import type { Metadata } from "next";

// Component
import useComponents from "./components";

export const metadata: Metadata = {
  title: "Fiona | wallet",
  description:
    "Manejo de finanzas personales, tu aliado financiero gratuito. Con esta aplicación, gestionar tus finanzas personales se vuelve fácil y accesible. Registra tus ingresos y gastos de manera sencilla, crea presupuestos personalizados y recibe análisis detallados de tu actividad financiera.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { Header, Footer } = useComponents();
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

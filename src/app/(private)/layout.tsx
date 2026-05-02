import type { Metadata } from "next";

// Component
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import ModalVerify from "./components/ModalVerify";
import BottomBar from "./components/BottomBar";

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
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-wf-background">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-wf-container-margin md:p-wf-xl relative">
          <div className="max-w-7xl mx-auto flex flex-col gap-wf-xl pb-24 md:pb-0">
            {children}
            <footer className="h-[35px] text-center mt-auto pt-8">
              <p className="text-sm text-wf-on-surface-variant font-wf-body-regular">
                © Copyright 2023 - {new Date().getFullYear()} WealthFlow
              </p>
            </footer>
          </div>
        </main>
      </div>
      <BottomBar />
      <ModalVerify />
    </div>
  );
}

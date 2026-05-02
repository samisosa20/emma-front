import type { Metadata } from "next";

// Component
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import ModalVerify from "./components/ModalVerify";
import BottomBar from "./components/BottomBar";

export const metadata: Metadata = {
  title: "WealthFlow | wallet",
  description:
    "Manejo de finanzas personales, tu aliado financiero gratuito. Con esta aplicación, gestionar tus finanzas personales se vuelve fácil y accesible. Registra tus ingresos y gastos de manera sencilla, crea presupuestos personalizados y recibe análisis detallados de tu actividad financiera.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-wf-background text-wf-on-background font-inter antialiased min-h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex flex-1 h-screen md:h-[calc(100vh-64px)] w-full overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto bg-wf-background p-6 md:p-8 pb-24 md:pb-8">
          <div className="max-w-7xl mx-auto">
            {children}
            <footer className="h-[35px] inset-x-0 text-center mt-12 mb-4">
              <p className="text-xs text-wf-on-surface-variant font-inter">
                © {new Date().getFullYear()} WealthFlow. Todos los derechos reservados.
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

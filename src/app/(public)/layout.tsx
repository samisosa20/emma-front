import type { Metadata } from "next";

// Component
import useComponents from "./components";
import ConditionalWrapper from "./components/ConditionalWrapper";

export const metadata: Metadata = {
  title: "Fiona | Finanzas Personales, Patrimonio 360° y Multidivisa",
  description:
    "Plataforma de alta tecnología para la gestión integral de finanzas personales, presupuestos inteligentes, seguimiento de inversiones y patrimonio neto consolidado con soporte multidivisa y privacidad criptográfica.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { Header, Footer } = useComponents();

  return (
    <ConditionalWrapper Header={Header as any} Footer={Footer as any}>
      {children}
    </ConditionalWrapper>
  );
}

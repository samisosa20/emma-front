import type { Metadata } from "next";
import { cookies } from "next/headers";
import { authClient } from "@/share/lib/auth-client";

// Components
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import ModalVerify from "./components/ModalVerify";
import BottomBar from "./components/BottomBar";
import { SessionProvider } from "@/share/components/SessionProvider";

export const metadata: Metadata = {
  title: "Fiona | wallet",
  description: "Manejo de finanzas personales...",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: {
        cookie: cookieHeader,
      },
    },
  });

  return (
    <SessionProvider session={session}>
      <div className="flex flex-col h-screen w-full overflow-hidden bg-wf-background">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto p-wf-container-margin md:p-wf-xl relative">
            <div className="max-w-7xl mx-auto flex flex-col gap-wf-xl pb-24 md:pb-0">
              {children}
              <footer className="h-[35px] text-center mt-auto pt-8">
                <p className="text-sm text-wf-on-surface-variant font-wf-body-regular">
                  © Copyright 2023 - {new Date().getFullYear()} Fiona
                </p>
              </footer>
            </div>
          </main>
        </div>
        <BottomBar />
        <ModalVerify />
      </div>
    </SessionProvider>
  );
}

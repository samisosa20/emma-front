"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    //if (!isLogin() && pathname !== '/' && pathname !== '/login' && pathname !== '/register' && pathname !== '/forgot' && !pathname.includes('/blogs')) router.push('/login');
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            //console.log('Service Worker registrado con éxito:', registration);
          })
          .catch((error) => {
            console.error("Error al registrar el Service Worker:", error);
          });
      });
    }
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          // El usuario otorgó permiso para mostrar notificaciones
        } else if (permission === "denied") {
          // El usuario denegó el permiso
        }
      });
    }
  }, [pathname]);
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

'use client';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import { isLogin, installPWA } from '@/share/helpers';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (!isLogin() && pathname !== '/' && pathname !== '/login' && pathname !== '/register' && pathname !== '/forgot') router.push('/login');
    installPWA()
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          // El usuario otorgó permiso para mostrar notificaciones
        } else if (permission === 'denied') {
          // El usuario denegó el permiso
        }
      });
    }
  }, [pathname])
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

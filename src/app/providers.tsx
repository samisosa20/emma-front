'use client';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import { isLogin } from '@/share/helpers';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (!isLogin() && pathname !== '/') router.push('/');
  }, [pathname])
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

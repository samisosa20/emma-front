import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useRouter } from 'next/navigation';
import { PaymentUseCase } from '@@/application/payment.use-case';
import { PaymentApiAdapter } from '@@/infrastructure/payment-api.adapter';

import { customConfigHeader } from '@/share/helpers';

export default function usePaymentsViewModel(){
  const router = useRouter();
  const { isLoading, data, isError } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const { listPayments } = new PaymentUseCase(
        new PaymentApiAdapter({
          baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
          customConfig: customConfigHeader(),
        })
      );

      const result = await listPayments();

      if (result.status === 401) {
        localStorage.clear();
        router.push('/');
      }

      return result;
    },
  });

  useEffect(() => {
    if (isError) router.push('/');
  }, [isError]);

  return {
    data,
    isLoading,
  };
};
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useRouter } from 'next/navigation';
import { InvestmentUseCase } from '@@/application/investment.use-case';
import { InvestmentApiAdapter } from '@@/infrastructure/investment-api.adapter';

import { customConfigHeader } from '@/share/helpers';

export default function useInvestmentsViewModel(){
  const router = useRouter();
  const { isLoading, data, isError } = useQuery({
    queryKey: ['investments'],
    queryFn: async () => {
      const { listInvestments } = new InvestmentUseCase(
        new InvestmentApiAdapter({
          baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
          customConfig: customConfigHeader(),
        })
      );

      const result = await listInvestments();

      if (result.status === 401) {
        localStorage.removeItem("emma-user");
        router.push('/login');
      }

      return result;
    },
  });

  useEffect(() => {
    if (isError) router.push('/login');
  }, [isError]);

  return {
    data,
    isLoading,
  };
};
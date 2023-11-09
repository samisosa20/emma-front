import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useRouter } from 'next/navigation';
import { HeritageUseCase } from '@@/application/heritage.use-case';
import { HeritageApiAdapter } from '@@/infrastructure/heritage-api.adapter';

import { customConfigHeader } from '@/share/helpers';

export default function useHeritagesViewModel(){
  const router = useRouter();
  const { isLoading, data, isError } = useQuery({
    queryKey: ['heritages'],
    queryFn: async () => {
      const { listHeritages } = new HeritageUseCase(
        new HeritageApiAdapter({
          baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
          customConfig: customConfigHeader(),
        })
      );

      const result = await listHeritages();

      if (result.status === 401) {
        localStorage.removeItem("fiona-user");
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
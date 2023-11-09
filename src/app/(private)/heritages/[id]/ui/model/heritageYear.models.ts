import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useParams } from 'next/navigation';

import { HeritageUseCase } from '@@/application/heritage.use-case';
import { HeritageApiAdapter } from '@@/infrastructure/heritage-api.adapter';

import { customConfigHeader } from '@/share/helpers';

const useHeritageYear = () => {
  const param = useParams();

  const router = useRouter();

  const [search, setSearch] = useState('');


  const { isLoading, data, isError } = useQuery({
    queryKey: ['account'],
    queryFn: async () => {
        const { getListPerYearDetail } = new HeritageUseCase(
          new HeritageApiAdapter({
            baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
            customConfig: customConfigHeader(),
          })
        );
        if(param.id) {
          const id = Array.isArray(param.id) ? parseInt(param.id[0]) : parseInt(param.id);
          const result = await getListPerYearDetail(id);

          if (result.status === 401) {
            localStorage.removeItem("emma-user");
            router.push('/login');
          }

          return result;
      }
    },
  });
  
  useEffect(() => {
    if (isError) router.push('/login');
  }, [isError]);

  return {
    data,
    isLoading,
    search,
    setSearch,
  };
};

export default useHeritageYear;

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useParams } from 'next/navigation';

import { AccountUseCase } from '@@/application/account.use-case';
import { AccountApiAdapter } from '@@/infrastructure/account-api.adapter';

import { customConfigHeader } from '@/share/helpers';

const useAccount = () => {
  const param = useParams();

  const router = useRouter();

  const [search, setSearch] = useState('');


  const { isLoading, data, isError } = useQuery({
    queryKey: ['account'],
    queryFn: async () => {
        const { getAccountDetail } = new AccountUseCase(
          new AccountApiAdapter({
            baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
            customConfig: customConfigHeader(),
          })
        );
        if(param.id) {
          const id = Array.isArray(param.id) ? parseInt(param.id[0]) : parseInt(param.id);
          const result = await getAccountDetail(id);

          if (result.status === 401) {
            localStorage.clear();
            router.push('/');
          }

          return result;
      }
    },
  });
  
  useEffect(() => {
    if (isError) router.push('/');
  }, [isError]);

  return {
    data,
    isLoading,
    search,
    setSearch,
  };
};

export default useAccount;

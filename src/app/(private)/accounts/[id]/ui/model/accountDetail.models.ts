import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useParams } from 'next/navigation';

import { AccountUseCase } from '@@/application/account.use-case';
import { AccountApiAdapter } from '@@/infrastructure/account-api.adapter';

const useAccount = () => {
  const param = useParams();

  const router = useRouter();

  const [search, setSearch] = useState('');


  const { isLoading, data } = useQuery({
    queryKey: ['account'],
    queryFn: async () => {
      const user = localStorage.getItem('user');
      if (user) {
        const { getAccountDetail } = new AccountUseCase(
          new AccountApiAdapter({
            baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
            customConfig: {
              headers: {
                Authorization: `Bearer ${JSON.parse(user).token}`,
              },
            },
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
      }
    },
  });

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      localStorage.clear();
      router.push('/');
    }
  }, []);
  return {
    data,
    isLoading,
    search,
    setSearch,
  };
};

export default useAccount;

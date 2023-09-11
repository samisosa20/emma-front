import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { AccountUseCase } from '@@/application/account.use-case';
import { AccountApiAdapter } from '@@/infrastructure/account-api.adapter';

const useAccounts = () => {
  const router = useRouter();

  const [isChecked, setIsChecked] = useState(true);
  const [search, setSearch] = useState('');

  const { isLoading, data } = useQuery({
    queryKey: ['accounts'],
    queryFn: async () => {
      const user = localStorage.getItem('user');
      if (user) {
        const { listAccounts } = new AccountUseCase(
          new AccountApiAdapter({
            baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
            customConfig: {
              headers: {
                Authorization: `Bearer ${JSON.parse(user).token}`,
              },
            },
          })
        );
        const result = await listAccounts();
        if (result.status === 401) {
          localStorage.clear();
          router.push('/');
        }
        return result;
      }
    },
  });

  const handleToggle = () => {
    setSearch('')
    setIsChecked(!isChecked);
  };

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
    handleToggle,
    isChecked,
    search,
    setSearch,
  };
};

export default useAccounts;

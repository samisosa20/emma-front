import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { AccountUseCase } from '@@/application/account.use-case';
import { AccountApiAdapter } from '@@/infrastructure/account-api.adapter';

import { customConfigHeader } from '@/share/helpers';

const useAccounts = () => {
  const router = useRouter();

  const [isChecked, setIsChecked] = useState(true);
  const [search, setSearch] = useState('');

  const { isLoading, data, isError } = useQuery({
    queryKey: ['accounts'],
    queryFn: async () => {
        const { listAccounts } = new AccountUseCase(
          new AccountApiAdapter({
            baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
            customConfig: customConfigHeader(),
          })
        );
        const result = await listAccounts();
        if (result.status === 401) {
          localStorage.clear();
          router.push('/');
        }
        return result;
    },
  });

  const handleToggle = () => {
    setSearch('')
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    if (isError) router.push('/');
  }, [isError]);
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

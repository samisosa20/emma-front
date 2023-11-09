import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { AccountUseCase } from '@@/application/account.use-case';
import { AccountApiAdapter } from '@@/infrastructure/account-api.adapter';

import { customConfigHeader, driverAccount } from '@/share/helpers';

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
          localStorage.removeItem("fiona-user");
          router.push('/login');
        }
        return result;
    },
  });

  const handleDrive = () => {
    driverAccount()
  }

  const handleToggle = () => {
    setSearch('')
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    if (isError) router.push('/login');
  }, [isError, router]);
  return {
    data,
    isLoading,
    handleToggle,
    isChecked,
    search,
    setSearch,
    handleDrive,
  };
};

export default useAccounts;

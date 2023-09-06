import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { accountSchema } from '@/share/validation';
import type { AccountSchema } from '@/share/validation';

import { AccountUseCase } from '../../../../../package/fiona/application/account.use-case';
import { AccountApiAdapter } from '../../../../../package/fiona/infrastructure/account-api.adapter';

const useAccountCreate = () => {
  const router = useRouter();

  const [typeOptions, setTypeOptions] = useState([]);
  const [currencyOptions, setCurrencyOptions] = useState([]);

  const { handleSubmit, control } = useForm({
    resolver: zodResolver(accountSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: AccountSchema) => {
      const user = localStorage.getItem('user');
      if (user) {
        const { createAccount } = new AccountUseCase(
          new AccountApiAdapter({
            baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
            customConfig: {
              headers: {
                Authorization: `Bearer ${JSON.parse(user).token}`,
              },
            },
          })
        );
        const result = await createAccount(data);
        if (result.error) {
          console.log(result);
          toast.error(result.message);
          return;
        }
        toast.success(result.message);
        router.back();
      }
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      localStorage.clear();
      router.push('/');
    } else {
      const userjson = JSON.parse(user);
      setTypeOptions(userjson.accounts_type);
      setCurrencyOptions(userjson.currencies);
    }
  }, []);
  return {
    handleSubmit,
    onSubmit,
    control,
    typeOptions,
    currencyOptions,
  };
};

export default useAccountCreate;

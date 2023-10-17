import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';

import { accountSchema } from '@/share/validation';
import type { AccountSchema } from '@/share/validation';

import { AccountUseCase } from '@@/application/account.use-case';
import { AccountApiAdapter } from '@@/infrastructure/account-api.adapter';

import { customConfigHeader } from '@/share/helpers';

const useAccountCreate = () => {
  const router = useRouter();
  const param = useParams();

  const [typeOptions, setTypeOptions] = useState([]);
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [title, setTitle] = useState('Creacion de Cuentas');

  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(accountSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: AccountSchema) => {
      const { createAccount } = new AccountUseCase(
        new AccountApiAdapter({
          baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
          customConfig: customConfigHeader(),
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
    },
  });

  const mutationEdit = useMutation({
    mutationFn: async (data: AccountSchema) => {
      const user = localStorage.getItem('user');
      if (user) {
        const { editAccount } = new AccountUseCase(
          new AccountApiAdapter({
            baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
            customConfig: {
              headers: {
                Authorization: `Bearer ${JSON.parse(user).token}`,
              },
            },
          })
        );
        const id = Array.isArray(param.id)
          ? parseInt(param.id[0])
          : parseInt(param.id);
        const result = await editAccount(id, data);
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

  const { data } = useQuery({
    queryKey: ['accountDetail'],
    queryFn: async () => {
      const user = localStorage.getItem('user');
      if (user && param.id) {
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

        const id = Array.isArray(param.id)
          ? parseInt(param.id[0])
          : parseInt(param.id);
        const result = await getAccountDetail(id);

        if (result.status === 401) {
          localStorage.removeItem("user");
          router.push('/');
        }

        return result;
      }
    },
  });

  const onSubmit = (data: any) => {
    const formData = {
      ...data,
      description: data.description ? data.description : '',
    };
    if (param.id) {
      mutationEdit.mutate(formData);
    } else {
      mutation.mutate(formData);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const userjson = JSON.parse(user);
      setTypeOptions(userjson.accounts_type);
      setCurrencyOptions(userjson.currencies);
    }
    if (param.id) {
      setTitle('Edicion de Cuentas');
    }
  }, [param.id]);

  useEffect(() => {
    if (data) {
      reset({
        ...data.account,
        type_id: data.account.type_id.toString(),
        badge_id: data.account.badge_id.toString(),
        init_amount: data.account.init_amount.toString(),
        description: data.account.description ? data.account.description : '',
      });
    }
  }, [data, reset]);

  return {
    handleSubmit,
    onSubmit,
    control,
    typeOptions,
    currencyOptions,
    title,
  };
};

export default useAccountCreate;

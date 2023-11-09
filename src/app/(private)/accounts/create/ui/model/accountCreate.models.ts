import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';

import { accountSchema } from '@/share/validation';
import type { AccountParamsSchema } from '@/share/validation';

import { AccountUseCase } from '@@/application/account.use-case';
import { AccountApiAdapter } from '@@/infrastructure/account-api.adapter';

import { customConfigHeader } from '@/share/helpers';

const useAccountCreate = () => {
  const router = useRouter();
  const param = useParams();

  const [typeOptions, setTypeOptions] = useState([]);
  const [isDesactivate, setIsDesactivate] = useState(false);
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [title, setTitle] = useState('Creacion de Cuentas');

  const { handleSubmit, control, reset, watch } = useForm({
    resolver: zodResolver(accountSchema),
  });

  const watchType = watch('type_id')

  const mutation = useMutation({
    mutationFn: async (data: AccountParamsSchema) => {
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
    mutationFn: async (data: AccountParamsSchema) => {
      const user = localStorage.getItem('fiona-user');
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

  const mutationDelete = useMutation({
    mutationFn: async () => {
      const user = localStorage.getItem('fiona-user');
      if (user) {
        const { deleteAccount } = new AccountUseCase(
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
        const result = await deleteAccount(id);
        if (result.error) {
          console.log(result);
          toast.error(result.message);
          return;
        }
        toast.success(result.message);
        router.push('/accounts');
      }
    },
  });

  const mutationDesactive = useMutation({
    mutationFn: async () => {
      const user = localStorage.getItem('fiona-user');
      if (user) {
        const { desactiveAccount } = new AccountUseCase(
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
        const result = await desactiveAccount(id);
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

  const mutationRestore = useMutation({
    mutationFn: async () => {
      const user = localStorage.getItem('fiona-user');
      if (user) {
        const { activeAccount } = new AccountUseCase(
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
        const result = await activeAccount(id);
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
    queryKey: ['accountDetail', param.id],
    queryFn: async () => {
      const user = localStorage.getItem('fiona-user');
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
          localStorage.removeItem("fiona-user");
          router.push('/login');
        }

        return result;
      }
    },
  });

  const onSubmit = (data: any) => {
    const formData = {
      ...data,
      description: data.description ? data.description : '',
      badge_id: data.badge_id.value,
    };
    if (param.id) {
      mutationEdit.mutate(formData);
    } else {
      mutation.mutate(formData);
    }
  };

  const handleDelete = () => {
    if(isDesactivate) {
      mutationDelete.mutate()
    } else {
      mutationDesactive.mutate()
    }
  }
  
  const handleReActivate = () => {
    mutationRestore.mutate()
  }

  useEffect(() => {
    const user = localStorage.getItem('fiona-user');
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
        badge_id: {label: data.account.currency.code ,value: data.account.badge_id},
        init_amount: data.account.init_amount.toString(),
        description: data.account.description ? data.account.description : '',
        limit: data.account.limit ? data.account.limit : '',
        interest: data.account.interest ? data.account.interest : '',
      });
      setIsDesactivate(!!data.account.deleted_at);
    }
    reset()
  }, [data, reset]);

  return {
    handleSubmit,
    onSubmit,
    control,
    typeOptions,
    currencyOptions,
    title,
    handleDelete,
    handleReActivate,
    isDesactivate,
    watchType,
  };
};

export default useAccountCreate;

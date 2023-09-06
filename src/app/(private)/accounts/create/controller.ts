import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from "@tanstack/react-query";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { accountSchema } from '@/share/validation';
import type { accountSchema } from '@/share/validation';

import { AuthUseCase } from '../../../../../package/fiona/application/auth.use-case';
import { AuthApiAdapter } from '../../../../../package/fiona/infrastructure/auth-api.adapter';

const useAccountCreate = () => {
  const router = useRouter();

  const { handleSubmit, control } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: '',
      description: '',
      init_amount: 0,
    },
  });

  const typeOptions = [
    {
        value: '1',
        label: 'Efectivo'
    }
  ]

  const mutation = useMutation({
    mutationFn: async (data: accountSchema) => {
      const { postLogin } = new AuthUseCase(new AuthApiAdapter({baseUrl: process.env.NEXT_PUBLIC_API_URL ?? ''}));
      const result = await postLogin(data)
      if(result.error) {
        toast.error(result.message)
        return;
      }
      localStorage.setItem('user', JSON.stringify(result))
      router.push('/dashboard')
    },
  })

  const onSubmit: SubmitHandler<accountSchema> = (data) => {
    mutation.mutate(data)
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      localStorage.clear();
      router.push('/');
    }
  }, []);
  return {
    handleSubmit,
    onSubmit,
    control,
    typeOptions,
  };
};

export default useAccountCreate;

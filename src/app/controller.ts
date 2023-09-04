import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from "@tanstack/react-query";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { loginSchema } from '@/share/validation';
import type { LoginSchema } from '@/share/validation';

import { AuthUseCase } from '../../package/fiona/application/auth.use-case';
import { AuthApiAdapter } from '../../package/fiona/infrastructure/auth-api.adapter';

const useLogin = () => {
  const router = useRouter();

  const { handleSubmit, control } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: LoginSchema) => {
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

  const onSubmit: SubmitHandler<LoginSchema> = (data) => {
    mutation.mutate(data)
  };

  useEffect(() => {
    const user = localStorage.getItem('user')
    if(user) {
      const token = JSON.parse(user).token
      if(token) {
        router.push('/dashboard')
      }
    }
  }, [])
  return {
    handleSubmit,
    onSubmit,
    control,
  };
};

export default useLogin;

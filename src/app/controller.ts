import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from "@tanstack/react-query";
import { useRouter } from 'next/navigation';

import { loginSchema } from '@/share/validation';
import type { LoginSchema } from '@/share/validation';
import useConfig from '@/share/config';

import { AuthUseCase } from '../../package/fiona/auth/application/auth.use-case';
import { AuthApiAdapter } from '../../package/fiona/auth/infrastructure/auth-api.adapter';

const useLogin = () => {
  const router = useRouter();

  const {useInterceptor} = useConfig()
  useInterceptor()

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
      postLogin(data)
    },
    onSuccess: (data, variables, context) => {
      localStorage.setItem('user', JSON.stringify(data));
      router.push('/dashboard');
    },

  })

  const onSubmit: SubmitHandler<LoginSchema> = (data) => {
    mutation.mutate(data)
  };
  return {
    handleSubmit,
    onSubmit,
    control,
  };
};

export default useLogin;

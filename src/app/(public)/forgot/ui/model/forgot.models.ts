import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from "@tanstack/react-query";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { paramsForgotSchema } from '@/share/validation';
import type { ParamsForgotSchema } from '@/share/validation';

import { AuthUseCase } from '@@/application/auth.use-case';
import { AuthApiAdapter } from '@@/infrastructure/auth-api.adapter';

export default function useForgot() {
  const router = useRouter();

  const { handleSubmit, control } = useForm({
    resolver: zodResolver(paramsForgotSchema),
    defaultValues: {
      email: '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ParamsForgotSchema) => {
      const { recoveryPassword } = new AuthUseCase(new AuthApiAdapter({baseUrl: process.env.NEXT_PUBLIC_API_URL ?? ''}));
      const result = await recoveryPassword(data)

      if(result.error) {
        toast.error(result.message)
        return;
      }
      
      toast.success(result.message)
      router.push('/login')
    },
  })

  const onSubmit: SubmitHandler<ParamsForgotSchema> = (data) => {
    mutation.mutate(data)
  };

  return {
    handleSubmit,
    onSubmit,
    control,
  };
};

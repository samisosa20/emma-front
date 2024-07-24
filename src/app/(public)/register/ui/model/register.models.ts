import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { registerSchema } from '@/share/validation';
import type { RegisterSchema } from '@/share/validation';

import { AuthUseCase } from '@@/application/auth.use-case';
import { AuthApiAdapter } from '@@/infrastructure/auth-api.adapter';

const useRegister = () => {
  const router = useRouter();

  const [currencyOptions, setCurrencyOptions] = useState<any>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { handleSubmit, control } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });

  const { isLoading, data, isError } = useQuery({
    queryKey: ['listCurrency'],
    queryFn: async () => {
      const { getCurrency } = new AuthUseCase(
        new AuthApiAdapter({
          baseUrl: process.env.NEXT_PUBLIC_API_URL ?? ''
        })
      );

      const result = await getCurrency();

      return result;
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: RegisterSchema) => {
      const { postRegister } = new AuthUseCase(new AuthApiAdapter({baseUrl: process.env.NEXT_PUBLIC_API_URL ?? ''}));
      const result = await postRegister(data)
      if(result.error) {
        toast.error(result.message)
        setIsSubmitting(false)
        return;
      }
      localStorage.setItem('emma-user', JSON.stringify(result))
      router.push('/dashboard')
    },
  })

  const onSubmit = (data: any) => {
    setIsSubmitting(true)
    mutation.mutate({...data, badge_id: data.badge_id.value})
  };

  useEffect(()=> {
    if (data) setCurrencyOptions(data.map((currency:any) => { return {value: currency.id, label: currency.code}}))
  },[data])

  return {
    handleSubmit,
    onSubmit,
    control,
    currencyOptions,
    isLoading,
    isSubmitting,
  };
};

export default useRegister;

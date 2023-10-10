import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';

import { eventSchema } from '@/share/validation';
import type { EventSchema } from '@/share/validation';

import { EventUseCase } from '@@/application/event.use-case';
import { EventApiAdapter } from '@@/infrastructure/event-api.adapter';

import { customConfigHeader } from '@/share/helpers';

export default function useInvestmentsCreateViewModel() {
  const router = useRouter();
  const param = useParams();

  const [title, setTitle] = useState('Creacion de Inversiones');
  const [listMovements, setListMovements] = useState<any>([]);
  const [currencyOptions, setCurrencyOptions] = useState([]);

  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(eventSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: EventSchema) => {
      const user = localStorage.getItem('user');
      if (user) {
        const { createEvent } = new EventUseCase(
          new EventApiAdapter({
            baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
            customConfig: {
              headers: {
                Authorization: `Bearer ${JSON.parse(user).token}`,
              },
            },
          })
        );
        const result = await createEvent(data);
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

  const mutationEdit = useMutation({
    mutationFn: async (data: EventSchema) => {
      const user = localStorage.getItem('user');
      if (user) {
        const { editEvent } = new EventUseCase(
          new EventApiAdapter({
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
        const result = await editEvent(id, data);
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
    queryKey: ['investmentDetail'],
    queryFn: async () => {
      if (param.id) {
        const { getEventDetail } = new EventUseCase(
          new EventApiAdapter({
            baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
            customConfig: customConfigHeader(),
          })
        );

        const id = Array.isArray(param.id)
          ? parseInt(param.id[0])
          : parseInt(param.id);
        const result = await getEventDetail(id);

        if (result.status === 401) {
          localStorage.clear();
          router.push('/');
        }

        return result;
      }
    },
  });

  const onSubmit = (data: any) => {
    const formData = {
      ...data,
    };
    if (param.id) {
      mutationEdit.mutate(formData);
    } else {
      mutation.mutate(formData);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      localStorage.clear();
      router.push('/');
    } else {
      const userjson = JSON.parse(user);
      setCurrencyOptions(userjson.currencies);
      if (param.id) {
        setTitle('Edicion de Inversiones');
      }
    }
  }, []);

  useEffect(() => {
    if (data) {
      reset(data);
      setListMovements(data.movements);
    }
  }, [data]);

  return {
    handleSubmit,
    onSubmit,
    control,
    title,
    listMovements,
    currencyOptions,
  };
};

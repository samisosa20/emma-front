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

const useEventCreate = () => {
  const router = useRouter();
  const param = useParams();

  const [title, setTitle] = useState('Creacion de eventos');
  const [listMovements, setListMovements] = useState<any>([]);
  const [listCategories, setListCategories] = useState<any>([]);

  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(eventSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: EventSchema) => {
      const user = localStorage.getItem('fiona-user');
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
      const user = localStorage.getItem('fiona-user');
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
    queryKey: ['eventDetail'],
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
    };
    if (param.id) {
      mutationEdit.mutate(formData);
    } else {
      mutation.mutate(formData);
    }
  };

  useEffect(() => {
    if (param.id) {
      setTitle('Edicion de eventos');
    }
  }, []);

  useEffect(() => {
    if (data) {
      reset(data);
      setListMovements(data.movements);
      setListCategories(data.categories);
    }
  }, [data]);

  return {
    handleSubmit,
    onSubmit,
    control,
    title,
    listMovements,
    listCategories,
  };
};

export default useEventCreate;

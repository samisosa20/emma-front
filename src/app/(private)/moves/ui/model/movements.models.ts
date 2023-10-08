import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter, useParams } from 'next/navigation';

import { eventSchema } from '@/share/validation';
import type { EventSchema } from '@/share/validation';

import { customConfigHeader } from '@/share/helpers';

export default function movementsViewModel(){
  const router = useRouter();
  const param = useParams();

  const [title, setTitle] = useState('Creacion de Movimientos');
  const [currencyOptions, setCurrencyOptions] = useState([]);

  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(eventSchema),
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
        setTitle('Edicion de Movimientos');
      }
    }
  }, []);

  return {
    handleSubmit, onSubmit, control, currencyOptions, title
  };
};
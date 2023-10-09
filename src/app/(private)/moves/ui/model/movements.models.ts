import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter, useParams } from 'next/navigation';

import { eventSchema } from '@/share/validation';
import type { EventSchema } from '@/share/validation';

import { AccountUseCase } from '@@/application/account.use-case';
import { AccountApiAdapter } from '@@/infrastructure/account-api.adapter';

import { customConfigHeader, getDateString } from '@/share/helpers';

export default function movementsViewModel() {
  const router = useRouter();
  const param = useParams();

  const [title, setTitle] = useState('Creacion de Movimientos');
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [listAccounts, setListAccounts] = useState<any[]>([]);
  const [listCategories, setListCategories] = useState<any[]>([]);
  const [listEvents, setListEvents] = useState<any[]>([]);
  const [listInvestments, setListInvestments] = useState<any[]>([]);

  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      date_purchase: getDateString(),
      type: '-1',
    },
  });

  const { data: dataListAccounts } = useQuery({
    queryKey: ['account'],
    queryFn: async () => {
      const { listAccounts } = new AccountUseCase(
        new AccountApiAdapter({
          baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
          customConfig: customConfigHeader(),
        })
      );
      const result = await listAccounts();

      if (result.status === 401) {
        localStorage.clear();
        router.push('/');
      }

      return result;
    },
  });

  const { data: dataListCategories } = useQuery({
    queryKey: ['account'],
    queryFn: async () => {
      const { listAccounts } = new AccountUseCase(
        new AccountApiAdapter({
          baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
          customConfig: customConfigHeader(),
        })
      );
      const result = await listAccounts();

      if (result.status === 401) {
        localStorage.clear();
        router.push('/');
      }

      return result;
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
      if (param.id) {
        setTitle('Edicion de Movimientos');
      }
    }
  }, []);

  useEffect(() => {
    if (dataListAccounts && dataListAccounts.accounts) {
      setListAccounts(
        dataListAccounts.accounts
          .filter((v) => !v.deleted_at)
          .map((account) => {
            return { label: account.name, value: account.id };
          })
      );
    }
  }, [dataListAccounts]);

  useEffect(() => {
    if (dataListAccounts) {
      setListAccounts(
        dataListAccounts.accounts
          .filter((v) => !v.deleted_at)
          .map((account) => {
            return { label: account.name, value: account.id };
          })
      );
    }
  }, [dataListAccounts]);

  return {
    handleSubmit,
    onSubmit,
    control,
    title,
    listAccounts,
    listCategories,
    listEvents,
    listInvestments,
  };
}

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { AccountUseCase } from '@@/application/account.use-case';
import { AccountApiAdapter } from '@@/infrastructure/account-api.adapter';
import { EventUseCase } from '@@/application/event.use-case';
import { EventApiAdapter } from '@@/infrastructure/event-api.adapter';

import { customConfigHeader } from '@/share/helpers';

const useAccount = () => {
  const param = useParams();

  const router = useRouter();

  const [search, setSearch] = useState('');
  const [showDelete, setShowDelete] = useState(false);
  const [listEvents, setListEvents] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    event_id: null,
    start_date: null,
    end_date: null,
    category: null,
    amount: null,
    description: null,
  });

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      event_id: null,
      start_date: null,
      end_date: null,
      category: null,
      amount: null,
      description: null,
    }
  });

  const { isLoading, data, isError } = useQuery({
    queryKey: ['accountDetail', filters],
    queryFn: async () => {
      const { getAccountDetail } = new AccountUseCase(
        new AccountApiAdapter({
          baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
          customConfig: customConfigHeader(),
        })
      );
      if (param.id) {
        const id = Array.isArray(param.id)
          ? parseInt(param.id[0])
          : parseInt(param.id);
        const result = await getAccountDetail(id, filters);

        if (result.status === 401) {
          localStorage.removeItem("fiona-user");
          router.push('/login');
        }

        return result;
      }
    },
  });

  const { data: dataListEvents, isError: isErrorEvents } = useQuery({
    queryKey: ['eventsMove'],
    queryFn: async () => {
      const { listEvents } = new EventUseCase(
        new EventApiAdapter({
          baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
          customConfig: customConfigHeader(),
        })
      );
      const result = await listEvents();

      return result;
    },
  });

  const onSubmit = (data: any) => {
    setShowDelete(true)
    setFilters(data);
  };

  const handleResetFilters = () => {
    reset({
      event_id: null,
      start_date: null,
      end_date: null,
      category: null,
      amount: null,
      description: null,
    })
    setShowDelete(false);
    setFilters({
      event_id: null,
      start_date: null,
      end_date: null,
      category: null,
      amount: null,
      description: null,
    });
  };

  useEffect(() => {
    if (isError || isErrorEvents) router.push('/login');
  }, [isError, isErrorEvents, router]);

  useEffect(() => {
    if (dataListEvents && Array.isArray(dataListEvents)) {
      setListEvents(
        dataListEvents.map((event) => {
          return { label: event.name, value: event.id };
        })
      );
    }
  }, [dataListEvents]);

  return {
    data,
    isLoading,
    search,
    setSearch,
    control,
    handleSubmit,
    onSubmit,
    listEvents,
    handleResetFilters,
    showDelete,
  };
};

export default useAccount;

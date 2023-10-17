import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useRouter } from 'next/navigation';
import { EventUseCase } from '@@/application/event.use-case';
import { EventApiAdapter } from '@@/infrastructure/event-api.adapter';

import { customConfigHeader } from '@/share/helpers';

const useEvents = () => {
  const router = useRouter();
  const { isLoading, data, isError } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { listEvents } = new EventUseCase(
        new EventApiAdapter({
          baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
          customConfig: customConfigHeader(),
        })
      );

      const result = await listEvents();

      if (result.status === 401) {
        localStorage.removeItem("user");
        router.push('/');
      }

      return result;
    },
  });

  useEffect(() => {
    if (isError) router.push('/');
  }, [isError]);

  return {
    data,
    isLoading,
  };
};

export default useEvents;

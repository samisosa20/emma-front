import { useQuery } from '@tanstack/react-query';

import { useRouter } from 'next/navigation';
import { EventUseCase } from '@@/application/event.use-case';
import { EventApiAdapter } from '@@/infrastructure/event-api.adapter';

const useEvents = () => {
  const router = useRouter();
  const { isLoading, data } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const user = localStorage.getItem('user');
      if (user) {
        const { listEvents } = new EventUseCase(
          new EventApiAdapter({
            baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
            customConfig: {
              headers: {
                Authorization: `Bearer ${JSON.parse(user).token}`,
              },
            },
          })
        );

        const result = await listEvents();

        if (result.status === 401) {
          localStorage.clear();
          router.push('/');
        }

        return result;
      }
    },
  });

  return {
    data,
    isLoading,
  };
};

export default useEvents;

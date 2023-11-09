import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useRouter } from 'next/navigation';
import { CategoryUseCase } from '@@/application/category.use-case';
import { CategoryApiAdapter } from '@@/infrastructure/category-api.adapter';

import { customConfigHeader } from '@/share/helpers';

export default function useCategoriesViewModel() {
  const router = useRouter();
  
  const [isChecked, setIsChecked] = useState(true);
  const [search, setSearch] = useState('');

  const { isLoading, data, isError } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { listCategories } = new CategoryUseCase(
        new CategoryApiAdapter({
          baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
          customConfig: customConfigHeader(),
        })
      );

      const result = await listCategories();

      if (result.status === 401) {
        localStorage.removeItem("emma-user");
        router.push('/login');
      }

      return result;
    },
  });

  const handleToggle = () => {
    setSearch('')
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    if (isError) router.push('/login');
  }, [isError, router]);

  return {
    data,
    isLoading,
    setSearch,
    handleToggle,
    search,
    isChecked,
  };
}

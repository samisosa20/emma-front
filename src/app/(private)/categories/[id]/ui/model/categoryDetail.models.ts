import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useParams } from 'next/navigation';

import { CategoryUseCase } from '@@/application/category.use-case';
import { CategoryApiAdapter } from '@@/infrastructure/category-api.adapter';

import { customConfigHeader } from '@/share/helpers';

export default function useCategoryDetailViewModel() {
  const param = useParams();

  const router = useRouter();

  const [isChecked, setIsChecked] = useState(true);
  const [search, setSearch] = useState('');


  const { isLoading, data, isError } = useQuery({
    queryKey: ['categoryDetail'],
    queryFn: async () => {
        const { getCategoryDetail } = new CategoryUseCase(
          new CategoryApiAdapter({
            baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
            customConfig: customConfigHeader(),
          })
        );
        if(param.id) {
          const id = Array.isArray(param.id) ? parseInt(param.id[0]) : parseInt(param.id);
          const result = await getCategoryDetail(id);

          if (result.status === 401) {
            localStorage.removeItem("user");
            router.push('/');
          }

          return result;
      }
    },
  });

  const handleToggle = () => {
    setSearch('')
    setIsChecked(!isChecked);
  };
  
  useEffect(() => {
    if (isError) router.push('/');
  }, [isError, router]);

  return {
    isLoading, data, setSearch, handleToggle, search, isChecked
  };
};

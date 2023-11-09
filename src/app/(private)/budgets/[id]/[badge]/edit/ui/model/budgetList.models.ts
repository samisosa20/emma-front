import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useRouter, useParams } from 'next/navigation';
import { BudgetUseCase } from '@@/application/budget.use-case';
import { BudgetApiAdapter } from '@@/infrastructure/budget-api.adapter';

import { customConfigHeader } from '@/share/helpers';

export default function useBudgetListViewModel(){
  const router = useRouter();
  const params = useParams();

  const [search, setSearch] = useState('')

  const { isLoading, data, isError } = useQuery({
    queryKey: ['ListBudget', params],
    queryFn: async () => {
      const { listBudget } = new BudgetUseCase(
        new BudgetApiAdapter({
          baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
          customConfig: customConfigHeader(),
        })
      );

      const year = Array.isArray(params.id)
      ? parseInt(params.id[0])
      : parseInt(params.id);

      const badge = Array.isArray(params.badge)
      ? params.badge[0]
      : params.badge;

      const user = localStorage.getItem('fiona-user');

      if(user) {
        const badge_id = JSON.parse(user).currencies.filter((v: any) => v.label === badge)[0].value
        const result = await listBudget({year: year, badge_id: badge_id});
        if (result.status === 401) {
          localStorage.removeItem("fiona-user");
          router.push('/login');
        }
  
        return result;
      }

    },
  });


  useEffect(() => {
    if (isError) router.push('/login');
  }, [isError]);

  return {
    data, isLoading, params, setSearch, search 
  };
};
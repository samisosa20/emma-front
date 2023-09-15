import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useRouter } from 'next/navigation';
import { ReportUseCase } from '@@/application/report.use-case';
import { ReportApiAdapter } from '@@/infrastructure/report-api.adapter';

import { customConfigHeader } from '@/share/helpers';

export default function dashboardViewModel() {
  const router = useRouter();
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [filters, setFilters] = useState({
    badge_id: null,
    start_date: null,
    end_date: null,
  });

  const { handleSubmit, control } = useForm();

  const { isLoading, data, isError } = useQuery({
    queryKey: ['reportDash', filters],
    queryFn: async () => {
      const { getReport } = new ReportUseCase(
        new ReportApiAdapter({
          baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
          customConfig: customConfigHeader(),
        })
      );

      const result = await getReport(filters);

      if (result.status === 401) {
        localStorage.clear();
        router.push('/');
      }

      return result;
    },
  });

  const onSubmit = (data: any) => {
    setFilters(data)
  };

  useEffect(() => {
    if (isError) router.push('/');
  }, [isError]);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const userjson = JSON.parse(user);
      setCurrencyOptions(userjson.currencies);
    }
  }, []);

  return {
    data,
    isLoading,
    currencyOptions,
    control,
    handleSubmit,
    onSubmit,
  };
};


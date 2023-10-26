import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';
import { ReportUseCase } from '@@/application/report.use-case';
import { ReportApiAdapter } from '@@/infrastructure/report-api.adapter';

import { customConfigHeader } from '@/share/helpers';

export default function useDashboardViewModel() {
  const router = useRouter();
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [listMovements, setListMovements] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    badge_id: null,
    start_date: null,
    end_date: null,
    category_id: null,
    group_id: null,
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
        localStorage.removeItem("fiona-user");
        router.push('/');
      }

      return result;
    },
  });

  const onSubmit = (data: any) => {
    setFilters(data);
  };

  const getMovements = async (id: number) => {
    if (id) {
      const { getReportCategory } = new ReportUseCase(
        new ReportApiAdapter({
          baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
          customConfig: customConfigHeader(),
        })
      );

      const result = await getReportCategory({
        ...filters,
        category_id: id.toString(),
      });

      if (result.status === 401) {
        localStorage.removeItem("fiona-user");
        router.push('/');
      }

      // @ts-ignore
      setListMovements(result);
    } else {
      setListMovements([]);
    }
  };

  const getMovementsGroup = async (id: number) => {
    if (id) {
      const { getReportGroup } = new ReportUseCase(
        new ReportApiAdapter({
          baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
          customConfig: customConfigHeader(),
        })
      );

      const result = await getReportGroup({
        ...filters,
        group_id: id.toString(),
      });

      if (result.status === 401) {
        localStorage.removeItem("fiona-user");
        router.push('/');
      }

      // @ts-ignore
      setListMovements(result);
    } else {
      setListMovements([]);
    }
  };

  useEffect(() => {
    if (isError) router.push('/');
  }, [isError]);

  useEffect(() => {
    const user = localStorage.getItem('fiona-user');
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
    getMovements,
    getMovementsGroup,
    listMovements,
  };
}

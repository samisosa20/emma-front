import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';

import { investmentSchema } from '@/share/validation';
import type { InvestmentSchema } from '@/share/validation';

import { InvestmentUseCase } from '@@/application/investment.use-case';
import { InvestmentApiAdapter } from '@@/infrastructure/investment-api.adapter';

import { customConfigHeader } from '@/share/helpers';

export default function useInvestmentsCreateViewModel() {
  const router = useRouter();
  const param = useParams();

  const [title, setTitle] = useState('Creacion de Inversiones');
  const [listMovements, setListMovements] = useState<any>([]);
  const [currencyOptions, setCurrencyOptions] = useState([]);

  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(investmentSchema),
    defaultValues: {
      name: '',
      init_amount: '',
      end_amount: '',
      badge_id: '',
      date_investment: '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InvestmentSchema) => {
      const user = localStorage.getItem('user');
      if (user) {
        const { createInvestment } = new InvestmentUseCase(
          new InvestmentApiAdapter({
            baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
            customConfig: {
              headers: {
                Authorization: `Bearer ${JSON.parse(user).token}`,
              },
            },
          })
        );
        const result = await createInvestment(data);
        if (result.error) {
          console.log(result);
          toast.error(result.message);
          return;
        }
        toast.success(result.message);
        router.back();
      }
    },
  });

  const mutationEdit = useMutation({
    mutationFn: async (data: InvestmentSchema) => {
      const user = localStorage.getItem('user');
      if (user) {
        const { editInvestment } = new InvestmentUseCase(
          new InvestmentApiAdapter({
            baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
            customConfig: {
              headers: {
                Authorization: `Bearer ${JSON.parse(user).token}`,
              },
            },
          })
        );
        const id = Array.isArray(param.id)
          ? parseInt(param.id[0])
          : parseInt(param.id);
        const result = await editInvestment(id, data);
        if (result.error) {
          console.log(result);
          toast.error(result.message);
          return;
        }
        toast.success(result.message);
        router.back();
      }
    },
  });

  const mutationDelete = useMutation({
    mutationFn: async () => {
      const user = localStorage.getItem('user');
      if (user) {
        const { deleteInvestment } = new InvestmentUseCase(
          new InvestmentApiAdapter({
            baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
            customConfig: customConfigHeader(),
          })
        );
        const id = Array.isArray(param.id)
          ? parseInt(param.id[0])
          : parseInt(param.id);
        const result = await deleteInvestment(id);
        if (result.error) {
          toast.error(result.message);
          return;
        }
        toast.success(result.message);
        router.back();
      }
    },
  });

  const { data } = useQuery({
    queryKey: ['investmentDetail', param.id],
    queryFn: async () => {
      if (param.id) {
        const { getInvestmentDetail } = new InvestmentUseCase(
          new InvestmentApiAdapter({
            baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
            customConfig: customConfigHeader(),
          })
        );

        const id = Array.isArray(param.id)
          ? parseInt(param.id[0])
          : parseInt(param.id);
        const result = await getInvestmentDetail(id);

        return result;
      }
      return null
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

  const handleDelete = () => {
    mutationDelete.mutate();
  }

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      localStorage.removeItem("user");
      router.push('/');
    } else {
      const userjson = JSON.parse(user);
      setCurrencyOptions(userjson.currencies);
      if (param.id) {
        setTitle('Edicion de Inversiones');
      }
    }
  }, []);

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        init_amount: data.init_amount.toString(),
        end_amount: data.end_amount.toString(),
        badge_id: data.badge_id.toString(),
        date_investment: data.date_investment,
      });
      setListMovements(data.movements);
    }
  }, [data]);

  return {
    handleSubmit,
    onSubmit,
    control,
    title,
    listMovements,
    currencyOptions,
    handleDelete,
  };
}

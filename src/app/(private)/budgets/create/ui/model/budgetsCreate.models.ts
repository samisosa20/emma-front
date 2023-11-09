import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';

import { budgetSchema } from '@/share/validation';
import type { BudgetParamsSchema } from '@/share/validation';

import { BudgetUseCase } from '@@/application/budget.use-case';
import { BudgetApiAdapter } from '@@/infrastructure/budget-api.adapter';
import { CategoryUseCase } from '@@/application/category.use-case';
import { CategoryApiAdapter } from '@@/infrastructure/category-api.adapter';

import { customConfigHeader } from '@/share/helpers';

export default function useBudgetsCreateViewModel() {
  const router = useRouter();
  const param = useParams();

  const [title, setTitle] = useState('Creacion de Presupuesto');
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [periodsOptions, setPeriodsOptions] = useState([]);
  const [listCategories, setListCategories] = useState<any>([]);

  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      period_id: '',
      amount: 0,
      year: new Date().getFullYear().toString(),
      category: {},
      badge_id: '',
    },
  });

  const { data: dataListCategories, isError: isErrorCategory } = useQuery({
    queryKey: ['categoriesMove'],
    queryFn: async () => {
      const { listSelectCategories } = new CategoryUseCase(
        new CategoryApiAdapter({
          baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
          customConfig: customConfigHeader(),
        })
      );
      const result = await listSelectCategories();

      return result;
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: BudgetParamsSchema) => {
      const user = localStorage.getItem('fiona-user');
      if (user) {
        const { createBudget } = new BudgetUseCase(
          new BudgetApiAdapter({
            baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
            customConfig: {
              headers: {
                Authorization: `Bearer ${JSON.parse(user).token}`,
              },
            },
          })
        );
        const result = await createBudget(data);
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
    mutationFn: async (data: BudgetParamsSchema) => {
      const user = localStorage.getItem('fiona-user');
      if (user) {
        const { editBudget } = new BudgetUseCase(
          new BudgetApiAdapter({
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
        const result = await editBudget(id, data);
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
      const user = localStorage.getItem('fiona-user');
      if (user) {
        const { deleteBudget } = new BudgetUseCase(
          new BudgetApiAdapter({
            baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
            customConfig: customConfigHeader(),
          })
        );
        const id = Array.isArray(param.id)
          ? parseInt(param.id[0])
          : parseInt(param.id);
        const result = await deleteBudget(id);
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
    queryKey: ['budgetDetail', param.id],
    queryFn: async () => {
      if (param.id) {
        const { getBudgetDetail } = new BudgetUseCase(
          new BudgetApiAdapter({
            baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
            customConfig: customConfigHeader(),
          })
        );

        const id = Array.isArray(param.id)
          ? parseInt(param.id[0])
          : parseInt(param.id);
        const result = await getBudgetDetail(id);

        return result;
      }
      return null
    },
  });


  const onSubmit = (data: any) => {
    const formData = {
      ...data,
      category_id: data.category.value,
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
    const user = localStorage.getItem('fiona-user');
    if (!user) {
      localStorage.removeItem("fiona-user");
      router.push('/login');
    } else {
      const userjson = JSON.parse(user);
      setCurrencyOptions(userjson.currencies);
      setPeriodsOptions(userjson.periods);
      if (param.id) {
        setTitle('Edicion de Presupuesto');
      }
    }
  }, []);

  useEffect(() => {
    if (data) {
      reset({
        category: {value: data.category.id, label: data.category.name},
        amount: data.amount,
        period_id: data.period_id.toString(),
        badge_id: data.badge_id.toString(),
        year: data.year.toString(),
      });
    }
  }, [data]);

  useEffect(() => {
    if (dataListCategories && Array.isArray(dataListCategories)) {
      setListCategories(dataListCategories);
    }
  }, [dataListCategories]);

  return {
    handleSubmit,
    onSubmit,
    control,
    title,
    currencyOptions,
    handleDelete,
    periodsOptions,
    listCategories,
  };
}

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';

import { paymentsSchema } from '@/share/validation';
import type { PaymentsParamsSchema } from '@/share/validation';

import { PaymentUseCase } from '@@/application/payment.use-case';
import { PaymentApiAdapter } from '@@/infrastructure/payment-api.adapter';
import { AccountUseCase } from '@@/application/account.use-case';
import { AccountApiAdapter } from '@@/infrastructure/account-api.adapter';
import { CategoryUseCase } from '@@/application/category.use-case';
import { CategoryApiAdapter } from '@@/infrastructure/category-api.adapter';

import { customConfigHeader } from '@/share/helpers';

export default function usePaymentsCreateViewModel() {
  const router = useRouter();
  const param = useParams();

  const [title, setTitle] = useState('Creacion de Pagos');
  const [listAccounts, setListAccounts] = useState<any>([]);
  const [listCategories, setListCategories] = useState<any>([]);

  const { handleSubmit, control, reset, formState: {errors} } = useForm({
    resolver: zodResolver(paymentsSchema),
    defaultValues: {
      account: null,
      category: null,
      description: '',
      end_date: '',
      start_date: null,
      amount: '',
      specific_day: null,
    },
  });

  console.log(errors)

  const mutation = useMutation({
    mutationFn: async (data: PaymentsParamsSchema) => {
      const user = localStorage.getItem('fiona-user');
      if (user) {
        const { createPayment } = new PaymentUseCase(
          new PaymentApiAdapter({
            baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
            customConfig: {
              headers: {
                Authorization: `Bearer ${JSON.parse(user).token}`,
              },
            },
          })
        );
        const result = await createPayment(data);
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
    mutationFn: async (data: PaymentsParamsSchema) => {
      const user = localStorage.getItem('fiona-user');
      if (user) {
        const { editPayment } = new PaymentUseCase(
          new PaymentApiAdapter({
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
        const result = await editPayment(id, data);
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
        const { deletePayment } = new PaymentUseCase(
          new PaymentApiAdapter({
            baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
            customConfig: customConfigHeader(),
          })
        );
        const id = Array.isArray(param.id)
          ? parseInt(param.id[0])
          : parseInt(param.id);
        const result = await deletePayment(id);
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
        const { getPaymentDetail } = new PaymentUseCase(
          new PaymentApiAdapter({
            baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
            customConfig: customConfigHeader(),
          })
        );

        const id = Array.isArray(param.id)
          ? parseInt(param.id[0])
          : parseInt(param.id);
        const result = await getPaymentDetail(id);

        return result;
      }
      return null;
    },
  });

  const { data: dataListAccounts } = useQuery({
    queryKey: ['accountPayments'],
    queryFn: async () => {
      const { listAccounts } = new AccountUseCase(
        new AccountApiAdapter({
          baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
          customConfig: customConfigHeader(),
        })
      );

      const result = await listAccounts();

      return result;
    },
  });

  const { data: dataListCategories } = useQuery({
    queryKey: ['categoryPayments'],
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

  const onSubmit = (data: any) => {
    const formData = {
      ...data,
      category_id: data.category ? data.category.value : 0,
      account_id: data.account.value,
    };
    if (param.id) {
      mutationEdit.mutate(formData);
    } else {
      mutation.mutate(formData);
    }
  };

  const handleDelete = () => {
    mutationDelete.mutate();
  };

  useEffect(() => {
    const user = localStorage.getItem('fiona-user');
    if (!user) {
      localStorage.removeItem("fiona-user");
      router.push('/login');
    } else {
      if (param.id) {
        setTitle('Edicion de Pagos');
      }
    }
  }, []);

  useEffect(() => {
    if (data) {
      // @ts-ignore
      reset({
        account: {value: data.account.id, label: data.account.name},
        category: {value: data.category.id, label: data.category.name},
        description: data.description ? data.description : '',
        end_date: data.end_date ? data.end_date : '',
        start_date: data.start_date.split(' ')[0],
        amount: data.amount.toString(),
        specific_day: data.specific_day.toString(),
      });
    }
  }, [data]);

  useEffect(() => {
    if (dataListAccounts && dataListAccounts.accounts) {
      setListAccounts(
        dataListAccounts.accounts
          .filter((v) => !v.deleted_at)
          .map((account) => {
            return {
              label: account.name,
              value: account.id,
              badge_id: account.badge_id,
            };
          })
      );
    }
  }, [dataListAccounts]);

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
    listCategories,
    listAccounts,
    handleDelete,
  };
}

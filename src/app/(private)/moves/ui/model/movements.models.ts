import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter, useParams } from 'next/navigation';

import { movementSchema } from '@/share/validation';
import type { MovementSchemaParams } from '@/share/validation';

import { AccountUseCase } from '@@/application/account.use-case';
import { AccountApiAdapter } from '@@/infrastructure/account-api.adapter';
import { CategoryUseCase } from '@@/application/category.use-case';
import { CategoryApiAdapter } from '@@/infrastructure/category-api.adapter';
import { EventUseCase } from '@@/application/event.use-case';
import { EventApiAdapter } from '@@/infrastructure/event-api.adapter';
import { MovementUseCase } from '@@/application/movement.use-case';
import { MovementApiAdapter } from '@@/infrastructure/movement-api.adapter';
import { InvestmentUseCase } from '@@/application/investment.use-case';
import { InvestmentApiAdapter } from '@@/infrastructure/investment-api.adapter';

import {
  customConfigHeader,
  getDateString,
  formatDateISOToYMDHIS,
} from '@/share/helpers';

export default function useMovementsViewModel() {
  const router = useRouter();
  const param = useParams();

  const [title, setTitle] = useState('Creacion de Movimientos');
  const [listAccounts, setListAccounts] = useState<any[]>([]);
  const [listCategories, setListCategories] = useState<any[]>([]);
  const [listEvents, setListEvents] = useState<any[]>([]);
  const [listInvestments, setListInvestments] = useState<any[]>([]);

  const { handleSubmit, control, reset, watch, formState: {errors} } = useForm({
    resolver: zodResolver(movementSchema),
    defaultValues: {
      date_purchase: getDateString(),
      type: '-1',
      account: null,
      account_end: undefined,
      investment: undefined,
      add_withdrawal: undefined,
    },
  });

  const typeWatch = watch('type');
  const accountEndWatch = watch('account_end');
  const accountWatch = watch('account');
  const investmentWatch = watch('investment');

  const { data } = useQuery({
    queryKey: ['movementDetail', param.id],
    queryFn: async () => {
      const { getMovementDetail } = new MovementUseCase(
        new MovementApiAdapter({
          baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
          customConfig: customConfigHeader(),
        })
      );
      if (param.id) {
        const id = Array.isArray(param.id)
          ? parseInt(param.id[0])
          : parseInt(param.id);
        const result = await getMovementDetail(id);

        return result;
      }
    },
  });

  const { data: dataListAccounts, isError: isErrorAccount } = useQuery({
    queryKey: ['accountsMove'],
    queryFn: async () => {
      const { listAccounts } = new AccountUseCase(
        new AccountApiAdapter({
          baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
          customConfig: customConfigHeader(),
        })
      );
      const result = await listAccounts();

      if (result.status === 401) {
        localStorage.removeItem("user");
        router.push('/');
      }

      return result;
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

  const { data: dataListEvents, isError: isErrorEvents } = useQuery({
    queryKey: ['eventsMove'],
    queryFn: async () => {
      const { listSelectEvents, listEvents } = new EventUseCase(
        new EventApiAdapter({
          baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
          customConfig: customConfigHeader(),
        })
      );
      let result;
      if (param.id) {
        result = await listEvents();
      } else {
        result = await listSelectEvents();
      }

      return result;
    },
  });
  
  const { data: dataListInvestments, isError: isErrorInvestments } = useQuery({
    queryKey: ['investmentsMove'],
    queryFn: async () => {
      const { listInvestments } = new InvestmentUseCase(
        new InvestmentApiAdapter({
          baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
          customConfig: customConfigHeader(),
        })
      );
      const result = await listInvestments();

      return result.investments;
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: MovementSchemaParams) => {
      const user = localStorage.getItem('user');
      if (user) {
        const { createMovement } = new MovementUseCase(
          new MovementApiAdapter({
            baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
            customConfig: customConfigHeader(),
          })
        );
        const result = await createMovement(data);
        if (result.error) {
          toast.error(result.message);
          return;
        }
        toast.success(result.message);
        router.back();
      }
    },
  });
  const mutationEdit = useMutation({
    mutationFn: async (data: MovementSchemaParams) => {
      const user = localStorage.getItem('user');
      if (user) {
        const { editMovement } = new MovementUseCase(
          new MovementApiAdapter({
            baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
            customConfig: customConfigHeader(),
          })
        );
        const id = Array.isArray(param.id)
          ? parseInt(param.id[0])
          : parseInt(param.id);
        const result = await editMovement(id, data);
        if (result.error) {
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
        const { deleteMovement } = new MovementUseCase(
          new MovementApiAdapter({
            baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
            customConfig: customConfigHeader(),
          })
        );
        const id = Array.isArray(param.id)
          ? parseInt(param.id[0])
          : parseInt(param.id);
        const result = await deleteMovement(id);
        if (result.error) {
          toast.error(result.message);
          return;
        }
        toast.success(result.message);
        router.back();
      }
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
    const formData = {
      ...data,
      type: data.type == 0 ? 'transfer' : 'move',
      amount: data.type == 1 ? Math.abs(data.amount) : data.amount * -1,
      date_purchase: formatDateISOToYMDHIS(data.date_purchase),
      ...(data.event !== undefined && {
        event_id: data.event ? data.event.value : null,
      }),
      ...(data.investment !== undefined && {
        investment_id: data.investment ? data.investment.value : null,
      }),
      category_id: data.category ? data.category.value : 0,
      account_id: data.account.value,
      ...(data.type == 0 && {
        amount_end: data.type == 0 ? data.amount_end : null,
        account_end_id: data.type == 0 ? data.account_end.value : null,
      }),
      description: data.description !== undefined ? data.description : null
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
    const user = localStorage.getItem('user');
    if (!user) {
      localStorage.removeItem("user");
      router.push('/');
    } else {
      if (param.id) {
        setTitle('Edicion de Movimientos');
      }
    }
  }, []);

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

  useEffect(() => {
    if (dataListEvents && Array.isArray(dataListEvents)) {
      setListEvents(
        dataListEvents.map((event) => {
          return { label: event.name, value: event.id };
        })
      );
    }
  }, [dataListEvents]);
  
  useEffect(() => {
    if (dataListInvestments && Array.isArray(dataListInvestments)) {
      setListInvestments(
        dataListInvestments.map((investment) => {
          return { label: investment.name, value: investment.id };
        })
      );
    }
  }, [dataListInvestments]);

  useEffect(() => {
    if (isErrorAccount || isErrorCategory || isErrorEvents || isErrorInvestments) {
      localStorage.removeItem("user");
      router.push('/');
    }
  }, [isErrorAccount, isErrorCategory, isErrorEvents, isErrorInvestments]);

  useEffect(() => {
    if (data) {
      // @ts-ignore
      reset({
        add_withdrawal: data.add_withdrawal,
        amount: data.transfer_out || data.transfer_in
        ? data.transfer_out ? Math.abs(data.transfer_out.amount ?? 0).toString() : Math.abs(data.amount ?? 0).toString() : Math.abs(data.amount ?? 0).toString(),
        type:
          data.transfer_out || data.transfer_in
            ? '0'
            : data.amount > 0
            ? '1'
            : '-1',
        date_purchase: data.date_purchase,
        ...(data.description && { description: data.description }),
        ...(!data.transfer_out &&
          !data.transfer_in && {
            category: {
              label: data.category.name,
              value: data.category.id,
              badge_id: data.account.badge_id,
            },
          }),
        account:
          data.transfer_out || data.transfer_in
            ? data.transfer_out
              ? {
                  label: data.transfer_out.account.name,
                  value: data.transfer_out.account.id,
                  badge_id: data.transfer_out.account.badge_id,
                }
              : {
                  label: data.account.name,
                  value: data.account.id,
                  badge_id: data.account.badge_id,
                }
            : { label: data.account.name, value: data.account.id, badge_id: data.account.badge_id, },
        ...((data.transfer_out || data.transfer_in) && {
          account_end: data.transfer_in
            ? {
                label: data.transfer_in.account.name,
                value: data.transfer_in.account.id,
                badge_id: data.transfer_in.account.badge_id,
              }
            : {
                label: data.account.name,
                value: data.account.id,
                badge_id: data.account.badge_id,
              },
        }),
        ...((data.transfer_out || data.transfer_in) && {
          amount_end: data.transfer_in
            ? data.transfer_in.amount.toString()
            : data.amount.toString(),
        }),
        ...(data.event && {
          event: { label: data.event.name, value: data.event.id },
        }),
        ...(data.investment && {
          investment: {
            label: data.investment.name,
            value: data.investment.id,
          },
        }),
      });
    }
  }, [data]);

  return {
    handleSubmit,
    onSubmit,
    control,
    title,
    listAccounts,
    listCategories,
    listEvents,
    listInvestments,
    handleDelete,
    typeWatch,
    accountEndWatch,
    accountWatch,
    investmentWatch,
  };
}

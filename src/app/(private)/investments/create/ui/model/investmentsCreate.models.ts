import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';

import { investmentSchema, investmentAppretiationSchema } from '@/share/validation';
import type { InvestmentSchema, InvestmentAppretiaitonSchema } from '@/share/validation';

import { InvestmentUseCase } from '@@/application/investment.use-case';
import { InvestmentApiAdapter } from '@@/infrastructure/investment-api.adapter';

import { customConfigHeader, formatCurrency } from '@/share/helpers';

export default function useInvestmentsCreateViewModel() {
  const router = useRouter();
  const param = useParams();

  const [title, setTitle] = useState('Creacion de Inversiones');
  const [listMovements, setListMovements] = useState<any>([]);
  const [listAppretiations, setListAppretiations] = useState<any>([]);
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [metrics, setMetrics] = useState<any>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [idAppretiation, setIdAppretiation] = useState<number>();

  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(investmentSchema),
    defaultValues: {
      name: '',
      init_amount: '',
      end_amount: '0',
      badge_id: '',
      date_investment: '',
    },
  });
  
  const { handleSubmit: handleSubmitAppre, control: controlAppre, reset: resetAppre } = useForm({
    resolver: zodResolver(investmentAppretiationSchema),
    defaultValues: {
      amount: '',
      date_appreciation: '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InvestmentSchema) => {
      const user = localStorage.getItem('fiona-user');
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
      const user = localStorage.getItem('fiona-user');
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
      const user = localStorage.getItem('fiona-user');
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

  const { data, refetch } = useQuery({
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

  const mutationAppre = useMutation({
    mutationFn: async (data: InvestmentAppretiaitonSchema) => {
      const user = localStorage.getItem('fiona-user');
      if (user) {
        const { createAppretiation } = new InvestmentUseCase(
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
        const result = await createAppretiation({...data, investment_id: id});
        if (result.error) {
          console.log(result);
          toast.error(result.message);
          return;
        }
        toast.success(result.message);
        resetAppre();
        setIsOpen(false)
        refetch()
      }
    },
  });

  const mutationEditAppre = useMutation({
    mutationFn: async (data: InvestmentAppretiaitonSchema) => {
      const user = localStorage.getItem('fiona-user');
      if (user) {
        const { editAppretiation } = new InvestmentUseCase(
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
        const result = await editAppretiation(idAppretiation ?? 0, {...data, investment_id: id});
        if (result.error) {
          console.log(result);
          toast.error(result.message);
          return;
        }
        toast.success(result.message);
        resetAppre();
        setIsOpen(false)
        refetch()
      }
    },
  });

  const mutationDeleteAppre = useMutation({
    mutationFn: async () => {
      const user = localStorage.getItem('fiona-user');
      if (user) {
        const { deleteAppretiation } = new InvestmentUseCase(
          new InvestmentApiAdapter({
            baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
            customConfig: customConfigHeader(),
          })
        );
        const result = await deleteAppretiation(idAppretiation ?? 0);
        if (result.error) {
          toast.error(result.message);
          return;
        }
        toast.success(result.message);
        resetAppre();
        setIsOpen(false)
        refetch()
      }
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

  const onSubmitAppre = (data: any) => {
    console.log(idAppretiation)
    if(idAppretiation !== undefined) {
      mutationEditAppre.mutate(data)
    } else {
      mutationAppre.mutate(data)
    }
  }

  const handleDelete = () => {
    mutationDelete.mutate();
  }
  
  const handleDeleteAppre = () => {
    mutationDeleteAppre.mutate();
  }

  const handleAppretiation = () => {
    setIsOpen(!isOpen);
    resetAppre({
      amount: '',
      date_appreciation: '',
    })
    setIdAppretiation(undefined)
  }
  
  const handleEditAppretiation = (id: number) => {
    setIsOpen(!isOpen);
    setIdAppretiation(id);

    const getInfo = listAppretiations.filter((v: any) => v.id === id)[0];
    resetAppre(getInfo);
  }

  useEffect(() => {
    const user = localStorage.getItem('fiona-user');
    if (!user) {
      localStorage.removeItem("fiona-user");
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
      setListAppretiations(data.appreciations);
      setMetrics([
        {
          title: 'Saldo actual',
          values: [formatCurrency.format(Number(data.end_amount))]
        },
        {
          title: 'Rendimientos Acu.',
          values: [formatCurrency.format(data.returns)]
        },
        {
          title: 'Valorizacion',
          values: [data.valorization]
        },
        {
          title: 'Valorizacion + Rendimientos',
          values: [data.total_rate]
        },
      ])
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
    handleAppretiation,
    isOpen,
    onSubmitAppre,
    handleSubmitAppre,
    controlAppre,
    listAppretiations,
    handleEditAppretiation,
    idAppretiation,
    handleDeleteAppre,
    metrics,
  };
}

"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";

import { budgetSchema } from "@/share/validation";

import { useUserStore } from "@/share/storage";

import { useGetApiCategoriesSuspense } from "@@@/endpoints/category/category";
import {
  useGetApiBudgetsIdSuspense,
  usePostApiBudgets,
  usePutApiBudgetsId,
  useDeleteApiBudgetsId,
} from "@@@/endpoints/budget/budget";

export default function useBudgetsCreateViewModel() {
  const router = useRouter();
  const param = useParams();

  const { badges, user, periods } = useUserStore();

  const [title, setTitle] = useState("Creacion de Presupuesto");
  const [currencyOptions, setCurrencyOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [periodsOptions, setPeriodsOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [listCategories, setListCategories] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      periodId: "",
      amount: 0,
      year: new Date().getFullYear().toString(),
      categoryId: undefined,
      badgeId: undefined,
    },
  });

  const { data: dataListCategories } = useGetApiCategoriesSuspense();

  const mutation = usePostApiBudgets();

  const mutationEdit = usePutApiBudgetsId();

  const mutationDelete = useDeleteApiBudgetsId();

  const { data } = useGetApiBudgetsIdSuspense(String(param.id));

  const onSubmit = (data: any) => {
    const formData = {
      ...data,
      categoryId: data.categoryId.value,
      badgeId: data.badgeId.value,
    };
    setIsLoading(true);
    if (param.id) {
      mutationEdit.mutate(
        {
          id: String(param.id),
          data: formData,
        },
        {
          onSuccess: () => {
            setIsLoading(false);
            toast.success("Presupuesto actualizado correctamente");
            router.back();
          },
          onError: () => {
            setIsLoading(false);
          },
        }
      );
    } else {
      mutation.mutate(
        {
          data: formData,
        },
        {
          onSuccess: () => {
            toast.success("Presupuesto creado correctamente");
            router.back();
            setIsLoading(false);
          },
          onError: () => {
            setIsLoading(false);
          },
        }
      );
    }
  };

  const handleDelete = () => {
    setIsLoading(true);
    mutationDelete.mutate(
      {
        id: String(param.id),
      },
      {
        onSuccess: () => {
          toast.success("Presupuesto eliminado correctamente");
          router.back();
          setIsLoading(false);
        },
        onError: () => {
          setIsLoading(false);
        },
      }
    );
  };

  useEffect(() => {
    if (user) {
      setPeriodsOptions(
        periods?.map((v) => {
          return {
            label: String(v.name),
            value: String(v.id),
          };
        })
      );
      setCurrencyOptions(
        badges?.map((v) => {
          return {
            label: String(v.code),
            value: String(v.id),
          };
        })
      );
    }
    if (param.id) {
      setTitle("Edicion de Presupuesto");
    }
  }, [param.id]);

  useEffect(() => {
    if (data?.id) {
      reset({
        categoryId: { value: data.category?.id, label: data.category?.name },
        amount: data.amount,
        periodId: data.periodId,
        badgeId: { value: data.badge?.id, label: data.badge?.code },
        year: data.year.toString(),
      });
    }
  }, [data]);

  useEffect(() => {
    if (dataListCategories && Array.isArray(dataListCategories.content)) {
      setListCategories(
        dataListCategories.content.map((category) => {
          return {
            label: category.name,
            value: category.id,
            icon: category.icon,
            color: category.color,
          };
        })
      );
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
    isLoading,
  };
}

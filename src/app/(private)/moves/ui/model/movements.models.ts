import { useEffect, useState, useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useParams } from "next/navigation";

import { movementSchema, MovementSchema } from "@/share/validation";

import { getDateString, isEmptyObject } from "@/share/helpers";

import { useGetApiInvestmentsSuspense } from "@@@/endpoints/investment/investment";
import { useGetApiEventsSuspense } from "@@@/endpoints/event/event";
import { useGetApiCategoriesSuspense } from "@@@/endpoints/category/category";
import { useGetApiAccountsSuspense } from "@@@/endpoints/account/account";
import {
  useGetApiMovementsIdSuspense,
  usePostApiMovements,
  usePutApiMovementsId,
  useDeleteApiMovementsId,
} from "@@@/endpoints/movement/movement";
import { useUserStore } from "@/share/storage";
import { PostApiMovementsBody, PutApiMovementsIdBody } from "@@@/domain/models";

export interface MovementOption {
  label: string;
  value: string | number;
  badgeId?: number;
  badgeCode?: string;
  icon?: string;
  color?: string;
}

export default function useMovementsViewModel() {
  const router = useRouter();
  const param = useParams();
  const { user } = useUserStore();

  const [title, setTitle] = useState("Creación de Movimientos");
  const [listAccounts, setListAccounts] = useState<MovementOption[]>([]);
  const [listCategories, setListCategories] = useState<MovementOption[]>([]);
  const [listEvents, setListEvents] = useState<MovementOption[]>([]);
  const [listInvestments, setListInvestments] = useState<MovementOption[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<MovementSchema>({
    resolver: zodResolver(movementSchema),
    defaultValues: {
      datePurchase: getDateString(new Date().toISOString()),
      type: "-1",
      account: undefined,
      accountEnd: undefined,
      investment: undefined,
      addWithdrawal: undefined,
      amountEnd: undefined,
      event: undefined,
      category: undefined,
      description: undefined,
      amount: "",
    },
  });

  const typeWatch = useWatch({ control, name: "type" });
  const accountEndWatch = useWatch({ control, name: "accountEnd" });
  const accountWatch = useWatch({ control, name: "account" });
  const investmentWatch = useWatch({ control, name: "investment" });

  const { data: detalMovement, refetch } = useGetApiMovementsIdSuspense(
    String(param.id)
  );

  const { data: dataListAccounts, isError: isErrorAccount } =
    useGetApiAccountsSuspense();

  const { data: dataListCategories, isError: isErrorCategory } =
    useGetApiCategoriesSuspense();

  const { data: dataListEvents, isError: isErrorEvents } =
    useGetApiEventsSuspense();

  const { data: dataListInvestments, isError: isErrorInvestments } =
    useGetApiInvestmentsSuspense();

  const mutation = usePostApiMovements();
  const mutationEdit = usePutApiMovementsId();
  const mutationDelete = useDeleteApiMovementsId();

  const onSubmit = (data: MovementSchema) => {
    setIsSubmitting(true);
    const amountClean = Number(String(data.amount).replace(/,/g, ""));
    const amountEndClean = data.amountEnd ? Number(String(data.amountEnd).replace(/,/g, "")) : null;

    const commonData = {
      categoryId: data.category ? String(data.category.value) : "",
      type: data.type === "0" ? "transfer" : "move",
      amount: data.type === "1" ? Math.abs(amountClean) : amountClean * -1,
      datePurchase: new Date(data.datePurchase).toISOString(),
      eventId: data.event ? String(data.event.value) : null,
      investmentId: data.investment ? String(data.investment.value) : null,
      accountId: String(data.account.value),
      description: data.description ?? null,
      addWithdrawal: data.addWithdrawal ?? false,
    };

    if (param.id) {
      const editData: PutApiMovementsIdBody & { accountEndId?: string; amountEnd?: number } = {
        ...commonData,
        ...(data.type === "0" && {
          amountEnd: Math.abs(amountEndClean ?? amountClean),
          accountEndId: data.accountEnd ? String(data.accountEnd.value) : undefined,
        })
      };

      mutationEdit.mutate(
        { id: String(param.id), data: editData as any },
        {
          onSuccess: () => {
            toast.success("Datos guardados correctamente");
            router.back();
          },
          onError: (error) => {
            toast.error(error.message);
            setIsSubmitting(false);
          },
        }
      );
    } else {
      const postData: PostApiMovementsBody & { accountEndId?: string; amountEnd?: number } = {
        ...commonData,
        ...(data.type === "0" && {
          amountEnd: Math.abs(amountEndClean ?? amountClean),
          accountEndId: data.accountEnd ? String(data.accountEnd.value) : undefined,
        })
      };

      console.log(postData)

      mutation.mutate(
        { data: postData as any },
        {
          onSuccess: () => {
            toast.success("Datos guardados correctamente");
            router.back();
          },
          onError: (error) => {
            toast.error(error.response?.data.message ?? error.message);
            setIsSubmitting(false);
          },
        }
      );
    }
  };

  const handleDelete = () => {
    setIsSubmitting(true);
    mutationDelete.mutate(
      { id: String(param.id) },
      {
        onSuccess: () => {
          toast.success("Datos guardados correctamente");
          router.back();
        },
        onError: (error) => {
          toast.error(error.message);
          setIsSubmitting(false);
        },
      }
    );
  };

  useEffect(() => {
    refetch();
    if (!user) {
      router.push("/login");
    } else {
      if (param.id) {
        setTitle("Edición de Movimientos");
      }
    }
  }, [user, param.id, refetch, router]);

  useEffect(() => {
    if (dataListAccounts?.content) {
      setListAccounts(
        dataListAccounts.content
          .filter((v) => !v.deletedAt)
          .map((account) => {
            return {
              label: account.name + " - " + account.badge?.code,
              value: account.id,
              badgeId: account.badge.id,
              badgeCode: account.badge?.code,
            };
          })
      );
    }
  }, [dataListAccounts]);

  useEffect(() => {
    if (dataListCategories?.content && Array.isArray(dataListCategories.content)) {
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

  useEffect(() => {
    if (dataListEvents?.content && Array.isArray(dataListEvents.content)) {
      setListEvents(
        dataListEvents.content.map((event) => {
          return { label: event.name, value: event.id };
        })
      );
    }
  }, [dataListEvents]);

  useEffect(() => {
    if (dataListInvestments?.content && Array.isArray(dataListInvestments.content)) {
      setListInvestments(
        dataListInvestments.content.map((investment) => {
          return { label: investment.name, value: investment.id };
        })
      );
    }
  }, [dataListInvestments]);

  useEffect(() => {
    if (
      isErrorAccount ||
      isErrorCategory ||
      isErrorEvents ||
      isErrorInvestments
    ) {
      router.push("/login");
    }
  }, [isErrorAccount, isErrorCategory, isErrorEvents, isErrorInvestments, router]);

  useEffect(() => {
    if (detalMovement?.id) {
      reset({
        addWithdrawal: detalMovement.addWithdrawal,
        amount:
          !isEmptyObject(detalMovement.transferOut) ||
          !isEmptyObject(detalMovement.transferIn)
            ? !isEmptyObject(detalMovement.transferOut)
              ? Math.abs(detalMovement.transferOut?.amount ?? 0).toString()
              : Math.abs(detalMovement.amount ?? 0).toString()
            : Math.abs(detalMovement.amount ?? 0).toString(),
        type:
          !isEmptyObject(detalMovement.transferOut) ||
          !isEmptyObject(detalMovement.transferIn)
            ? "0"
            : detalMovement.amount > 0
            ? "1"
            : "-1",
        datePurchase: getDateString(detalMovement.datePurchase),
        description: detalMovement.description ?? undefined,
        category: (isEmptyObject(detalMovement.transferOut) && isEmptyObject(detalMovement.transferIn)) ? {
          label: detalMovement.category?.name ?? "",
          value: detalMovement.category?.id ?? "",
        } : undefined,
        account:
          !isEmptyObject(detalMovement.transferOut) ||
          !isEmptyObject(detalMovement.transferIn)
            ? !isEmptyObject(detalMovement.transferOut)
              ? {
                  label: detalMovement.transferOut?.account?.name ?? "",
                  value: detalMovement.transferOut?.account?.id ?? "",
                  badgeId: detalMovement.transferOut?.account?.badgeId,
                }
              : {
                  label: detalMovement.account?.name ?? "",
                  value: detalMovement.account?.id ?? "",
                  badgeId: detalMovement.account?.badge?.id,
                }
            : {
                label: detalMovement.account?.name ?? "",
                value: detalMovement.account?.id ?? "",
                badgeId: detalMovement.account?.badge?.id,
              },
        ...((!isEmptyObject(detalMovement.transferOut) ||
          !isEmptyObject(detalMovement.transferIn)) && {
          accountEnd: !isEmptyObject(detalMovement.transferIn)
            ? {
                label: detalMovement.transferIn?.account?.name ?? "",
                value: detalMovement.transferIn?.account?.id ?? "",
                badgeId: detalMovement.transferIn?.account?.badgeId,
              }
            : {
                label: detalMovement.account?.name ?? "",
                value: detalMovement.account?.id ?? "",
                badgeId: detalMovement.account?.badge?.id ?? undefined,
              },
          amountEnd: !isEmptyObject(detalMovement.transferIn)
            ? detalMovement.transferIn?.amount?.toString()
            : detalMovement.amount.toString(),
        }),
        event: detalMovement.event?.id ? {
          label: detalMovement.event?.name ?? "",
          value: detalMovement.event?.id,
        } : undefined,
        investment: detalMovement.investment?.id ? {
          label: detalMovement.investment?.name ?? "",
          value: detalMovement.investment?.id,
        } : undefined,
      });
    }
  }, [detalMovement, reset]);

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
    isSubmitting,
    errors,
  };
}

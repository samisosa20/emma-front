import { useEffect, useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useParams } from "next/navigation";

import { movementSchema } from "@/share/validation";

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

export interface MovementOption {
  label: string;
  value: string | number;
  icon?: string;
  color?: string;
  badgeId?: number;
  badgeCode?: string;
}

export default function useMovementsViewModel() {
  const router = useRouter();
  const param = useParams();
  const { user } = useUserStore();

  /**
   * ⚡ Bolt Optimization: Memoized title calculation
   * 🎯 Problem: Using state and effect for a value that can be derived from params.
   * 📊 Impact: Reduces one state variable and prevents a redundant re-render on mount.
   */
  const title = useMemo(
    () => (param.id ? "Edicion de Movimientos" : "Creacion de Movimientos"),
    [param.id]
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
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
      amount: undefined,
    },
  });

  const typeWatch = watch("type");
  const accountEndWatch = watch("accountEnd");
  const accountWatch = watch("account");
  const investmentWatch = watch("investment");

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

  /**
   * ⚡ Bolt Optimization: Stabilize form submission callback.
   * 🎯 Problem: Every re-render of useMovementsViewModel created a new function,
   *    causing memoized view components to re-render.
   * 📊 Impact: Ensures stable reference for onSubmit, allowing React.memo to work.
   */
  const onSubmit = useCallback(
    (data: any) => {
      setIsSubmitting(true);
      const transferCategory = dataListCategories?.content?.find(
        (c: any) => c.name === "Transferencia"
      );
      const transferCategoryId = transferCategory?.id || "00000000-0000-0000-0000-000000000000";

      const formData = {
        categoryId: data.type == 0 ? transferCategoryId : (data.category ? data.category.value : ""),
        type: data.type == 0 ? "transfer" : "move",
        amount: data.type == 1 ? Math.abs(data.amount) : data.amount * -1,
        datePurchase: new Date(data.datePurchase).toISOString(),
        ...(data.event !== undefined && {
          eventId: data.event ? data.event.value : null,
        }),
        ...(data.investment !== undefined && {
          investmentId: data.investment ? data.investment.value : null,
        }),
        accountId: data.account.value,
        ...(data.type == 0 && {
          amountEnd:
            data.type == 0 ? Math.abs(data.amountEnd ?? data.amount) : null,
          accountEndId: data.type == 0 ? data.accountEnd.value : null,
        }),
        description: data.description !== undefined ? data.description : null,
        addWithdrawal: data.addWithdrawal ?? false,
      };
      if (param.id) {
        mutationEdit.mutate(
          { id: String(param.id), data: formData },
          {
            onSuccess: () => {
              toast.success("Datos guardados correctamente");
              router.back();
            },
            onError: (error) => {
              toast.error(error.message);
              setIsSubmitting(false);
            },
          },
        );
      } else {
        mutation.mutate(
          { data: formData },
          {
            onSuccess: () => {
              toast.success("Datos guardados correctamente");
              router.back();
            },
            onError: (error) => {
              toast.error(error.response?.data.message ?? error.message);
              setIsSubmitting(false);
            },
          },
        );
      }
    },
    [mutation, mutationEdit, param.id, router, setIsSubmitting],
  );

  /**
   * ⚡ Bolt Optimization: Stabilize deletion callback.
   * 📊 Impact: Ensures stable reference for handleDelete.
   */
  const handleDelete = useCallback(() => {
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
      },
    );
  }, [mutationDelete, param.id, router, setIsSubmitting]);

  useEffect(() => {
    refetch();
    if (!user) {
      router.push("/login");
    }
  }, []);

  /**
   * ⚡ Bolt Optimization: Memoized data transformations
   * 🎯 Problem: Using state and effects to transform API data on every update.
   * 📊 Impact: Eliminates redundant state variables and prevents cascading re-renders
   *    after data is fetched.
   */
  const listAccounts = useMemo(() => {
    if (!dataListAccounts?.content) return [];
    return dataListAccounts.content
      .filter((v) => !v.deletedAt)
      .map((account) => ({
        label: account.name + " - " + account.badge?.code,
        value: account.id,
        badgeId: account.badge.id,
        badgeCode: account.badge?.code,
      }));
  }, [dataListAccounts]);

  const listCategories = useMemo(() => {
    if (!dataListCategories?.content) return [];
    return dataListCategories.content.map((category) => ({
      label: category.name,
      value: category.id,
      icon: category.icon,
      color: category.color,
    }));
  }, [dataListCategories]);

  const listEvents = useMemo(() => {
    if (!dataListEvents?.content) return [];
    return dataListEvents.content.map((event) => ({
      label: event.name,
      value: event.id,
    }));
  }, [dataListEvents]);

  const listInvestments = useMemo(() => {
    if (!dataListInvestments?.content) return [];
    return dataListInvestments.content.map((investment) => ({
      label: investment.name,
      value: investment.id,
    }));
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
  }, [isErrorAccount, isErrorCategory, isErrorEvents, isErrorInvestments]);

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
        ...(detalMovement.description && {
          description: detalMovement.description,
        }),
        ...(isEmptyObject(detalMovement.transferOut) &&
          isEmptyObject(detalMovement.transferIn) && {
            category: {
              label: detalMovement.category?.name,
              value: detalMovement.category?.id,
              badgeId: detalMovement.account?.badge?.id,
            },
          }),
        account:
          !isEmptyObject(detalMovement.transferOut) ||
          !isEmptyObject(detalMovement.transferIn)
            ? !isEmptyObject(detalMovement.transferOut)
              ? {
                  label: detalMovement.transferOut?.account?.name,
                  value: detalMovement.transferOut?.account?.id,
                  badgeId: detalMovement.transferOut?.account?.badgeId,
                }
              : {
                  label: detalMovement.account?.name,
                  value: detalMovement.account?.id,
                  badgeId: detalMovement.account?.badge?.id,
                }
            : {
                label: detalMovement.account?.name,
                value: detalMovement.account?.id,
                badgeId: detalMovement.account?.badge?.id,
              },
        ...((!isEmptyObject(detalMovement.transferOut) ||
          !isEmptyObject(detalMovement.transferIn)) && {
          accountEnd: !isEmptyObject(detalMovement.transferIn)
            ? {
                label: detalMovement.transferIn?.account?.name,
                value: detalMovement.transferIn?.account?.id,
                badgeId: detalMovement.transferIn?.account?.badgeId,
              }
            : {
                label: detalMovement.account?.name,
                value: detalMovement.account?.id,
                badgeId: detalMovement.account?.badge?.id ?? "",
              },
        }),
        ...((!isEmptyObject(detalMovement.transferOut) ||
          !isEmptyObject(detalMovement.transferIn)) && {
          amountEnd: !isEmptyObject(detalMovement.transferIn)
            ? detalMovement.transferIn?.amount?.toString()
            : detalMovement.amount.toString(),
        }),
        ...(detalMovement.event?.id && {
          event: {
            label: detalMovement.event?.name,
            value: detalMovement.event?.id,
          },
        }),
        ...(detalMovement.investment?.id && {
          investment: {
            label: detalMovement.investment?.name,
            value: detalMovement.investment?.id,
          },
        }),
      });
    }
  }, [detalMovement]);

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
  };
}

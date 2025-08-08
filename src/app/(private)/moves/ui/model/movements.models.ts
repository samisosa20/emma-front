import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useParams } from "next/navigation";

import { movementSchema } from "@/share/validation";

import { getDateString, isEmptyObject } from "@/share/helpers";

import { useGetApiV2InvestmentsSuspense } from "@@@/endpoints/investment/investment";
import { useGetApiV2EventsSuspense } from "@@@/endpoints/event/event";
import { useGetApiV2CategoriesSuspense } from "@@@/endpoints/category/category";
import { useGetApiV2AccountsSuspense } from "@@@/endpoints/account/account";
import {
  useGetApiV2MovementsIdSuspense,
  usePostApiV2Movements,
  usePutApiV2MovementsId,
  useDeleteApiV2MovementsId,
} from "@@@/endpoints/movement/movement";
import { useUserStore } from "@/share/storage";

export default function useMovementsViewModel() {
  const router = useRouter();
  const param = useParams();
  const { badges, user } = useUserStore();

  const [title, setTitle] = useState("Creacion de Movimientos");
  const [listAccounts, setListAccounts] = useState<any[]>([]);
  const [listCategories, setListCategories] = useState<any[]>([]);
  const [listEvents, setListEvents] = useState<any[]>([]);
  const [listInvestments, setListInvestments] = useState<any[]>([]);
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

  console.log(errors);

  const typeWatch = watch("type");
  const accountEndWatch = watch("accountEnd");
  const accountWatch = watch("account");
  const investmentWatch = watch("investment");

  const { data: detalMovement, refetch } = useGetApiV2MovementsIdSuspense(
    String(param.id)
  );

  const { data: dataListAccounts, isError: isErrorAccount } =
    useGetApiV2AccountsSuspense();

  const { data: dataListCategories, isError: isErrorCategory } =
    useGetApiV2CategoriesSuspense();

  const { data: dataListEvents, isError: isErrorEvents } =
    useGetApiV2EventsSuspense();

  const { data: dataListInvestments, isError: isErrorInvestments } =
    useGetApiV2InvestmentsSuspense();

  const mutation = usePostApiV2Movements();
  const mutationEdit = usePutApiV2MovementsId();
  const mutationDelete = useDeleteApiV2MovementsId();

  const onSubmit = (data: any) => {
    setIsSubmitting(true);
    const formData = {
      categoryId: data.category ? data.category.value : "",
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
        amountEnd: data.type == 0 ? Math.abs(data.amountEnd) : null,
        accountEndId: data.type == 0 ? data.accountEnd.value : null,
      }),
      description: data.description !== undefined ? data.description : null,
      addWithdrawal: data.addWithdrawal ?? false,
    };
    if (param.id) {
      mutationEdit.mutate(
        { id: String(param.id), data: formData },
        {
          onSuccess: (result) => {
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
      mutation.mutate(
        { data: formData },
        {
          onSuccess: (result) => {
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
        onSuccess: (result) => {
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
        setTitle("Edicion de Movimientos");
      }
    }
  }, []);

  useEffect(() => {
    if (dataListAccounts && dataListAccounts.content) {
      setListAccounts(
        dataListAccounts.content
          .filter((v) => !v.deletedAt)
          .map((account) => {
            return {
              label: account.name + " - " + account.badge?.code,
              value: account.id,
              badgeId: account.badge.id,
            };
          })
      );
    }
  }, [dataListAccounts]);

  useEffect(() => {
    if (dataListCategories && Array.isArray(dataListCategories.content)) {
      setListCategories(
        dataListCategories.content.map((category) => {
          return { label: category.name, value: category.id };
        })
      );
    }
  }, [dataListCategories]);

  useEffect(() => {
    if (dataListEvents && Array.isArray(dataListEvents.content)) {
      setListEvents(
        dataListEvents.content.map((event) => {
          return { label: event.name, value: event.id };
        })
      );
    }
  }, [dataListEvents]);

  useEffect(() => {
    if (dataListInvestments && Array.isArray(dataListInvestments.content)) {
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

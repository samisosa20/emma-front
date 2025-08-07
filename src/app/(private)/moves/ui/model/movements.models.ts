import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useParams } from "next/navigation";

import { movementSchema } from "@/share/validation";

import { getDateString } from "@/share/helpers";

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

export default function useMovementsViewModel() {
  const router = useRouter();
  const param = useParams();

  const [title, setTitle] = useState("Creacion de Movimientos");
  const [listAccounts, setListAccounts] = useState<any[]>([]);
  const [listCategories, setListCategories] = useState<any[]>([]);
  const [listEvents, setListEvents] = useState<any[]>([]);
  const [listInvestments, setListInvestments] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleSubmit, control, reset, watch } = useForm({
    resolver: zodResolver(movementSchema),
    defaultValues: {
      date_purchase: getDateString(),
      type: "-1",
      account: null,
      account_end: undefined,
      investment: undefined,
      addWithdrawal: undefined,
    },
  });

  const typeWatch = watch("type");
  const accountEndWatch = watch("account_end");
  const accountWatch = watch("account");
  const investmentWatch = watch("investment");

  const { data } = useGetApiV2MovementsIdSuspense(String(param.id));

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
      categoryId: data.category ? data.category.value : 0,
      type: data.type == 0 ? "transfer" : "move",
      amount: data.type == 1 ? Math.abs(data.amount) : data.amount * -1,
      datePurchase: new Date(data.date_purchase).toISOString(),
      ...(data.event !== undefined && {
        eventId: data.event ? data.event.value : null,
      }),
      ...(data.investment !== undefined && {
        investmentId: data.investment ? data.investment.value : null,
      }),
      accountId: data.account.value,
      ...(data.type == 0 && {
        amountEnd: data.type == 0 ? data.amountEnd : null,
        accountEndId: data.type == 0 ? data.amountEnd.value : null,
      }),
      description: data.description !== undefined ? data.description : null,
      addWithdrawal: data.addWithdrawal ?? 0,
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
    const user = localStorage.getItem("fiona-user");
    if (!user) {
      localStorage.removeItem("fiona-user");
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
              badge_id: account.badge.id,
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
      localStorage.removeItem("fiona-user");
      router.push("/login");
    }
  }, [isErrorAccount, isErrorCategory, isErrorEvents, isErrorInvestments]);

  useEffect(() => {
    if (data) {
      // @ts-ignore
      reset({
        addWithdrawal: data.addWithdrawal,
        amount:
          data.transfer_out || data.transfer_in
            ? data.transfer_out
              ? Math.abs(data.transfer_out?.amount ?? 0).toString()
              : Math.abs(data.amount ?? 0).toString()
            : Math.abs(data.amount ?? 0).toString(),
        type:
          data.transfer_out || data.transfer_in
            ? "0"
            : data.amount > 0
            ? "1"
            : "-1",
        date_purchase: getDateString(data.datePurchase),
        ...(data.description && { description: data.description }),
        ...(!data.transfer_out &&
          !data.transfer_in && {
            category: {
              label: data.category?.name,
              value: data.category?.id,
              badge_id: data.account?.badge_id,
            },
          }),
        account:
          data.transfer_out || data.transfer_in
            ? data.transfer_out
              ? {
                  label: data.transfer_out.account?.name,
                  value: data.transfer_out.account?.id,
                  badge_id: data.transfer_out.account?.badge_id,
                }
              : {
                  label: data.account?.name,
                  value: data.account?.id,
                  badge_id: data.account?.badge?.id,
                }
            : {
                label: data.account?.name,
                value: data.account?.id,
                badge_id: data.account?.badge?.id,
              },
        ...((data.transfer_out || data.transfer_in) && {
          account_end: data.transfer_in
            ? {
                label: data.transfer_in.account?.name,
                value: data.transfer_in.account?.id,
                badge_id: data.transfer_in.account?.badge_id,
              }
            : {
                label: data.account?.name,
                value: data.account?.id,
                badge_id: data.account?.badge?.id,
              },
        }),
        ...((data.transfer_out || data.transfer_in) && {
          amountEnd: data.transfer_in
            ? data.transfer_in.amount.toString()
            : data.amount.toString(),
        }),
        ...(data.event?.id && {
          event: { label: data.event?.name, value: data.event?.id },
        }),
        ...(data.investment?.id && {
          investment: {
            label: data.investment?.name,
            value: data.investment?.id,
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
    isSubmitting,
  };
}

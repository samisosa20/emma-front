import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";

import { paymentsSchema } from "@/share/validation";

import {
  useGetApiV2PlannedPaymentsIdSuspense,
  useDeleteApiV2PlannedPaymentsId,
  usePutApiV2PlannedPaymentsId,
  usePostApiV2PlannedPayments,
} from "@@@/endpoints/planned-payment/planned-payment";
import { useGetApiV2AccountsSuspense } from "@@@/endpoints/account/account";
import { useGetApiV2CategoriesSuspense } from "@@@/endpoints/category/category";
import { useUserStore } from "@/share/storage";

export default function usePaymentsCreateViewModel() {
  const router = useRouter();
  const param = useParams();

  const { user } = useUserStore();

  const [title, setTitle] = useState("Creacion de Pagos");
  const [listAccounts, setListAccounts] = useState<any>([]);
  const [listCategories, setListCategories] = useState<any>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(paymentsSchema),
    defaultValues: {
      account: undefined,
      category: undefined,
      description: "",
      endDate: "",
      startDate: undefined,
      amount: 0,
      specificDay: 1,
    },
  });

  const mutation = usePostApiV2PlannedPayments();

  const mutationEdit = usePutApiV2PlannedPaymentsId();

  const mutationDelete = useDeleteApiV2PlannedPaymentsId();

  const { data, refetch } = useGetApiV2PlannedPaymentsIdSuspense(
    String(param.id)
  );

  const { data: dataListAccounts, isError: isErrorAccount } =
    useGetApiV2AccountsSuspense();

  const { data: dataListCategories, isError: isErrorCategory } =
    useGetApiV2CategoriesSuspense();

  const onSubmit = (data: any) => {
    setIsSubmitting(true);
    const formData = {
      amount: Number(data.amount),
      specificDay: Number(data.specificDay),
      description: data.description ? data.description : null,
      categoryId: data.category ? data.category.value : 0,
      accountId: data.account.value,
      startDate: new Date(data.startDate).toISOString(),
      endDate: data.endDate ? new Date(data.endDate).toISOString() : null,
    };
    if (param.id) {
      mutationEdit.mutate(
        {
          data: formData,
          id: String(param.id),
        },
        {
          onSuccess: (data) => {
            toast.success("Pago editado correctamente");
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
        {
          data: formData,
        },
        {
          onSuccess: (data) => {
            toast.success("Pago creado correctamente");
            router.back();
          },
          onError: (error) => {
            toast.error(error.message);
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
        onSuccess: (data) => {
          toast.success("Pago eliminado correctamente");
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
    if (!user) {
      router.push("/login");
    } else {
      if (param.id) {
        refetch();
        setTitle("Edicion de Pagos");
      }
    }
  }, []);

  useEffect(() => {
    if (data?.id) {
      reset({
        account: { value: data.account?.id, label: data.account?.name },
        category: { value: data.category?.id, label: data.category?.name },
        description: data.description ? data.description : "",
        endDate: data.endDate ? data.endDate.split("T")[0] : "",
        startDate: data.startDate.split("T")[0],
        amount: data.amount,
        specificDay: data.specificDay,
      });
    }
  }, [data]);

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
    listCategories,
    listAccounts,
    handleDelete,
    isSubmitting,
  };
}

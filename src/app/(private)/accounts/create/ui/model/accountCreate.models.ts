"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";

import { accountSchema } from "@/share/validation";

import { useUserStore } from "@/share/storage";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetApiAccountsId,
  useDeleteApiAccountsId,
  usePostApiAccounts,
  usePutApiAccountsId,
  usePatchApiAccountsIdRestore,
  usePatchApiAccountsIdDesactivate,
} from "@@@/endpoints/account/account";
import { authClient } from "@/share/lib/auth-client";

const useAccountCreate = () => {
  const router = useRouter();
  const param = useParams();
  const queryClient = useQueryClient();
  const { data: session } = authClient.useSession();

  const [typeOptions, setTypeOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [isDesactivate, setIsDesactivate] = useState(false);
  const [currencyOptions, setCurrencyOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [title, setTitle] = useState("Creacion de Cuentas");

  const { handleSubmit, control, reset, watch } = useForm({
    resolver: zodResolver(accountSchema),
  });

  const watchType = watch("typeId");

  const mutation = usePostApiAccounts();

  const mutationEdit = usePutApiAccountsId();

  const mutationDelete = useDeleteApiAccountsId();

  const mutationDesactive = usePatchApiAccountsIdDesactivate();

  const mutationRestore = usePatchApiAccountsIdRestore();

  const { data } = useGetApiAccountsId(String(param?.id || ""), {
    query: {
      enabled: !!param?.id,
    },
  });

  const onSubmit = (data: any) => {
    const formData = {
      ...data,
      description: data.description ? data.description : "",
      badgeId: data.badgeId.value,
      limit: data.limit ? Number(data.limit) : 0,
    };
    if (param.id) {
      mutationEdit.mutate(
        {
          id: String(param.id),
          data: formData,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries();
            toast.success("Cuenta actualizada correctamente");
            router.push("/accounts");
          },
          onError: (error: any) => {
            toast.error(error?.message || "Error al actualizar la cuenta");
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
            queryClient.invalidateQueries();
            toast.success("Cuenta creada correctamente");
            router.push("/accounts");
          },
          onError: (error: any) => {
            toast.error(error?.message || "Error al crear la cuenta");
          },
        }
      );
    }
  };

  const handleDelete = () => {
    if (isDesactivate) {
      mutationDelete.mutate(
        {
          id: String(param.id),
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries();
            toast.success("Cuenta eliminada correctamente");
            router.push("/accounts");
          },
          onError: (error: any) => {
            toast.error(error?.message || "Error al eliminar la cuenta");
          },
        }
      );
    } else {
      mutationDesactive.mutate(
        {
          id: String(param.id),
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries();
            toast.success("Cuenta desactivada correctamente");
            setIsDesactivate(true);
          },
          onError: (error: any) => {
            toast.error(error?.message || "Error al desactivar la cuenta");
          },
        }
      );
    }
  };

  const handleReActivate = () => {
    mutationRestore.mutate(
      {
        id: String(param.id),
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries();
          toast.success("Cuenta reactivada correctamente");
          setIsDesactivate(false);
        },
        onError: (error: any) => {
          toast.error(error?.message || "Error al reactivar la cuenta");
        },
      }
    );
  };

  useEffect(() => {
    if (session?.user) {
      setTypeOptions(
        session?.accountTypes?.map((v) => {
          return {
            label: String(v.name),
            value: String(v.id),
          };
        })
      );
      setCurrencyOptions(
        session?.badges?.map((v) => {
          return {
            label: String(v.code),
            value: String(v.id),
          };
        })
      );
    }
    if (param.id) {
      setTitle("Edicion de Cuentas");
    }
  }, [param.id]);

  useEffect(() => {
    if (data) {
      reset({
        name: data?.name,
        description: data?.description ?? "",
        typeId: data?.type?.id,
        badgeId: {
          label: data?.badge?.code,
          value: data?.badge?.id,
        },
        initAmount: data?.initAmount?.toString(),
      });
      setIsDesactivate(!!data?.deletedAt);
    }
  }, [data]);

  const isSubmitting =
    mutation.isPending ||
    mutationEdit.isPending ||
    mutationDelete.isPending ||
    mutationDesactive.isPending ||
    mutationRestore.isPending;

  return {
    handleSubmit,
    onSubmit,
    control,
    typeOptions,
    currencyOptions,
    title,
    handleDelete,
    handleReActivate,
    isDesactivate,
    watchType,
    isSubmitting,
  };
};

export default useAccountCreate;

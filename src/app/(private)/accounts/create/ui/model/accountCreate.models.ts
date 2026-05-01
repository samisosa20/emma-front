"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";

import { accountSchema } from "@/share/validation";

import { useUserStore } from "@/share/storage";
import {
  useGetApiAccountsIdSuspense,
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

  const { data } = useGetApiAccountsIdSuspense(String(param.id));

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
          onSuccess: (result) => {
            toast.success("Cuenta actualizada correctamente");
            router.push("/accounts");
          },
        }
      );
    } else {
      mutation.mutate(
        {
          data: formData,
        },
        {
          onSuccess: (result) => {
            toast.success("Cuenta creada correctamente");
            router.push("/accounts");
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
          onSuccess: (result) => {
            toast.success("Cuenta eliminada correctamente");
            router.push("/accounts");
          },
        }
      );
    } else {
      mutationDesactive.mutate(
        {
          id: String(param.id),
        },
        {
          onSuccess: (result) => {
            toast.success("Cuenta desactivada correctamente");
            setIsDesactivate(true);
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
        onSuccess: (result) => {
          toast.success("Cuenta reactivada correctamente");
          setIsDesactivate(false);
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
  };
};

export default useAccountCreate;

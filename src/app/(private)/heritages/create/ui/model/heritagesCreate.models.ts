import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";

import { useQueryClient } from "@tanstack/react-query";

import { heritageSchema } from "@/share/validation";

import {
  useGetApiHeritagesId,
  usePostApiHeritages,
  usePutApiHeritagesId,
  useDeleteApiHeritagesId,
} from "@@@/endpoints/heritage/heritage";
import { authClient } from "@/share/lib/auth-client";

export default function useHeritagesCreateViewModel() {
  const router = useRouter();
  const param = useParams();
  const queryClient = useQueryClient();
  const { data: session } = authClient.useSession();

  const [title, setTitle] = useState("Creacion de Patrimonio");
  const [currencyOptions, setCurrencyOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(heritageSchema),
    defaultValues: {
      name: "",
      comercialAmount: "0",
      legalAmount: "0",
      badgeId: undefined,
      year: new Date().getFullYear(),
    },
  });

  const mutation = usePostApiHeritages();

  const mutationEdit = usePutApiHeritagesId();

  const mutationDelete = useDeleteApiHeritagesId();

  const { data, refetch } = useGetApiHeritagesId(String(param?.id || ""), {
    query: {
      enabled: !!param?.id,
    },
  });

  useEffect(() => {
    if (param?.id) {
      refetch();
    }
  }, [param?.id, refetch]);

  const onSubmit = (data: any) => {
    const formData = {
      ...data,
      badgeId: data.badgeId.value,
      comercialAmount: Number(data.comercialAmount),
      legalAmount: Number(data.legalAmount),
    };
    if (param?.id) {
      mutationEdit.mutate(
        { id: String(param.id), data: formData },
        {
          onSuccess: () => {
            queryClient.invalidateQueries();
            toast.success("Patrimonio actualizado con exito");
            router.back();
          },
          onError: (error: any) => {
            toast.error(error?.message || "Error al actualizar el patrimonio");
          },
        },
      );
    } else {
      mutation.mutate(
        { data: formData },
        {
          onSuccess: () => {
            queryClient.invalidateQueries();
            toast.success("Patrimonio creado con exito");
            router.back();
          },
          onError: (error: any) => {
            toast.error(error?.message || "Error al crear el patrimonio");
          },
        },
      );
    }
  };

  const handleDelete = () => {
    if (!param?.id) return;
    mutationDelete.mutate(
      { id: String(param.id) },
      {
        onSuccess: () => {
          queryClient.invalidateQueries();
          toast.success("Patrimonio eliminado con exito");
          router.back();
        },
        onError: (error: any) => {
          toast.error(error?.message || "Error al eliminar el patrimonio");
        },
      },
    );
  };

  useEffect(() => {
    if (param?.id) {
      refetch();
    }
    if (session?.badges) {
      setCurrencyOptions(
        session.badges.map((v) => {
          return {
            label: String(v.code),
            value: String(v.id),
          };
        }),
      );
    }
    if (param?.id) {
      setTitle("Edicion de Patrimonio");
    }
  }, [session, param?.id, refetch]);

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      reset({
        name: data.name,
        comercialAmount: data.comercialAmount?.toString() ?? "0",
        legalAmount: data.legalAmount?.toString() ?? "0",
        badgeId: data.badge
          ? { label: data.badge.code, value: data.badge.id }
          : undefined,
        year: data.year ?? new Date().getFullYear(),
      });
    }
  }, [data]);

  const isSubmitting = mutation.isPending || mutationEdit.isPending;

  return {
    handleSubmit,
    onSubmit,
    control,
    title,
    currencyOptions,
    handleDelete: param.id ? handleDelete : undefined,
    isSubmitting,
    data,
  };
}

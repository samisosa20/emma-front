import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";

import { heritageSchema } from "@/share/validation";

import {
  useGetApiHeritagesIdSuspense,
  usePostApiHeritages,
  usePutApiHeritagesId,
  useDeleteApiHeritagesId,
} from "@@@/endpoints/heritage/heritage";
import { useUserStore } from "@/share/storage";

export default function useHeritagesCreateViewModel() {
  const router = useRouter();
  const param = useParams();
  const { badges } = useUserStore();

  const [title, setTitle] = useState("Creacion de Patrimonio");
  const [currencyOptions, setCurrencyOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(heritageSchema),
    defaultValues: {
      badgeId: undefined,
      year: new Date().getFullYear(),
    },
  });

  const mutation = usePostApiHeritages();

  const mutationEdit = usePutApiHeritagesId();

  const mutationDelete = useDeleteApiHeritagesId();

  const { data, refetch } = useGetApiHeritagesIdSuspense(String(param.id));

  const onSubmit = (data: any) => {
    const formData = {
      ...data,
      badgeId: data.badgeId.value,
      comercialAmount: Number(data.comercialAmount),
      legalAmount: Number(data.legalAmount),
    };
    if (param.id) {
      mutationEdit.mutate(
        { id: String(param.id), data: formData },
        {
          onSuccess: () => {
            toast.success("Patrimonio actualizado con exito");
            router.back();
          },
        }
      );
    } else {
      mutation.mutate(
        { data: formData },
        {
          onSuccess: () => {
            toast.success("Patrimonio creado con exito");
            router.back();
          },
        }
      );
    }
  };

  const handleDelete = () => {
    mutationDelete.mutate(
      { id: String(param.id) },
      {
        onSuccess: () => {
          toast.success("Patrimonio eliminado con exito");
          router.back();
        },
      }
    );
  };

  useEffect(() => {
    refetch();
    setCurrencyOptions(
      badges?.map((v) => {
        return {
          label: String(v.code),
          value: String(v.id),
        };
      })
    );
    if (param.id) {
      setTitle("Edicion de Patrimonio");
    }
  }, []);

  useEffect(() => {
    if (data) {
      reset({
        ...data,
        badgeId: { label: data.badge?.code, value: data.badge?.id },
      });
    }
  }, [data]);

  return {
    handleSubmit,
    onSubmit,
    control,
    title,
    currencyOptions,
    handleDelete,
  };
}

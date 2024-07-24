import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";

import { heritageSchema } from "@/share/validation";
import type { HeritageSchema } from "@/share/validation";

import { HeritageUseCase } from "@@/application/heritage.use-case";
import { HeritageApiAdapter } from "@@/infrastructure/heritage-api.adapter";

import { customConfigHeader } from "@/share/helpers";

export default function useHeritagesCreateViewModel() {
  const router = useRouter();
  const param = useParams();

  const [title, setTitle] = useState("Creacion de Patrimonio");
  const [currencyOptions, setCurrencyOptions] = useState([]);

  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(heritageSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: HeritageSchema) => {
      const user = localStorage.getItem("emma-user");
      if (user) {
        const { createHeritage } = new HeritageUseCase(
          new HeritageApiAdapter({
            baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
            customConfig: customConfigHeader(),
          })
        );
        const result = await createHeritage(data);
        if (result.error) {
          toast.error(result.message);
          return;
        }
        toast.success(result.message);
        router.back();
      }
    },
  });

  const mutationEdit = useMutation({
    mutationFn: async (data: HeritageSchema) => {
      const user = localStorage.getItem("emma-user");
      if (user) {
        const { editHeritage } = new HeritageUseCase(
          new HeritageApiAdapter({
            baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
            customConfig: customConfigHeader(),
          })
        );
        const id = Array.isArray(param.id)
          ? parseInt(param.id[0])
          : parseInt(param.id);
        const result = await editHeritage(id, data);
        if (result.error) {
          toast.error(result.message);
          return;
        }
        toast.success(result.message);
        router.back();
      }
    },
  });
  
  const mutationDelete = useMutation({
    mutationFn: async () => {
      const user = localStorage.getItem("emma-user");
      if (user) {
        const { deleteHeritage } = new HeritageUseCase(
          new HeritageApiAdapter({
            baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
            customConfig: customConfigHeader(),
          })
        );
        const id = Array.isArray(param.id)
          ? parseInt(param.id[0])
          : parseInt(param.id);
        const result = await deleteHeritage(id);
        if (result.error) {
          toast.error(result.message);
          return;
        }
        toast.success(result.message);
        router.back();
      }
    },
  });

  const { data } = useQuery({
    queryKey: ["heritageDetail", param.id ?? 0],
    queryFn: async () => {
      if (param.id) {
        const { getHeritageDetail } = new HeritageUseCase(
          new HeritageApiAdapter({
            baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
            customConfig: customConfigHeader(),
          })
        );

        const id = Array.isArray(param.id)
          ? parseInt(param.id[0])
          : parseInt(param.id);
        const result = await getHeritageDetail(id);

        if (result.status === 401) {
          localStorage.removeItem("emma-user");
          router.push("/");
        }

        return result;
      }
    },
  });

  const onSubmit = (data: any) => {
    const formData = {
      ...data,
      badge_id: data.badge_id.value,
    };
    if (param.id) {
      mutationEdit.mutate(formData);
    } else {
      mutation.mutate(formData);
    }
  };

  const handleDelete = () => {
    mutationDelete.mutate()
  }

  useEffect(() => {
    const user = localStorage.getItem("emma-user");
    if(user) {
      const userjson = JSON.parse(user);
      setCurrencyOptions(userjson.currencies);
    }
    if (param.id) {
      setTitle("Edicion de Patrimonio");
    }
  }, []);

  useEffect(() => {
    if (data) {
      reset({...data, badge_id: {label: data.currency?.code, value: data.currency?.id}});
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

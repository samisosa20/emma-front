"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";

import { categorySchema } from "@/share/validation";
import type { CategorySchema } from "@/share/validation";

import {
  usePostApiCategories,
  usePutApiCategoriesId,
  useDeleteApiCategoriesId,
  useGetApiCategoriesIdSuspense,
} from "@@@/endpoints/category/category";
import { authClient } from "@/share/lib/auth-client";

export default function useCategoryCreateViewModel() {
  const router = useRouter();
  const param = useParams();
   const { data: session } = authClient.useSession();

  const [title, setTitle] = useState("Creacion de Categoría");
  const [groupsOptions, setGroupsOptions] = useState([]);

  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(categorySchema),
  });

  const mutation = usePostApiCategories();

  const mutationEdit = usePutApiCategoriesId();

  const mutationDelete = useDeleteApiCategoriesId();

  const { data } = useGetApiCategoriesIdSuspense(String(param.id), {
    query: {
      queryKey: ["categoryDetail", param.id ?? 0],
    },
  });

  const onSubmit = (data: CategorySchema) => {
    if (param.id) {
      const id = Array.isArray(param.id) ? param.id[0] : param.id;
      mutationEdit.mutate(
        {
          id,
          data,
        },
        {
          onSuccess: (result) => {
            toast.success(result.name);
            router.back();
          },
        }
      );
    } else {
      mutation.mutate(
        {
          data,
        },
        {
          onSuccess: (result) => {
            toast.success(result.name);
            router.back();
          },
        }
      );
    }
  };

  const handleDelete = () => {
    const id = Array.isArray(param.id) ? param.id[0] : param.id;
    if (id)
      mutationDelete.mutate({
        id,
      });
  };

  useEffect(() => {
    if (session?.user) {
      setGroupsOptions(
        session?.groupCategories?.map((g: any) => {
          return { value: g.id, label: g.name };
        })
      );
    }
    if (param.id) {
      setTitle("Edicion de Categoría");
    }
  }, []);

  useEffect(() => {
    if (data) {
      reset(data as any);
    }
  }, [data]);

  return {
    handleSubmit,
    onSubmit,
    control,
    title,
    groupsOptions,
    handleDelete,
    listCategories: [],
  };
}

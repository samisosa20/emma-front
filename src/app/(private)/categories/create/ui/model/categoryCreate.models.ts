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

  const { handleSubmit, control, reset, watch, setValue } = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      color: "#6bfe9c",
      icon: "category",
    }
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
    const payload = {
      ...data,
      groupId: typeof data.groupId === "object" && data.groupId ? (data.groupId as any).value : data.groupId,
    };
    if (param.id) {
      const id = Array.isArray(param.id) ? param.id[0] : param.id;
      mutationEdit.mutate(
        {
          id,
          data: payload as any,
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
          data: payload as any,
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
  }, [session, param.id]);

  useEffect(() => {
    if (data) {
      const resetData = { ...data } as any;
      if (data.groupId && groupsOptions.length > 0) {
        const matched = groupsOptions.find((g: any) => g.value === data.groupId);
        if (matched) {
          resetData.groupId = matched;
        }
      }
      reset(resetData);
    }
  }, [data, groupsOptions, reset]);

  return {
    handleSubmit,
    onSubmit,
    control,
    title,
    groupsOptions,
    handleDelete,
    listCategories: [],
    watch,
    setValue,
  };
}

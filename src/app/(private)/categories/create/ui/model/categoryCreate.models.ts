import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";

import { categorySchema } from "@/share/validation";
import type { CategorySchema } from "@/share/validation";

import {
  usePostApiV2Categories,
  usePutApiV2CategoriesId,
  useDeleteApiV2CategoriesId,
  useGetApiV2CategoriesIdSuspense,
} from "@@@/endpoints/category/category";

export default function useCategoryCreateViewModel() {
  const router = useRouter();
  const param = useParams();

  const [title, setTitle] = useState("Creacion de Categoría");
  const [groupsOptions, setGroupsOptions] = useState([]);

  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(categorySchema),
  });

  const mutation = usePostApiV2Categories();

  const mutationEdit = usePutApiV2CategoriesId();

  const mutationDelete = useDeleteApiV2CategoriesId();

  const { data } = useGetApiV2CategoriesIdSuspense(param.id ?? "", {
    query: {
      queryKey: ["categoryDetail", param.id ?? 0],
    },
  });

  const onSubmit = (data: CategorySchema) => {
    console.log(data);
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
    const user = localStorage.getItem("fiona-user");
    if (user) {
      const userjson = JSON.parse(user);
      setGroupsOptions(
        userjson.groupsCategory.map((g: any) => {
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
      reset(data);
    }
  }, [data]);

  return {
    handleSubmit,
    onSubmit,
    control,
    title,
    groupsOptions,
    handleDelete,
  };
}

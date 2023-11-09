import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';

import { categorySchema } from '@/share/validation';
import type { CategorySchema } from '@/share/validation';

import { CategoryUseCase } from '@@/application/category.use-case';
import { CategoryApiAdapter } from '@@/infrastructure/category-api.adapter';

import { customConfigHeader } from '@/share/helpers';

export default function useCategoryCreateViewModel() {
  const router = useRouter();
  const param = useParams();

  const [title, setTitle] = useState('Creacion de Categoria');
  const [groupsOptions, setGroupsOptions] = useState([]);

  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(categorySchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: CategorySchema) => {
      const user = localStorage.getItem('fiona-user');
      if (user) {
        const { createCategory } = new CategoryUseCase(
          new CategoryApiAdapter({
            baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
            customConfig: customConfigHeader(),
          })
        );
        const result = await createCategory(data);
        if (result.error) {
          console.log(result);
          toast.error(result.message);
          return;
        }
        toast.success(result.message);
        router.back();
      }
    },
  });

  const mutationEdit = useMutation({
    mutationFn: async (data: CategorySchema) => {
      const user = localStorage.getItem('fiona-user');
      if (user) {
        const { editCategory } = new CategoryUseCase(
          new CategoryApiAdapter({
            baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
            customConfig: customConfigHeader(),
          })
        );
        const id = Array.isArray(param.id)
          ? parseInt(param.id[0])
          : parseInt(param.id);
        const result = await editCategory(id, data);
        if (result.error) {
          console.log(result);
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
      const user = localStorage.getItem('fiona-user');
      if (user) {
        const { deleteCategory } = new CategoryUseCase(
          new CategoryApiAdapter({
            baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
            customConfig: customConfigHeader(),
          })
        );
        const id = Array.isArray(param.id)
          ? parseInt(param.id[0])
          : parseInt(param.id);
        const result = await deleteCategory(id);
        if (result.error) {
          console.log(result);
          toast.error(result.message);
          return;
        }
        toast.success(result.message);
        router.back();
      }
    },
  });

  const { data } = useQuery({
    queryKey: ['categoryDetail', param.id ?? 0],
    queryFn: async () => {
      if (param.id) {
        const { getCategoryDetail } = new CategoryUseCase(
          new CategoryApiAdapter({
            baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
            customConfig: customConfigHeader(),
          })
        );

        const id = Array.isArray(param.id)
          ? parseInt(param.id[0])
          : parseInt(param.id);
        const result = await getCategoryDetail(id);

        if (result.status === 401) {
          localStorage.removeItem("fiona-user");
          router.push('/login');
        }

        return result;
      }
    },
  });

  const { data: listCategories } = useQuery({
    queryKey: ['listCategories'],
    queryFn: async () => {
      const { listSelectCategories } = new CategoryUseCase(
        new CategoryApiAdapter({
          baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
          customConfig: customConfigHeader(),
        })
      );

      const result = await listSelectCategories();

      if (!Array.isArray(result)) {
        localStorage.removeItem("fiona-user");
        router.push('/login');
      }

      return result;
    },
  });

  const onSubmit = (data: any) => {
    const formData = {
      ...data,
    };
    if (param.id) {
      mutationEdit.mutate(formData);
    } else {
      mutation.mutate(formData);
    }
  };

  const handleDelete = () => {
    mutationDelete.mutate();
  };

  useEffect(() => {
    const user = localStorage.getItem('fiona-user');
    if (user) {
      const userjson = JSON.parse(user);
      setGroupsOptions(userjson.groups_category);
    }
    if (param.id) {
      setTitle('Edicion de Categoria');
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
    listCategories,
  };
}

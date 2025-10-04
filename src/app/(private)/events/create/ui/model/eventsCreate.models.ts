import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";

import { eventSchema } from "@/share/validation";

import {
  usePostApiV2Events,
  usePutApiV2EventsId,
  useGetApiV2EventsId,
} from "@@@/endpoints/event/event";

const useEventCreate = () => {
  const router = useRouter();
  const param = useParams();

  const [title, setTitle] = useState("Creacion de eventos");
  const [listMovements, setListMovements] = useState<any>([]);
  const [listCategories, setListCategories] = useState<any>([]);

  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(eventSchema),
  });

  const mutation = usePostApiV2Events();

  const mutationEdit = usePutApiV2EventsId();

  const { data, refetch } = useGetApiV2EventsId(String(param.id));

  const onSubmit = (data: any) => {
    const formData = {
      ...data,
    };
    if (param.id) {
      mutationEdit.mutate(
        {
          data: formData,
          id: String(param.id),
        },
        {
          onSuccess: () => {
            toast.success("Evento editado con exito");
            router.back();
          },
          onError: (error) => {
            toast.error(error.message);
            router.back();
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
            toast.success("Evento creado con exito");
            router.back();
          },
          onError: (error) => {
            toast.error(error.message);
            router.back();
          },
        }
      );
    }
  };

  useEffect(() => {
    refetch();
    if (param.id) {
      setTitle("Edicion de eventos");
    }
  }, []);

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        endEvent: data?.endEvent?.split("T")[0],
      });
      setListMovements(data.movements);
      setListCategories(data.categories);
    }
  }, [data]);

  return {
    handleSubmit,
    onSubmit,
    control,
    title,
    listMovements,
    listCategories,
  };
};

export default useEventCreate;

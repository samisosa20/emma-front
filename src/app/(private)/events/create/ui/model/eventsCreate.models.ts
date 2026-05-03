import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";

import { eventSchema } from "@/share/validation";

import {
  usePostApiEvents,
  usePutApiEventsId,
  useGetApiEventsId,
} from "@@@/endpoints/event/event";

const useEventCreate = () => {
  const router = useRouter();
  const param = useParams();

  const [title, setTitle] = useState("Creacion de eventos");
  const [listMovements, setListMovements] = useState<any>([]);
  const [listCategories, setListCategories] = useState<any>([]);

  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      name: "",
      type: "",
      endEvent: "",
    },
  });

  const mutation = usePostApiEvents();

  const mutationEdit = usePutApiEventsId();

  const { data, refetch } = useGetApiEventsId(String(param?.id || ""), {
    query: {
      enabled: !!param?.id,
    },
  });

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
        type: data.type,
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
    data,
  };
};

export default useEventCreate;

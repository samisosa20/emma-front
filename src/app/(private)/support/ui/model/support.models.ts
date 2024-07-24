import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { SupportUseCase } from "@@/application/support.use-case";
import { SupportApiAdapter } from "@@/infrastructure/support-api.adapter";

import { supportSchema } from "@/share/validation";
import type { SupportSchema } from "@/share/validation";
import { customConfigHeader } from "@/share/helpers";

export default function useSupportViewModel() {
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(supportSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: SupportSchema) => {
      const user = localStorage.getItem("emma-user");
      if (user) {
        const { postSupport } = new SupportUseCase(
          new SupportApiAdapter({
            baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
            customConfig: customConfigHeader(),
          })
        );
        const result = await postSupport(data);
        setIsLoading(false);
        reset({
          subject: "",
          message: "",
        });
        if (result.error) {
          toast.error(result.message);
          return;
        }
        toast.success(result.message);
      }
    },
  });

  const onSubmit = (data: any) => {
    setIsLoading(true);
    mutation.mutate(data);
  };

  return {
    control,
    onSubmit,
    handleSubmit,
    isLoading,
  };
}

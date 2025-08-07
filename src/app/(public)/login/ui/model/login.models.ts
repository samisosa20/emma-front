import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { loginSchema } from "@/share/validation";
import type { LoginSchema } from "@/share/validation";

import { AuthUseCase } from "@@/application/auth.use-case";
import { usePostApiV2AuthLogin } from "@@@/endpoints/auth/auth";

export default function useLogin() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remind: false,
    },
  });

  const mutation = usePostApiV2AuthLogin();

  const onSubmit: SubmitHandler<LoginSchema> = (data) => {
    setIsSubmitting(true);
    if (data.remind) {
      localStorage.setItem("remind", data.email);
    } else {
      localStorage.removeItem("remind");
    }
    mutation.mutate(
      { data },
      {
        onSuccess: async (result) => {
          const { data, ...res } = result;
          localStorage.setItem(
            "fiona-user",
            JSON.stringify({ ...res, ...data })
          );
          router.push("/dashboard");
        },
      }
    );
  };

  useEffect(() => {
    const user = localStorage.getItem("fiona-user");
    const remind = localStorage.getItem("remind");
    if (user) {
      const token = JSON.parse(user).token;
      if (token) {
        router.push("/dashboard");
      }
    }
    if (remind) {
      reset({
        email: remind,
        remind: true,
      });
    }
  }, []);
  return {
    handleSubmit,
    onSubmit,
    control,
    isSubmitting,
  };
}

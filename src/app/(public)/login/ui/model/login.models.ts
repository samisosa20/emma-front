import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { loginSchema } from "@/share/validation";
import type { LoginSchema } from "@/share/validation";

import { usePostApiV2AuthLogin } from "@@@/endpoints/auth/auth";
import { useUserStore } from "@/share/storage";

export default function useLogin() {
  const router = useRouter();
  const { setLoginData, token, user } = useUserStore();

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
          setLoginData(result);
          router.push("/dashboard");
        },
        onError: (error) => {
          toast.error(error.message);
          setIsSubmitting(false);
        },
      }
    );
  };

  useEffect(() => {
    const remind = localStorage.getItem("remind");
    if (user) {
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

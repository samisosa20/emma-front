import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { AuthUseCase } from "@@/application/auth.use-case";
import { AuthApiAdapter } from "@@/infrastructure/auth-api.adapter";

import { customConfigHeader } from "@/share/helpers";
import { paramsProfileSchema, destroyAccountSchema } from "@/share/validation";
import type {
  ParamsProfileSchema,
  DestroyAccountSchema,
} from "@/share/validation";

import { useGetApiAuthProfileSuspense } from "@@@/endpoints/auth/auth";
import { useUserStore } from "@/share/storage";

export default function useProfileViewModel() {
  const router = useRouter();
  const { badges, user, logout } = useUserStore();

  const [currencyOptions, setCurrencyOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [isOpen, setIsOpen] = useState(false);
  const [verify, setVerify] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(paramsProfileSchema),
  });

  const {
    handleSubmit: handleSubmitDestroy,
    control: controlDestroy,
    setError,
  } = useForm({
    resolver: zodResolver(destroyAccountSchema),
  });

  const { isLoading, data, isError } = useGetApiAuthProfileSuspense();

  const mutation = useMutation({
    mutationFn: async (data: ParamsProfileSchema) => {
      const user = localStorage.getItem("fiona-user");
      if (user) {
        const { updateProfile } = new AuthUseCase(
          new AuthApiAdapter({
            baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
            customConfig: customConfigHeader(),
          })
        );
        const result = await updateProfile(0, data);
        if (result.error) {
          toast.error(result.message);
          setIsSubmitting(true);
          return;
        }
        const profile = JSON.parse(localStorage.getItem("fiona-user") ?? "{}");
        profile.name = data.name;
        profile.currency = Number(data.badgeId);
        localStorage.setItem("fiona-user", JSON.stringify(profile));
        toast.success(result.message);
      }
    },
  });

  const mutationDestroy = useMutation({
    mutationFn: async () => {
      const user = localStorage.getItem("fiona-user");
      if (user) {
        const { destroyProfile } = new AuthUseCase(
          new AuthApiAdapter({
            baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
            customConfig: customConfigHeader(),
          })
        );
        const result = await destroyProfile();
        if (result.error) {
          toast.error(result.message);
          setIsSubmitting(true);
          return;
        }
        toast.success(result.message);
        localStorage.removeItem("fiona-user");
        router.push("/login");
      }
    },
  });

  const mutationResendVerify = useMutation({
    mutationFn: async () => {
      const { postResendVerify } = new AuthUseCase(
        new AuthApiAdapter({
          baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
          customConfig: customConfigHeader(),
        })
      );
      const result = await postResendVerify();

      if (result.error) {
        toast.error(result.message);
        setIsSubmitting(false);
        return;
      }
      setIsSubmitting(false);
      toast.success(result.message);
    },
  });

  const onSubmitDestroy = (data: DestroyAccountSchema) => {
    if (data.email !== user?.email) {
      setError("email", {
        type: "custom",
        message: "El texto ingresado no coincide con el solicitado",
      });
    } else {
      setIsSubmitting(true);
      mutationDestroy.mutate();
    }
  };

  const onSubmit = (data: any) => {
    setIsSubmitting(true);
    mutation.mutate({
      name: data.name,
      badge_id: data.badge_id,
      ...(data.password && data.password !== "" && { password: data.password }),
    });
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  const handeResendVerify = () => {
    setIsSubmitting(true);
    mutationResendVerify.mutate();
  };

  useEffect(() => {
    if (isError) router.push("/login");
  }, [isError]);

  useEffect(() => {
    if (user) {
      setVerify(!!user?.confirmedEmailAt);
      setCurrencyOptions(
        badges?.map((v) => {
          return {
            label: String(v.code),
            value: String(v.id),
          };
        })
      );
    }
  }, []);

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data]);

  return {
    data,
    isLoading,
    currencyOptions,
    control,
    handleSubmit,
    onSubmit,
    handleLogout,
    isOpen,
    handleClose,
    controlDestroy,
    onSubmitDestroy,
    handleSubmitDestroy,
    user,
    verify,
    handeResendVerify,
    isSubmitting,
  };
}

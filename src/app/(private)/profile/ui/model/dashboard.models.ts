import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { useRouter } from "next/navigation";
import { AuthUseCase } from "@@/application/auth.use-case";
import { AuthApiAdapter } from "@@/infrastructure/auth-api.adapter";

import { customConfigHeader } from "@/share/helpers";

import { paramsProfileSchema } from "@/share/validation";
import type { ParamsProfileSchema } from "@/share/validation";

export default function useDashboardViewModel() {
  const router = useRouter();
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [idProfile, setIdProfile] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(paramsProfileSchema),
  });

  const { handleSubmit: handleSubmitDestroy, control: controlDestroy } =
    useForm({
      resolver: zodResolver(paramsProfileSchema),
    });

  const { isLoading, data, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { getProfile } = new AuthUseCase(
        new AuthApiAdapter({
          baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
          customConfig: customConfigHeader(),
        })
      );

      const result = await getProfile();

      if (result.error) {
        localStorage.removeItem("emma-user");
        router.push("/login");
      }

      return result;
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ParamsProfileSchema) => {
      const user = localStorage.getItem("emma-user");
      if (user) {
        const { updateProfile } = new AuthUseCase(
          new AuthApiAdapter({
            baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
            customConfig: {
              headers: {
                Authorization: `Bearer ${JSON.parse(user).token}`,
              },
            },
          })
        );
        const result = await updateProfile(idProfile, data);
        console.log(result);
        if (result.error) {
          toast.error(result.message);
          return;
        }
        const profile = JSON.parse(localStorage.getItem("emma-user") ?? "{}");
        profile.name = data.name;
        profile.currency = Number(data.badge_id);
        localStorage.setItem("emma-user", JSON.stringify(profile));
        toast.success(result.message);
      }
    },
  });

  const onSubmitDestroy = () => {};

  const onSubmit = (data: any) => {
    mutation.mutate({
      name: data.name,
      badge_id: data.badge_id,
      ...(data.password && data.password !== "" && { password: data.password }),
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("emma-user");
    router.push("/login");
  };

  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isError) router.push("/login");
  }, [isError]);

  useEffect(() => {
    const user = localStorage.getItem("emma-user");
    if (user) {
      const userjson = JSON.parse(user);
      setCurrencyOptions(userjson.currencies);
    }
  }, []);

  useEffect(() => {
    if (data) {
      setIdProfile(data.id);
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
  };
}

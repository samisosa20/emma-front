import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

import { customConfigHeader } from "@/share/helpers";

import { AuthUseCase } from "@@/application/auth.use-case";
import { AuthApiAdapter } from "@@/infrastructure/auth-api.adapter";

export default function useVerify() {
  const router = useRouter();
  const params = useSearchParams();

  const id = params.get("i");
  const hash = params.get("h");
  const expires = params.get("e");
  const signature = params.get("s");

  const mutation = useMutation({
    mutationFn: async () => {
      const { getVerifyEmail } = new AuthUseCase(
        new AuthApiAdapter({
          baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
          customConfig: customConfigHeader(),
        })
      );
      if (id && hash && expires && signature) {
        const result = await getVerifyEmail(id, hash, expires, signature);

        if (result.error) {
          toast.error(result.message);
          return;
        }

        toast.success(result.message);
        const user = localStorage.getItem("fiona-user");
        if (user) {
          const userjson = JSON.parse(user);
          userjson.verify_email = true;
          localStorage.setItem("fiona-user", JSON.stringify(userjson));
          router.push("/dashboard");
        }
      }
    },
  });

  useEffect(() => {
    if (!id || !hash || !expires || !signature) {
      router.push("/login");
    } else {
      mutation.mutate();
    }
  }, []);

  return {};
}

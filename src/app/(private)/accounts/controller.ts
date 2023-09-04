import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { AccountUseCase } from "../../../../package/fiona/application/account.use-case";
import { AccountApiAdapter } from "../../../../package/fiona/infrastructure/account-api.adapter";

const useAccounts = () => {
  const router = useRouter();

  const {isLoading, isError, data, error} = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
        const user = localStorage.getItem("user")
        if (user) {
            const { listAccounts } = new AccountUseCase(
              new AccountApiAdapter({
                baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
                customConfig: {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(user).token}`
                  }
                }
              })
            );
            const result = await listAccounts();
            return result;
        }
    },
  });

  console.log(data)

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      localStorage.clear();
      router.push("/");
    }
  }, []);
  return {
    data,
    isLoading,
  };
};

export default useAccounts;

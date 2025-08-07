import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { driverAccount } from "@/share/helpers";

import { useGetApiV2AccountsSuspense } from "@@@/endpoints/account/account";

const useAccounts = () => {
  const router = useRouter();

  const [isChecked, setIsChecked] = useState(true);
  const [search, setSearch] = useState("");

  const { isLoading, data, isError, refetch } = useGetApiV2AccountsSuspense();

  const handleDrive = () => {
    driverAccount();
  };

  const handleToggle = () => {
    setSearch("");
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    refetch();
    if (isError) router.push("/login");
  }, [isError, router]);
  return {
    data,
    isLoading,
    handleToggle,
    isChecked,
    search,
    setSearch,
    handleDrive,
  };
};

export default useAccounts;

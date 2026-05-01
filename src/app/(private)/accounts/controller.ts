import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { driverAccount } from "@/share/helpers";

import { useGetApiAccountsSuspense } from "@@@/endpoints/account/account";
import { useGetApiReportsGeneralBalanceSuspense } from "@@@/endpoints/report/report";

const useAccounts = () => {
  const router = useRouter();

  const [isChecked, setIsChecked] = useState(true);
  const [search, setSearch] = useState("");

  const { isLoading, data, isError, refetch } = useGetApiAccountsSuspense();
  const { data: dataBalance, refetch: refetchBalance } =
    useGetApiReportsGeneralBalanceSuspense();

  const handleDrive = () => {
    driverAccount();
  };

  const handleToggle = () => {
    setSearch("");
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    refetch();
    refetchBalance();
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
    dataBalance,
  };
};

export default useAccounts;

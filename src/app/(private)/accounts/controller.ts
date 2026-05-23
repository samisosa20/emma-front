import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

import { driverAccount } from "@/share/helpers";

import { useGetApiAccountsSuspense } from "@@@/endpoints/account/account";
import { useGetApiReportsGeneralBalanceSuspense } from "@@@/endpoints/report/report";

const useAccounts = () => {
  const router = useRouter();

  const [isChecked, setIsChecked] = useState(true);
  const [search, setSearch] = useState("");

  const { isLoading, data, isError, refetch } = useGetApiAccountsSuspense({
    deleted: '1'
  });
  const { data: dataBalance, refetch: refetchBalance } =
    useGetApiReportsGeneralBalanceSuspense();

  const handleDrive = () => {
    driverAccount();
  };

  /**
   * ⚡ Bolt Optimization: Stabilize toggle function reference.
   */
  const handleToggle = useCallback(() => {
    setSearch("");
    setIsChecked((prev) => !prev);
  }, []);

  useEffect(() => {
    refetch();
    refetchBalance();
    if (isError) router.push("/login");
  }, [isError, router, refetch, refetchBalance]);

  /**
   * ⚡ Bolt Optimization: Memoize filtered accounts.
   * 🎯 Problem: O(n) filtering on every render (e.g. while typing).
   * 📊 Impact: Skips filtering unless data, search, or status changes.
   */
  const filteredAccounts = useMemo(() => {
    return (
      data?.content?.filter((account: any) => {
        const matchesSearch =
          search === "" ||
          account?.name?.toUpperCase()?.includes(search?.toUpperCase());

        const matchesStatus = isChecked
          ? account?.deletedAt === ""
          : account?.deletedAt !== "";

        return matchesSearch && matchesStatus;
      }) || []
    );
  }, [data?.content, search, isChecked]);

  return {
    data,
    isLoading,
    handleToggle,
    isChecked,
    search,
    setSearch,
    handleDrive,
    dataBalance,
    filteredAccounts,
  };
};

export default useAccounts;

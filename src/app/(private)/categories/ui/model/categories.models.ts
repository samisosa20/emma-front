import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

import { useGetApiCategoriesSuspense } from "@@@/endpoints/category/category";

export default function useCategoriesViewModel() {
  const router = useRouter();

  const [isChecked, setIsChecked] = useState(true);
  const [search, setSearch] = useState("");

  const { isLoading, data, isError, refetch } = useGetApiCategoriesSuspense();

  /**
   * ⚡ Bolt Optimization: Stabilize toggle function reference.
   */
  const handleToggle = useCallback(() => {
    setSearch("");
    setIsChecked((prev) => !prev);
  }, []);

  useEffect(() => {
    refetch();
    if (isError) router.push("/login");
  }, [isError, router, refetch]);

  /**
   * ⚡ Bolt Optimization: Memoize filtered categories.
   * 🎯 Problem: O(n) filtering on every render (e.g. while typing).
   * 📊 Impact: Skips filtering unless data, search, or status changes.
   */
  const filteredCategories = useMemo(() => {
    return (
      data?.content?.filter((category: { name: string; deletedAt: string | null }) => {
        const matchesSearch =
          search === "" ||
          category?.name?.toLowerCase()?.includes(search?.toLowerCase());

        const matchesStatus = isChecked
          ? !category?.deletedAt
          : !!category?.deletedAt;

        return matchesSearch && matchesStatus;
      }) || []
    );
  }, [data?.content, search, isChecked]);

  return {
    data,
    isLoading,
    setSearch,
    handleToggle,
    search,
    isChecked,
    filteredCategories,
  };
}

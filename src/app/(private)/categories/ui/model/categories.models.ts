import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useGetApiCategoriesSuspense } from "@@@/endpoints/category/category";

export default function useCategoriesViewModel() {
  const router = useRouter();

  const [isChecked, setIsChecked] = useState(true);
  const [search, setSearch] = useState("");

  const { isLoading, data, isError, refetch } = useGetApiCategoriesSuspense();

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
    setSearch,
    handleToggle,
    search,
    isChecked,
  };
}

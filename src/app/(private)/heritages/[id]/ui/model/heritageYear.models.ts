import { useEffect, useState, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";

import { useGetApiHeritagesSuspense } from "@@@/endpoints/heritage/heritage";

const useHeritageYear = () => {
  const param = useParams();

  const router = useRouter();

  const [search, setSearch] = useState("");

  const { isLoading, data: rawData, isError } = useGetApiHeritagesSuspense({
    year: Number(param.id),
  });

  useEffect(() => {
    if (isError) router.push("/login");
  }, [isError, router]);

  const data = useMemo(() => {
    if (!rawData) return rawData;
    return {
      ...rawData,
      balances: (rawData.balances || []).filter(
        (b: any) =>
          b.amount !== null &&
          b.amount !== undefined &&
          Math.abs(Number(b.amount)) > 0.0001
      ),
    };
  }, [rawData]);

  return {
    data,
    isLoading,
    search,
    setSearch,
  };
};

export default useHeritageYear;

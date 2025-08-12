import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

import { useGetApiV2HeritagesSuspense } from "@@@/endpoints/heritage/heritage";

const useHeritageYear = () => {
  const param = useParams();

  const router = useRouter();

  const [search, setSearch] = useState("");

  const { isLoading, data, isError, refetch } = useGetApiV2HeritagesSuspense({
    year: Number(param.id),
  });

  useEffect(() => {
    refetch();
    if (isError) router.push("/login");
  }, [isError]);

  return {
    data,
    isLoading,
    search,
    setSearch,
  };
};

export default useHeritageYear;

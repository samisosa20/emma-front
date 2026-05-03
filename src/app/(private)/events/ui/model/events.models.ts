import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { useGetApiEventsSuspense } from "@@@/endpoints/event/event";

const useEvents = () => {
  const router = useRouter();
  const { isLoading, data, isError, refetch } = useGetApiEventsSuspense();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    refetch();
    if (isError) router.push("/login");
  }, [isError, refetch, router]);

  const activeEvents = data?.content || [];
  
  const filteredEvents = activeEvents.filter((event) => {
    if (debouncedSearch.length >= 3) {
      return event.name?.toLowerCase().includes(debouncedSearch.toLowerCase());
    }
    return true;
  });

  return {
    data,
    isLoading,
    search,
    setSearch,
    debouncedSearch,
    filteredEvents,
  };
};

export default useEvents;

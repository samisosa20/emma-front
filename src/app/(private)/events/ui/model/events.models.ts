import { useEffect, useState, useMemo } from "react";

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

  /**
   * ⚡ Bolt Optimization: Memoize filtered events
   * 🎯 Problem: Filtering logic was running on every keystroke of the search input,
   *    even before the debounce timer finished.
   * 📊 Impact: Prevents O(n) filtering on every render during typing.
   */
  const filteredEvents = useMemo(() => {
    const activeEvents = data?.content || [];
    if (debouncedSearch.length >= 3) {
      const searchLower = debouncedSearch.toLowerCase();
      return activeEvents.filter((event) =>
        event.name?.toLowerCase().includes(searchLower),
      );
    }
    return activeEvents;
  }, [data, debouncedSearch]);

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

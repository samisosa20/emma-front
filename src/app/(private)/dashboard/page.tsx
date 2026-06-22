"use client";
//components
import useComponents from "@/share/components";
import Dashboard from "./ui/view/Dashboard";

import useDashboardViewModel from "./ui/model/dashboard.models";

export default function Page() {
  const { isLoading, ...props } = useDashboardViewModel();
  const { Loading } = useComponents();

  if (isLoading) {
    return <Loading />;
  }

  return <Dashboard {...props} />;
}


"use client";
//components
import useComponents from "@/share/components";
import Budgets from './ui/view/Budgets';

import useBudgetsViewModel from './ui/model/budgets.models';

const Page = () => {
  const { data, isLoading } = useBudgetsViewModel();

  const { Loading } = useComponents();

  if (isLoading) {
    return <Loading/>;
  }

  return <Budgets data={data} />;
};

export default Page;

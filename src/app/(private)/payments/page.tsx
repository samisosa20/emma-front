
"use client";
//components
import useComponents from "@/share/components";
import Payments from './ui/view/Payments';

import usePaymentsViewModel from './ui/model/payments.models';

const Page = () => {
  const { data, isLoading } = usePaymentsViewModel();

  const { Loading } = useComponents();

  if (isLoading) {
    return <Loading/>;
  }

  return <Payments data={data} />;
};

export default Page;

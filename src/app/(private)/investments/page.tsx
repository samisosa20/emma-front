
"use client";
//components
import useComponents from "@/share/components";
import Investments from './ui/view/Investments';

import useInvestmentsViewModel from './ui/model/investments.models';

const Page = () => {
  const { data, isLoading } = useInvestmentsViewModel();

  const { Typography } = useComponents();

  if (isLoading) {
    return <Typography>Cargando...</Typography>;
  }

  return <Investments data={data} />;
};

export default Page;

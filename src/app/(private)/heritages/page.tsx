
"use client";
//components
import useComponents from "@/share/components";
import Heritages from './ui/view/Heritages';

import useHeritagesViewModel from './ui/model/heritages.models';

const Page = () => {
  const { data, isLoading } = useHeritagesViewModel();

  const { Typography } = useComponents();

  if (isLoading) {
    return <Typography>Cargando...</Typography>;
  }

  return <Heritages data={data} />;
};

export default Page;

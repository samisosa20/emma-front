
"use client";
//components
import useComponents from "@/share/components";
import Events from './ui/view/Events';

import useEvents from './ui/model/events.models';

const Page = () => {
  const { data, isLoading } = useEvents();

  const { Typography } = useComponents();

  if (isLoading) {
    return <Typography>Cargando...</Typography>;
  }

  return <Events data={data} />;
};

export default Page;

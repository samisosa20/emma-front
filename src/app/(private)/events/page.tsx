
"use client";
//components
import useComponents from "@/share/components";
import Events from './ui/view/Events';

import useEvents from './ui/model/events.models';

const Page = () => {
  const { data, isLoading } = useEvents();

  const { Loading } = useComponents();

  if (isLoading) {
    return <Loading/>;
  }

  return <Events data={data} />;
};

export default Page;

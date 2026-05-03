
"use client";
//components
import useComponents from "@/share/components";
import Events from './ui/view/Events';

import useEvents from './ui/model/events.models';

const Page = () => {
  const modelProps = useEvents();

  const { Loading } = useComponents();

  if (modelProps.isLoading) {
    return <Loading/>;
  }

  return <Events {...modelProps} />;
};

export default Page;

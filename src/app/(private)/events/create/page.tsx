'use client';
import EventsCreate from './ui/view/EventsCreate';

import useEventCreate from './ui/model/eventsCreate.models';

const Page = () => {
  const {
    handleSubmit,
    onSubmit,
    control,
    title,
  } = useEventCreate();
  return (
    <EventsCreate
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      control={control}
      title={title}
    />
  );
};

export default Page;

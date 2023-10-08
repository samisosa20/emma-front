'use client';
import EventCreate from '@/app/(private)/events/create/ui/view/EventsCreate';

import useEventCreate from '@/app/(private)/events/create/ui/model/eventsCreate.models';

const Page = () => {
  const { handleSubmit, onSubmit, control, title, listMovements, listCategories } = useEventCreate();

  return (
    <EventCreate
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      control={control}
      title={title}
      listMovements={listMovements}
      listCategories={listCategories}
    />
  );
};

export default Page;

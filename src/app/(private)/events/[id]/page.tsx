"use client";
import EventsDetail from "@/app/(private)/events/[id]/ui/view/EventsDetail";
import useEventCreate from "@/app/(private)/events/create/ui/model/eventsCreate.models";

const Page = () => {
  const {
    handleSubmit,
    onSubmit,
    control,
    title,
    listMovements,
    listCategories,
    data,
  } = useEventCreate();

  return (
    <EventsDetail
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      control={control}
      title={title}
      listMovements={listMovements}
      listCategories={listCategories}
      data={data}
    />
  );
};

export default Page;

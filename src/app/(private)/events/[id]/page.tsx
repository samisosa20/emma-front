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
    onDelete,
  } = useEventCreate();

  return (
    <EventsDetail
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      onDelete={onDelete}
      control={control}
      title={title}
      listMovements={listMovements}
      listCategories={listCategories}
      data={data}
    />
  );
};

export default Page;

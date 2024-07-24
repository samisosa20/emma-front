'use client';

//components
import Movements from '../ui/view/Movements';

import useMovementsViewModel from '../ui/model/movements.models';

const Page = () => {
  const {
    handleSubmit,
    onSubmit,
    control,
    listAccounts,
    listCategories,
    listEvents,
    listInvestments,
    title,
    handleDelete,
    typeWatch,
    accountEndWatch,
    accountWatch,
    investmentWatch,
    isSubmitting,
  } = useMovementsViewModel();

  return (
    <Movements
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      control={control}
      title={title}
      listAccounts={listAccounts}
      listCategories={listCategories}
      listEvents={listEvents}
      listInvestments={listInvestments}
      handleDelete={handleDelete}
      typeWatch={typeWatch}
      accountWatch={accountWatch}
      accountEndWatch={accountEndWatch}
      investmentWatch={investmentWatch}
      isSubmitting={isSubmitting}
    />
  );
};

export default Page;

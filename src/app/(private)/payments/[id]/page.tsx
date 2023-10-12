'use client';
import PaymentsCreate from '@/app/(private)/payments/create/ui/view/PaymentsCreate';

import usePaymentsCreateViewModel from '@/app/(private)/payments/create/ui/model/paymentsCreate.models';

const Page = () => {
  const {
    handleSubmit,
    onSubmit,
    control,
    title,
    listAccounts,
    listCategories,
    handleDelete,
  } = usePaymentsCreateViewModel();

  return (
    <PaymentsCreate
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      control={control}
      title={title}
      listAccounts={listAccounts}
      listCategories={listCategories}
      handleDelete={handleDelete}
    />
  );
};

export default Page;

'use client';
import PaymentsCreate from './ui/view/PaymentsCreate';

import usePaymentsCreateViewModel from './ui/model/paymentsCreate.models';

const Page = () => {
  const {
    handleSubmit,
    onSubmit,
    control,
    title,
    listAccounts,
    listCategories,
  } = usePaymentsCreateViewModel();
  return (
    <PaymentsCreate
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      control={control}
      title={title}
      listAccounts={listAccounts}
      listCategories={listCategories}
    />
  );
};

export default Page;

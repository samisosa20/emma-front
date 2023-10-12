'use client';
import PaymentsCreate from '@/app/(private)/payments/create/ui/view/PaymentsCreate';

import usePaymentsCreateViewModel from '@/app/(private)/payments/create/ui/model/paymentsCreate.models';

const Page = () => {
  const { handleSubmit, onSubmit, control, title, listMovements, currencyOptions, handleDelete } = usePaymentsCreateViewModel();

  return (
    <PaymentsCreate
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      control={control}
      title={title}
      listMovements={listMovements}
      currencyOptions={currencyOptions}
      handleDelete={handleDelete}
    />
  );
};

export default Page;

'use client';
import InvestmentsCreate from '@/app/(private)/investments/create/ui/view/InvestmentsCreate';

import useInvestmentsCreateViewModel from '@/app/(private)/investments/create/ui/model/investmentsCreate.models';

const Page = () => {
  const { handleSubmit, onSubmit, control, title, listMovements, currencyOptions, handleDelete } = useInvestmentsCreateViewModel();

  return (
    <InvestmentsCreate
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

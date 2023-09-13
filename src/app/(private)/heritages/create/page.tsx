'use client';
import InvestmentsCreate from './ui/view/InvestmentsCreate';

import investmentsCreateViewModel from './ui/model/investmentsCreate.models';

const Page = () => {
  const {
    handleSubmit,
    onSubmit,
    control,
    title,
    currencyOptions,
  } = investmentsCreateViewModel();
  return (
    <InvestmentsCreate
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      control={control}
      title={title}
      currencyOptions={currencyOptions}
    />
  );
};

export default Page;

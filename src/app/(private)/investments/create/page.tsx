'use client';
import InvestmentsCreate from './ui/view/InvestmentsCreate';

import useInvestmentsCreateViewModel from './ui/model/investmentsCreate.models';

const Page = () => {
  const {
    handleSubmit,
    onSubmit,
    control,
    title,
    currencyOptions,
  } = useInvestmentsCreateViewModel();
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

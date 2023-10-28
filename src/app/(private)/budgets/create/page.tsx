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
    onSubmitAppre,
    handleSubmitAppre,
    controlAppre,
    listAppretiations,
  } = useInvestmentsCreateViewModel();
  return (
    <InvestmentsCreate
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      control={control}
      title={title}
      currencyOptions={currencyOptions}
      onSubmitAppre={onSubmitAppre}
      handleSubmitAppre={handleSubmitAppre}
      controlAppre={controlAppre}
      listAppretiations={listAppretiations}
    />
  );
};

export default Page;

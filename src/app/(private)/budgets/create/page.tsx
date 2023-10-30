'use client';
import BudgetCreate from './ui/view/BudgetCreate';

import useBudgetsCreateViewModel from './ui/model/budgetsCreate.models';

const Page = () => {
  const {
    handleSubmit,
    onSubmit,
    control,
    title,
    currencyOptions,
    periodsOptions,
    listCategories,
  } = useBudgetsCreateViewModel();
  return (
    <BudgetCreate
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      control={control}
      title={title}
      currencyOptions={currencyOptions}
      periodsOptions={periodsOptions}
      listCategories={listCategories}
    />
  );
};

export default Page;

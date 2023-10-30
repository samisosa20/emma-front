'use client';
import BudgetCreate from '@/app/(private)/budgets/create/ui/view/BudgetCreate';

import useBudgetsCreateViewModel from '@/app/(private)/budgets/create/ui/model/budgetsCreate.models';

const Page = () => {
  const {
    handleSubmit,
    onSubmit,
    control,
    title,
    currencyOptions,
    handleDelete,
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
      handleDelete={handleDelete}
      listCategories={listCategories}
    />
  );
};

export default Page;

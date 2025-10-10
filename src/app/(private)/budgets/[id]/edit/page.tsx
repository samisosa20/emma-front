"use client";
import BudgetCreate from "@/app/(private)/budgets/create/ui/view/BudgetCreate";

import useBudgetCreate from "@/app/(private)/budgets/create/ui/model/budgetsCreate.models";

const Page = () => {
  const {
    handleSubmit,
    onSubmit,
    control,
    title,
    currencyOptions,
    periodsOptions,
    listCategories,
    handleDelete,
    isLoading,
  } = useBudgetCreate();

  return (
    <BudgetCreate
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      control={control}
      title={title}
      currencyOptions={currencyOptions}
      periodsOptions={periodsOptions}
      listCategories={listCategories}
      handleDelete={handleDelete}
      isLoading={isLoading}
    />
  );
};

export default Page;

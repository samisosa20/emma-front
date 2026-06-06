"use client";
import PaymentsCreate from "./ui/view/PaymentsCreate";

import usePaymentsCreateViewModel from "./ui/model/paymentsCreate.models";

const Page = () => {
  const {
    handleSubmit,
    onSubmit,
    control,
    title,
    listAccounts,
    listCategories,
    isSubmitting,
    watch,
    errors,
  } = usePaymentsCreateViewModel();
  return (
    <PaymentsCreate
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      control={control}
      title={title}
      listAccounts={listAccounts}
      listCategories={listCategories}
      isSubmitting={isSubmitting}
      watch={watch}
      errors={errors}
    />
  );
};

export default Page;

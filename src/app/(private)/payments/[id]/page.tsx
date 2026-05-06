"use client";
import PaymentsCreate from "@/app/(private)/payments/create/ui/view/PaymentsCreate";

import usePaymentsCreateViewModel from "@/app/(private)/payments/create/ui/model/paymentsCreate.models";

const Page = () => {
  const {
    handleSubmit,
    onSubmit,
    control,
    title,
    listAccounts,
    listCategories,
    handleDelete,
    isSubmitting,
    watch,
  } = usePaymentsCreateViewModel();

  return (
    <PaymentsCreate
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      control={control}
      title={title}
      listAccounts={listAccounts}
      listCategories={listCategories}
      handleDelete={handleDelete}
      isSubmitting={isSubmitting}
      watch={watch}
    />
  );
};

export default Page;

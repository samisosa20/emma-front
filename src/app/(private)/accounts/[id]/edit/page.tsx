"use client";
import AccountCreate from "@/app/(private)/accounts/create/ui/view/AccountCreate";

import useAccountCreate from "@/app/(private)/accounts/create/ui/model/accountCreate.models";

const Page = () => {
  const { handleSubmit, onSubmit, control, typeOptions, currencyOptions, title, handleDelete, handleReActivate, isDesactivate } =
    useAccountCreate();

  return (
    <AccountCreate
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      control={control}
      typeOptions={typeOptions}
      currencyOptions={currencyOptions}
      title={title}
      handleDelete={handleDelete}
      handleReActivate={handleReActivate}
      isDesactivate={isDesactivate}
    />
  );
};

export default Page;

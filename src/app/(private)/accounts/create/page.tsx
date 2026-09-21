"use client";
import AccountCreate from "./ui/view/AccountCreate";

import useAccountCreate from "./ui/model/accountCreate.models";

const Page = () => {
  const {
    handleSubmit,
    onSubmit,
    control,
    typeOptions,
    currencyOptions,
    title,
    watchType,
    isSubmitting,
  } = useAccountCreate();

  return (
    <AccountCreate
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      control={control}
      typeOptions={typeOptions}
      currencyOptions={currencyOptions}
      title={title}
      watchType={watchType}
      isSubmitting={isSubmitting}
    />
  );
};

export default Page;

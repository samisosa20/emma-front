"use client";
import AccountCreate from "./ui/view/AccountCreate";

import useAccountCreate from "./ui/model/accountCreate.models";

const Page = () => {
  const { handleSubmit, onSubmit, control, typeOptions, currencyOptions, title, watchType } =
    useAccountCreate();

  return (
    <AccountCreate
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      control={control}
      typeOptions={typeOptions}
      currencyOptions={currencyOptions}
      title={title}
      watchType={watchType}
    />
  );
};

export default Page;

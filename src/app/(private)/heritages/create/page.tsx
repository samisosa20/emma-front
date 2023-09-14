'use client';
import HeritagesCreate from './ui/view/HeritagesCreate';

import heritagesCreateViewModel from './ui/model/heritagesCreate.models';

const Page = () => {
  const {
    handleSubmit,
    onSubmit,
    control,
    title,
    currencyOptions,
  } = heritagesCreateViewModel();
  return (
    <HeritagesCreate
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      control={control}
      title={title}
      currencyOptions={currencyOptions}
    />
  );
};

export default Page;

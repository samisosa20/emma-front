'use client';
import HeritagesCreate from './ui/view/HeritagesCreate';

import useHeritagesCreateViewModel from './ui/model/heritagesCreate.models';

const Page = () => {
  const {
    handleSubmit,
    onSubmit,
    control,
    title,
    currencyOptions,
  } = useHeritagesCreateViewModel();
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

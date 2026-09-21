'use client';
import HeritageCreate from '@/app/(private)/heritages/create/ui/view/HeritagesCreate';

import useHeritageViewModel from '@/app/(private)/heritages/create/ui/model/heritagesCreate.models';

const Page = () => {
  const { handleSubmit, onSubmit, control, title, currencyOptions, handleDelete, isSubmitting } = useHeritageViewModel();

  return (
    <HeritageCreate
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      control={control}
      title={title}
      currencyOptions={currencyOptions}
      handleDelete={handleDelete}
      isSubmitting={isSubmitting}
    />
  );
};

export default Page;

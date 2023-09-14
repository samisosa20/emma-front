'use client';
import CategoryCreate from './ui/view/CategoryCreate';

import categoryCreateViewModel from './ui/model/categoryCreate.models';

const Page = () => {
  const {
    handleSubmit,
    onSubmit,
    control,
    title,
    groupsOptions,
    listCategories,
  } = categoryCreateViewModel();
  return (
    <CategoryCreate
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      control={control}
      title={title}
      groupsOptions={groupsOptions}
      listCategories={listCategories}
    />
  );
};

export default Page;

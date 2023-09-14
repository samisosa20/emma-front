'use client';
import CategoryCreate from '@/app/(private)/categories/create/ui/view/CategoryCreate';

import categoryCreateViewModel from '@/app/(private)/categories/create/ui/model/categoryCreate.models';

const Page = () => {
  const { handleSubmit, onSubmit, control, title, groupsOptions, handleDelete, listCategories } = categoryCreateViewModel();

  return (
    <CategoryCreate
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      control={control}
      title={title}
      groupsOptions={groupsOptions}
      handleDelete={handleDelete}
      listCategories={listCategories}
    />
  );
};

export default Page;

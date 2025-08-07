"use client";
import CategoryCreate from "./ui/view/CategoryCreate";

import useCategoryCreateViewModel from "./ui/model/categoryCreate.models";

const Page = () => {
  const { handleSubmit, onSubmit, control, title, groupsOptions } =
    useCategoryCreateViewModel();
  return (
    <CategoryCreate
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      control={control}
      title={title}
      groupsOptions={groupsOptions}
    />
  );
};

export default Page;

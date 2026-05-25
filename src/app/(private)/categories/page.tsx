
"use client";
//components
import useComponents from "@/share/components";
import Categories from './ui/view/Categories';

import useCategoriesViewModel from './ui/model/categories.models';

const Page = () => {
  const {
    isLoading,
    setSearch,
    handleToggle,
    search,
    isChecked,
    filteredCategories,
  } = useCategoriesViewModel();

  const { Loading } = useComponents();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Categories
      filteredCategories={filteredCategories}
      search={search}
      setSearch={setSearch}
      isChecked={isChecked}
      handleToggle={handleToggle}
    />
  );
};

export default Page;

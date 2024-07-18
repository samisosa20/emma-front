"use client";
import CategoryDetail from "./ui/view/CategoryDetail";

//components
import useComponents from "@/share/components";

import useCategoryDetailViewModel from "./ui/model/categoryDetail.models";

const Page = () => {
  const { Loading } = useComponents();
  const {
    isLoading,
    data,
    setSearch,
    handleToggle,
    search,
    isChecked,
    currencyOptions,
    control,
    onSubmit,
    handleSubmit,
    currency,
  } = useCategoryDetailViewModel();

  if (isLoading || data === undefined) {
    return <Loading />;
  }

  return (
    <CategoryDetail
      data={data}
      search={search}
      setSearch={setSearch}
      isChecked={isChecked}
      handleToggle={handleToggle}
      control={control}
      currencyOptions={currencyOptions}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      currency={currency}
    />
  );
};

export default Page;

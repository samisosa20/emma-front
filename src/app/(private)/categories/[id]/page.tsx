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
    loadingMovement,
    listMovements,
    meta,
    setPage,
  } = useCategoryDetailViewModel();

  if (isLoading || data === undefined || loadingMovement) {
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
      listMovements={listMovements}
      meta={meta}
      setPage={setPage}
    />
  );
};

export default Page;

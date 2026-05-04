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
    controlFilters,
    controlEdit,
    onSubmit,
    handleFilterSubmit,
    currency,
    loadingMovement,
    listMovements,
    meta,
    page,
    setPage,
    dataBalance,
    watch,
    setValue,
    handleSubmitEdit,
    onEditSubmit,
    handleDelete,
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
      controlFilters={controlFilters}
      controlEdit={controlEdit}
      currencyOptions={currencyOptions}
      handleFilterSubmit={handleFilterSubmit}
      onFilterSubmit={onSubmit}
      currency={currency}
      listMovements={listMovements}
      meta={meta}
      page={page}
      setPage={setPage}
      dataBalance={dataBalance}
      watch={watch}
      setValue={setValue}
      handleEditSubmit={handleSubmitEdit}
      onEditSubmit={onEditSubmit}
      handleDelete={handleDelete}
    />
  );
};

export default Page;

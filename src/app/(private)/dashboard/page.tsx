"use client";
//components
import useComponents from "@/share/components";
import Dashboard from "./ui/view/Dashboard";

import useDashboardViewModel from "./ui/model/dashboard.models";

export default function Page() {
  const {
    isLoading,
    data,
    currencyOptions,
    control,
    handleSubmit,
    onSubmit,
    getMovements,
    listMovements,
    listOptionsTypeReport,
    typeReport,
    listOptionsPeriodReport,
    periodReport,
    filters,
    monthIndex,
    handleChangeSlideStepper,
    selectedWeek,
    dataBalance,
    dataHistory,
  } = useDashboardViewModel();
  const { Loading } = useComponents();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Dashboard
      data={data}
      control={control}
      currencyOptions={currencyOptions}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      getMovements={getMovements}
      listMovements={listMovements}
      listOptionsTypeReport={listOptionsTypeReport}
      typeReport={typeReport}
      listOptionsPeriodReport={listOptionsPeriodReport}
      periodReport={periodReport}
      filters={filters}
      monthIndex={monthIndex}
      handleChangeSlideStepper={handleChangeSlideStepper}
      selectedWeek={selectedWeek}
      dataBalance={dataBalance}
      dataHistory={dataHistory}
    />
  );
}

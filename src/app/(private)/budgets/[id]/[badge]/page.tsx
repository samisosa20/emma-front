'use client';
//components
import useComponents from '@/share/components';
import BudgetRepor from './ui/view/BudgetRepor';

import useBudgetReportViewModel from './ui/model/budgetReport.models';

const Page = () => {
  const { data, isLoading, params, handleOpen, openCollapse } =
    useBudgetReportViewModel();

  const { Loading } = useComponents();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <BudgetRepor
      data={data}
      params={params}
      handleOpen={handleOpen}
      openCollapse={openCollapse}
    />
  );
};

export default Page;

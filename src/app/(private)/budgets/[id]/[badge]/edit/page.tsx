'use client';
//components
import useComponents from '@/share/components';
import BudgetList from './ui/view/BudgetList';

import useBudgetListViewModel from './ui/model/budgetList.models';

const Page = () => {
  const { data, isLoading, params, handleOpen, openCollapse } =
    useBudgetListViewModel();

  const { Loading } = useComponents();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <BudgetList
      data={data}
      params={params}
      handleOpen={handleOpen}
      openCollapse={openCollapse}
    />
  );
};

export default Page;

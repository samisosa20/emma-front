'use client';
//components
import useComponents from '@/share/components';
import Dashboard from './ui/view/Dashboard';

import useDashboardViewModel from './ui/model/dashboard.models';

export default function Page() {
  const { isLoading, data, currencyOptions, control, handleSubmit, onSubmit, getMovements, getMovementsGroup, listMovements } =
    useDashboardViewModel();
  const { Loading } = useComponents();

  if (isLoading) {
    return <Loading/>;
  }

  return (
    <Dashboard
      data={data}
      control={control}
      currencyOptions={currencyOptions}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      getMovementsGroup={getMovementsGroup}
      getMovements={getMovements}
      listMovements={listMovements}
    />
  );
}

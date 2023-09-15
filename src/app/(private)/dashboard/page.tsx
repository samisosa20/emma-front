'use client';
//components
import useComponents from '@/share/components';
import Dashboard from './ui/view/Dashboard';

import dashboardViewModel from './ui/model/dashboard.models';

export default function Page() {
  const { isLoading, data, currencyOptions, control, handleSubmit, onSubmit } =
    dashboardViewModel();
  const { Typography } = useComponents();

  if (isLoading) {
    return <Typography>Cargando...</Typography>;
  }

  return (
    <Dashboard
      data={data}
      control={control}
      currencyOptions={currencyOptions}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
    />
  );
}

'use client';
//components
import useComponents from '@/share/components';
import Profile from './ui/view/Profile';

import useDashboardViewModel from './ui/model/dashboard.models';

export default function Page() {
  const { isLoading, data, currencyOptions, control, handleSubmit, onSubmit, handleLogout } =
    useDashboardViewModel();
  const { Loading } = useComponents();

  if (isLoading) {
    return <Loading/>;
  }

  return (
    <Profile
      data={data}
      control={control}
      currencyOptions={currencyOptions}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      handleLogout={handleLogout}
    />
  );
}

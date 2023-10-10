'use client';
import AccountDetail from './ui/view/AccountDetail';

//components
import useComponents from '@/share/components';

import useAccount from './ui/model/accountDetail.models';

const Page = () => {
  const { Typography } = useComponents();
  const { isLoading, data, control, handleSubmit, onSubmit, listEvents, handleResetFilters, showDelete } =
    useAccount();

  if (isLoading || data === undefined) {
    return <Typography>Cargando...</Typography>;
  }

  return (
    <AccountDetail
      data={data}
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      listEvents={listEvents}
      handleResetFilters={handleResetFilters}
      showDelete={showDelete}
    />
  );
};

export default Page;

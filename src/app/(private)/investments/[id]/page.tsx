'use client';
import InvestmentsCreate from '@/app/(private)/investments/create/ui/view/InvestmentsCreate';

import useInvestmentsCreateViewModel from '@/app/(private)/investments/create/ui/model/investmentsCreate.models';

const Page = () => {
  const {
    handleSubmit,
    onSubmit,
    control,
    title,
    listMovements,
    currencyOptions,
    handleDelete,
    handleAppretiation,
    isOpen,
    onSubmitAppre,
    handleSubmitAppre,
    controlAppre,
    listAppretiations,
    handleEditAppretiation,
    idAppretiation,
    handleDeleteAppre,
  } = useInvestmentsCreateViewModel();

  return (
    <InvestmentsCreate
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      control={control}
      title={title}
      listMovements={listMovements}
      currencyOptions={currencyOptions}
      handleDelete={handleDelete}
      handleAppretiation={handleAppretiation}
      handleClose={handleAppretiation}
      isOpen={isOpen}
      onSubmitAppre={onSubmitAppre}
      handleSubmitAppre={handleSubmitAppre}
      controlAppre={controlAppre}
      listAppretiations={listAppretiations}
      handleEditAppretiation={handleEditAppretiation}
      idAppretiation={idAppretiation}
      handleDeleteAppre={handleDeleteAppre}
    />
  );
};

export default Page;

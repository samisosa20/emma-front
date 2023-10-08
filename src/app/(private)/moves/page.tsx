'use client';

//components
import Movements from './ui/view/Movements';

import movementsViewModel from './ui/model/movements.models';

const Page = () => {
  const { handleSubmit, onSubmit, control, currencyOptions, title } =
  movementsViewModel();

  return (
    <Movements
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      control={control}
      title={title}
      currencyOptions={currencyOptions}
    />
  );
};

export default Page;

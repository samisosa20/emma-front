'use client';
//components
import Support from './ui/view/Support';

import useSupportViewModel from './ui/model/support.models';

export default function Page() {
  const {  control,
    onSubmit,
    handleSubmit,
    isLoading,
  } =
  useSupportViewModel();

  return (
    <Support
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      isLoading={isLoading}
    />
  );
}

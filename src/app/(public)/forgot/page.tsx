'use client';
//components
import Forgot from './ui/view/Forgot';


import useForgot from './ui/model/forgot.models';


export default function Page() {
  const { handleSubmit, onSubmit, control } =
  useForgot();

  return (
    <Forgot
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
    />
  );
}

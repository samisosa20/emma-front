'use client';
//components
import useComponents from '@/share/components';
import Register from './ui/view/Register';


import useRegister from './ui/model/register.models';


export default function Page() {
  const { isLoading, handleSubmit, onSubmit, control, currencyOptions } =
  useRegister();
  const { Loading } = useComponents();

  if (isLoading) {
    return <Loading/>;
  }

  return (
    <Register
      control={control}
      currencyOptions={currencyOptions}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
    />
  );
}

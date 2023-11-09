'use client';
//components
import Login from './ui/view/Login';

import useLogin from './ui/model/login.models';

export default function Page() {
  const { handleSubmit, onSubmit, control } = useLogin();

  return (
    <Login control={control} handleSubmit={handleSubmit} onSubmit={onSubmit} />
  );
}

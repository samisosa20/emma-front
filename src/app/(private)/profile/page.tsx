"use client";
//components
import useComponents from "@/share/components";
import Profile from "./ui/view/Profile";

import useProfileViewModel from "./ui/model/profile.models";

export default function Page() {
  const {
    isLoading,
    data,
    currencyOptions,
    control,
    handleSubmit,
    onSubmit,
    handleLogout,
    isOpen,
    handleClose,
    controlDestroy,
    onSubmitDestroy,
    handleSubmitDestroy,
    user,
    verify,
    handeResendVerify,
    isSubmitting,
  } = useProfileViewModel();

  const { Loading } = useComponents();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Profile
      data={data}
      control={control}
      currencyOptions={currencyOptions}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      handleLogout={handleLogout}
      isOpen={isOpen}
      handleClose={handleClose}
      controlDestroy={controlDestroy}
      onSubmitDestroy={onSubmitDestroy}
      handleSubmitDestroy={handleSubmitDestroy}
      user={user}
      verify={verify}
      handeResendVerify={handeResendVerify}
      isSubmitting={isSubmitting}
    />
  );
}

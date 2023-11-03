'use client';
//components
import Tools from './ui/view/Tools';

import useToolsViewModel from './ui/model/tools.models';

export default function Page() {
  const { currencyOptions,
    control,
    handleSubmit,
    onSubmit, displayText,
    handleSubmitTest,
    controlTest,
    onSubmitTest,
    resultTest,
    isOpen,
    handleClose,
  } =
    useToolsViewModel();

  return (
    <Tools
      control={control}
      currencyOptions={currencyOptions}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      displayText={displayText}
      handleSubmitTest={handleSubmitTest}
      controlTest={controlTest}
      onSubmitTest={onSubmitTest}
      resultTest={resultTest}
      isOpen={isOpen}
      handleClose={handleClose}
    />
  );
}

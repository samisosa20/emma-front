const theme = {
  button: {
    base: `rounded-md font-semibold`,
    block: `w-full`,
    contained: {
      default: `bg-yellow-400 hover:bg-yellow-200 text-primary `, // TODO: Add styles
      dark: ``, // TODO: Add styles
      light: ``, // TODO: Add styles
      inherit: ``, // TODO: Add styles
    },
    outlined: {
      default: `border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-white`, // TODO: Add styles
      dark: ``, // TODO: Add styles
      light: ``, // TODO: Add styles
      inherit: ``, // TODO: Add styles
    },
    loading: {
      contained: ``, // TODO: Add styles
      outlined: ``, // TODO: Add styles
    },
    disabled: `bg-gray-600`,
    size: {
      sm: `px-2 py-3`, // TODO: Add styles
      md: `px-4 py-3`, // TODO: Add styles
      lg: ` px-16 py-3`, // TODO: Add styles
    },
    variant: {
      contained: ``, // TODO: Add styles
      outlined: ``, // TODO: Add styles
    },
  },
};

export const useTheme = () => {
  const button = theme.button;

  return { button };
};

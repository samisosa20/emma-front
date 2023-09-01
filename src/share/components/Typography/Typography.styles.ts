const theme = {
  typography: {
    h1: `font-bold text-2xl text-gray-700`, // TODO: Add styles
    h2: `font-semibold text-xl text-gray-700`, // TODO: Add styles
    h3: ``, // TODO: Add styles
    h4: `text-base text-gray-700`, // TODO: Add styles
    h5: `text-sm text-gray-700`, // TODO: Add styles
    h6: `font-light text-sm text-gray-700`, // TODO: Add styles
    p: `text-sm text-gray-500`, // TODO: Add styles
    link: ``, // TODO: Add styles
  },
};

export const useTheme = () => {
  const typography = theme.typography;

  return { typography };
};

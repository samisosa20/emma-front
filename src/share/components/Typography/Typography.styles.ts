const theme = {
  typography: {
    h1: `font-bold text-2xl text-wf-on-surface font-wf-headline-lg`,
    h2: `font-semibold text-xl text-wf-on-surface font-wf-headline-md`,
    h3: `font-semibold text-lg text-wf-on-surface font-wf-headline-md`,
    h4: `text-base text-wf-on-surface font-wf-headline-md`,
    h5: `text-sm text-wf-on-surface font-wf-headline-md`,
    h6: `font-light text-sm text-wf-on-surface font-wf-body-regular`,
    p: `text-sm text-wf-on-surface-variant font-wf-body-regular`,
    link: `text-sm text-wf-link hover:underline font-wf-body-regular`,
  },
};

export const useTheme = () => {
  const typography = theme.typography;

  return { typography };
};

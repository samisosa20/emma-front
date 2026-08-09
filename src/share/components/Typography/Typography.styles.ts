const theme = {
  typography: {
    h1: `font-bold text-3xl md:text-4xl text-wf-on-surface font-wf-headline-lg tracking-tight`,
    h2: `font-bold text-2xl md:text-3xl text-wf-on-surface font-wf-headline-lg tracking-tight`,
    h3: `font-semibold text-xl md:text-2xl text-wf-on-surface font-wf-headline-md`,
    h4: `font-semibold text-lg md:text-xl text-wf-on-surface font-wf-headline-md`,
    h5: `font-medium text-base text-wf-on-surface font-wf-headline-md`,
    h6: `font-medium text-sm text-wf-on-surface font-wf-body-regular`,
    p: `text-base text-wf-on-surface-variant font-wf-body-regular leading-relaxed`,
    link: `text-base text-wf-link hover:underline font-wf-body-regular font-medium`,
  },
};

export const useTheme = () => {
  const typography = theme.typography;

  return { typography };
};

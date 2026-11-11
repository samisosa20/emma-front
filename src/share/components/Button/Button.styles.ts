const theme = {
  button: {
    base: `rounded-xl font-semibold tracking-wide transition-all duration-200 select-none`,
    block: `w-full`,
    contained: {
      default: `bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/30 active:scale-[0.98]`,
      dark: `bg-slate-900 hover:bg-slate-800 text-slate-100 border border-slate-800`,
      light: `bg-slate-800 hover:bg-slate-700 text-slate-100`,
      inherit: `bg-inherit`,
    },
    outlined: {
      default: `border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 hover:border-emerald-500/40 hover:text-white active:scale-[0.98]`,
      dark: `border border-slate-800 bg-transparent text-slate-300 hover:bg-slate-900`,
      light: `border border-slate-700 bg-transparent text-slate-200 hover:bg-slate-800`,
      inherit: `border border-current`,
    },
    loading: {
      contained: `opacity-75 cursor-wait`,
      outlined: `opacity-75 cursor-wait`,
    },
    disabled: `opacity-50 cursor-not-allowed bg-slate-800 text-slate-500 border border-slate-800 shadow-none pointer-events-none`,
    size: {
      sm: `px-3 py-1.5 text-xs`,
      md: `px-4 py-2.5 text-sm`,
      lg: `px-6 py-3.5 text-base`,
    },
    variant: {
      contained: ``,
      outlined: ``,
    },
  },
};

export const useTheme = () => {
  const button = theme.button;

  return { button };
};

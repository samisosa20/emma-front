const theme = {
  modal: {
    container: `fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto transition-all duration-300 ease-in-out`,
    overlay: `fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300`,
    base: `relative bg-wf-surface text-wf-on-surface border border-wf-outline-variant/30 w-full max-w-lg mx-auto rounded-2xl shadow-2xl z-10 my-auto transition-all duration-300 ease-in-out transform overflow-hidden`,
    content: `p-5 sm:p-6 text-left flex flex-col max-h-[85vh]`,
    header: `flex justify-between items-center pb-3 border-b border-wf-outline-variant/20 shrink-0`,
    button: `p-2 rounded-full hover:bg-wf-surface-container text-wf-on-surface-variant hover:text-wf-primary transition-colors focus-visible:ring-2 focus-visible:ring-wf-primary outline-none`,
  },
};

export const useTheme = () => {
  const modal = theme.modal;

  return { modal };
};

const theme = {
  modal: {
    container: `fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 overflow-y-auto transition-all duration-300 ease-in-out`,
    overlay: `fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300`,
    base: `relative bg-slate-900/95 backdrop-blur-2xl text-slate-100 border border-slate-800/90 w-full max-w-lg mx-auto rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] z-10 my-auto transition-all duration-300 ease-in-out transform overflow-hidden`,
    content: `p-5 sm:p-6 text-left flex flex-col max-h-[85vh]`,
    header: `flex justify-between items-center pb-3.5 border-b border-slate-800/80 shrink-0`,
    button: `p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-emerald-400 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 outline-none`,
  },
};

export const useTheme = () => {
  const modal = theme.modal;

  return { modal };
};

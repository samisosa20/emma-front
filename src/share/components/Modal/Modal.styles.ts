const theme = {
  modal: {
    container: `fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 ease-in-out`,
    overlay: `absolute inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity duration-300`,
    base: `bg-white w-11/12 md:max-w-md mx-auto rounded-xl shadow-2xl z-50 transition-all duration-300 ease-in-out transform`,
    content: `py-6 text-left px-6`,
    header: `flex justify-between items-center mb-4`,
    button: `p-2 rounded-full hover:bg-gray-100 transition-colors focus-visible:ring-2 focus-visible:ring-wf-primary outline-none`,
  },
};

export const useTheme = () => {
  const modal = theme.modal;

  return { modal };
};

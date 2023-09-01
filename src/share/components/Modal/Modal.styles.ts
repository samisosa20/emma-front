const theme = {
  modal: {
    container: `fixed top-0 left-0 w-full h-full flex items-center justify-center`,
    overlay: `absolute w-full h-full bg-gray-900 opacity-50`,
    base: `bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto`,
    content: `py-4 text-left px-6`,
    header: `flex justify-between items-center`,
    button: `p-2 rounded-md hover:bg-gray-300`,
  },
};

export const useTheme = () => {
  const modal = theme.modal;

  return { modal };
};

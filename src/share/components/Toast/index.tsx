
const Toast = () => {

  return (
    <div className='fixed top-4 right-4 flex flex-col items-end z-50 animate__animated animate__fadeIn'>
      <div className='bg-red-200 p-4 rounded-lg shadow-lg'>
        <p className='text-xl font-semibold mb-0'>Alerta</p>
        <p className='text-gray-700 text-sm'>
          Este es un mensaje de alerta importante.
        </p>
      </div>
    </div>
  );
};

export default Toast;

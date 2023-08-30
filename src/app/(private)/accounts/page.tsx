//components
import useComponents from '@/components';
import useComponentsLayout from '../components';

const Accounts = () => {
  const { Typography } = useComponents();
  const { Cards } = useComponentsLayout();
  const data = [
    {
      title: 'Balance del mes actual',
      values: ['9.891.590,00 COP', '-523,56 USD'],
    },
    {
      title: 'Balance del año actual',
      values: ['9.891.590,00 COP', '856,52 USD'],
    },
    {
      title: 'Balance total',
      values: ['9.891.590,00 COP', '1.026,22 USD'],
    },
  ];
  return (
    <div>
      <Typography variant='h1'>Cuentas</Typography>
      <Typography>Listado de cuentas</Typography>
      <div className='mt-6'>
        <Cards data={data} />
      </div>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6`}
      >
        <div className='bg-white rounded shadow-sm p-4'>
          <div className='flex items-center justify-between'>
            <Typography variant='h2'>Efectivo</Typography>
            <Typography variant='p'>COP</Typography>
          </div>
            <Typography variant='h6' className="h-[40px]">Descripcion de la cuenta esto puede ser muy largo</Typography>
            <Typography variant='p' className="text-right">$ 8.000.000,00</Typography>
        </div>
        <div className='bg-white rounded shadow-sm p-4'>
          <div className='flex items-center justify-between'>
            <Typography variant='h2'>Efectivo</Typography>
            <Typography variant='p'>COP</Typography>
          </div>
            <Typography variant='h6' className="h-[40px]"></Typography>
            <Typography variant='p' className="text-right">$ 8.000.000,00</Typography>
        </div>
        <div className='bg-white rounded shadow-sm p-4'>
          <div className='flex items-center justify-between'>
            <Typography variant='h2'>Efectivo</Typography>
            <Typography variant='p'>COP</Typography>
          </div>
            <Typography variant='h6' className="h-[40px]"></Typography>
            <Typography variant='p' className="text-right">$ 8.000.000,00</Typography>
        </div>
      </div>
    </div>
  );
};

export default Accounts;

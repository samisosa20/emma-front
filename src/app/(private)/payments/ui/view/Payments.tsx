import Link from 'next/link';
import { MdAddCircleOutline } from 'react-icons/md';

//components
import useComponents from '@/share/components';

// Helpers
import { formatCurrency } from '@/share/helpers';

export default function Payments(props: any) {
  const { data } = props;
  const { Typography } = useComponents();

  return (
    <div>
      <div>
        <div className='flex items-center justify-between w-full'>
          <div>
            <Typography variant='h1'>Pagos</Typography>
            <Typography>Establece tus pagos recurrentes</Typography>
          </div>
          <div>
            <Link
              href={'/payments/create'}
              className='flex items-center space-x-2 bg-white p-2 rounded shadow-sm'
            >
              <MdAddCircleOutline />
              <Typography>Crear pago</Typography>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6`}
      >
        {data &&
          data.map((payment: any) => (
            <Link href={`/payments/${payment.id}`} key={payment.id}>
              <div className='bg-white rounded shadow-sm p-4'>
                <div className='flex items-center justify-between'>
                  <Typography variant='h2'>{payment.category.name}</Typography>
                </div>
                <div className='flex items-center justify-between'>
                  <Typography variant='h4'>{payment.account.name}</Typography>
                  <Typography variant='h6' className={payment.amount > 0 ? 'text-green-500' : 'text-red-500'}>{formatCurrency.format(payment.amount)}</Typography>
                </div>
                <div className='flex items-center justify-between'>
                  <Typography variant='h5'><b>Dia:</b> {payment.specific_day}</Typography>
                  <Typography variant='h5'>{!payment.end_date ? 'Para siempre' : payment.end_date}</Typography>
                </div>
              </div>
            </Link>
          ))}
        {data && data.length === 0 && (
          <Typography className='text-center py-6'>Sin resultados</Typography>
        )}
      </div>
    </div>
  );
}

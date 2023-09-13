import Link from 'next/link';
import { MdAddCircleOutline } from 'react-icons/md';

//components
import useComponents from '@/share/components';

// Helpers
import { formatCurrency } from '@/share/helpers';

type EventList = {
  id: number;
  name: string;
  balance: { movements: number; currency: string }[];
};

export default function Investments(props: any) {
  const { data } = props;
  const { Typography } = useComponents();

  return (
    <div>
      <div>
        <div className='flex items-center justify-between w-full'>
          <div>
            <Typography variant='h1'>Inversiones</Typography>
            <Typography>Listado de inversiones</Typography>
          </div>
          <div>
            <Link
              href={'/investments/create'}
              className='flex items-center space-x-2 bg-white p-2 rounded shadow-sm'
            >
              <MdAddCircleOutline />
              <Typography>Crear inversion</Typography>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6`}
      >
        {data &&
          data.map((event: EventList) => (
            <Link href={`/investments/${event.id}`} key={event.id}>
              <div className='bg-white rounded shadow-sm p-4'>
                <div className='flex items-center justify-between'>
                  <Typography variant='h2'>Inversion</Typography>
                  <Typography variant='h5'>COP</Typography>
                </div>
                <Typography
                  variant='h5'
                  className={500000000 > 0 ? 'text-green-500' : 'text-red-500'}
                >
                  {formatCurrency.format(500000000)}
                </Typography>
                <div className='flex items-center justify-between'>
                  <Typography variant='h5' className='font-semibold'>
                    Val.
                  </Typography>
                  <Typography variant='h6'>-125.45%</Typography>
                </div>
                <div className='flex items-center justify-between'>
                  <Typography variant='h5' className='font-semibold'>
                    Rend.
                  </Typography>
                  <Typography variant='h6'>
                    {formatCurrency.format(15500000)}
                  </Typography>
                </div>
                <div className='flex items-center justify-between'>
                  <Typography variant='h5' className='font-semibold'>
                    Total
                  </Typography>
                  <Typography variant='h6'>-125.45%</Typography>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

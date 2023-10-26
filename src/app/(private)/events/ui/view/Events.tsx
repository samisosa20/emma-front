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

const Events = (props: any) => {
  const { data } = props;
  const { Typography } = useComponents();

  return (
    <div>
      <div>
        <div className='flex items-center justify-between w-full'>
          <div>
            <Typography variant='h1'>Eventos</Typography>
            <Typography>Listado de eventos</Typography>
          </div>
          <div>
            <Link
              href={'/events/create'}
              className='flex items-center space-x-2 bg-white p-2 rounded shadow-sm'
            >
              <MdAddCircleOutline />
              <Typography>Crear evento</Typography>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6`}
      >
        {data &&
          data.map((event: EventList) => (
            <Link href={`/events/${event.id}`} key={event.id}>
              <div className='bg-white rounded shadow-sm p-4'>
                <div className='flex items-center justify-between'>
                  <Typography variant='h2'>{event.name}</Typography>
                </div>
                {event.balance.map((balance, index) => (
                  <Typography
                    key={index}
                    variant='h6'
                    className={
                      balance.movements < 0 ? 'text-red-500' : 'text-green-500'
                    }
                  >
                    {formatCurrency.format(balance.movements)}{' '}
                    {balance.currency}
                  </Typography>
                ))}
              </div>
            </Link>
          ))}
      </div>
      {data && data.length === 0 && (
        <div className='bg-white rounded shadow-sm'>
          <Typography className='text-center py-6'>Sin Eventos</Typography>
        </div>
      )}
    </div>
  );
};

export default Events;

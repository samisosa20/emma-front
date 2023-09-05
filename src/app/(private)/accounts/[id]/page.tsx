'use client';
import { useParams } from 'next/navigation';

//components
import useComponents from '@/share/components';
import useComponentsLayout from '../../components';

import useAccount from './controller';

const AccountDetail = () => {
  const { Typography } = useComponents();
  const { Cards } = useComponentsLayout();

  const { isLoading, data, formatCurrency } = useAccount();

  if (isLoading || data === undefined) {
    return <Typography>Cargando...</Typography>;
  }

  return (
    <div>
      <Typography variant='h1'>{`${data.account.name} ${data.account.currency.code}`}</Typography>
      <Typography>Detalle cuenta</Typography>
      <div className='mt-6'>
        <Cards data={data.balances} />
      </div>
      <div className='mt-6 bg-white rounded shadow-sm max-h-[65vh] overflow-y-auto'>
        {data.movements.data.map((movement) => (
          <div className='border-b border-gray-300 py-2 px-1' key={movement.id}>
            <div className='flex justify-between items-center'>
              <div className='font-bold'>{movement.category.name}</div>
              <div
                className={
                  movement.amount > 0 ? 'text-green-500' : 'text-red-500'
                }
              >
                {formatCurrency.format(movement.amount)}
              </div>
            </div>
            <div className='flex justify-between items-center pb-1'>
              <Typography>{movement.date_purchase}</Typography>
              <Typography>{movement.event?.name}</Typography>
            </div>
            {movement.description && (
              <div className='border-t pt-1'>
                <Typography variant="h5">{movement.description}</Typography>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountDetail;

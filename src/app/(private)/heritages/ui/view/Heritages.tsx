import Link from 'next/link';
import { MdAddCircleOutline } from 'react-icons/md';

//components
import useComponents from '@/share/components';

// Helpers
import { formatCurrency } from '@/share/helpers';

type HeritageList = {
  year: string;
  balance: { movements: number; amount: number; currency: string }[];
};

export default function Heritages(props: any) {
  const { data } = props;
  const { Typography } = useComponents();

  return (
    <div>
      <div>
        <div className='flex items-center justify-between w-full'>
          <div>
            <Typography variant='h1'>Patrimonio</Typography>
            <Typography>Patrimonio por año</Typography>
          </div>
          <div>
            <Link
              href={'/heritages/create'}
              className='flex items-center space-x-2 bg-white p-2 rounded shadow-sm'
            >
              <MdAddCircleOutline />
              <Typography>Crear patrimonio</Typography>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6`}
      >
        {data &&
          data.map((heritage: HeritageList) => (
            <Link href={`/heritages/${heritage.year}`} key={heritage.year}>
              <div className='bg-white rounded shadow-sm p-4'>
                <div className='flex items-center justify-between'>
                  <Typography variant='h2'>{heritage.year}</Typography>
                </div>
                {heritage.balance.map((balance, i) =>  <Typography
                  variant='h5'
                  key={i}
                  className={balance.amount > 0 ? 'text-green-500' : 'text-red-500'}
                >
                  {formatCurrency.format(balance.amount)} {balance.currency}
                </Typography>)}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

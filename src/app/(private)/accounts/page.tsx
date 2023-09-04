"use client"
import Link from "next/link";

// Controller
import useAccounts from './controller'

//components
import useComponents from '@/share/components';
import useComponentsLayout from '../components';

const Accounts = () => {
  const { Typography } = useComponents();
  const { Cards } = useComponentsLayout();

  const {data, isLoading} = useAccounts()

  const formatoMoneda = new Intl.NumberFormat('es-US', {
    style: 'currency',
    currency: 'USD',
  });

  if (isLoading) {
    return <Typography>Cargando...</Typography>
  }

  return (
    <div>
      <Typography variant='h1'>Cuentas</Typography>
      <Typography>Listado de cuentas</Typography>
      <div className='mt-6'>
        {data && <Cards data={data.balances} />}
      </div>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6`}
      >
        {data && data.accounts.map((account) => <Link href={`/accounts/${account.id}`}>
          <div className='bg-white rounded shadow-sm p-4'>
            <div className='flex items-center justify-between'>
              <Typography variant='h2'>{account.name}</Typography>
              <Typography variant='p'>{account.currency.code}</Typography>
            </div>
              <Typography variant='h6' className="h-[40px]">{account.description}</Typography>
              <Typography variant='p' className={`text-right ${
                account.balance + account.init_amount >= 0 ? 'text-green-500' : 'text-red-500'
              }`}>{formatoMoneda.format(account.balance + account.init_amount)}</Typography>
          </div>
        </Link>)}
      </div>
    </div>
  );
};

export default Accounts;

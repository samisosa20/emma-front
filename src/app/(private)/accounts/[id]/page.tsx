'use client';
import { useParams } from 'next/navigation';

//components
import useComponents from '@/share/components';
import useComponentsLayout from '../../components';

import { data } from './tem';

const AccountDetail = () => {
  const param = useParams();
  console.log(param.id);
  const { Typography } = useComponents();
  const { Cards } = useComponentsLayout();
  const balances = [
    {
      title: 'Balance del mes actual',
      values: [data.balances[0].month],
    },
    {
      title: 'Balance del año actual',
      values: [data.balances[0].year],
    },
    {
      title: 'Balance total',
      values: [data.balances[0].balance],
    },
  ];
  return (
    <div>
      <Typography variant='h1'>{`${data.account.name} ${data.account.currency.code}`}</Typography>
      <Typography>Detalle cuenta</Typography>
      <div className='mt-6'>
        <Cards data={balances} />
      </div>
      <div className='mt-6 bg-white rounded shadow-sm'>
        <div className='border-b border-gray-300 py-2 px-1'>
          <div className='flex justify-between items-center'>
            <div className='font-bold'>{''}</div>
            <div className="{{$movement->amount > 0 s? 'text-green-500' : 'text-red-500'}}">
              {''}
            </div>
          </div>
          <div className='flex justify-between items-center pb-1'>
            <div>{''}</div>
            <div>{''}</div>
          </div>
          <div className='border-t pt-1'>{''}</div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetail;

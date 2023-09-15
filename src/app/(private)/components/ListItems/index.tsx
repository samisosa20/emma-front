"use client"
import { useState } from 'react'

//components
import useComponents from '@/share/components';

// Interface
import { ListItems } from './ListItems.interface';

const { Typography, Modal } = useComponents();
const formatoMoneda = new Intl.NumberFormat('es-US', {
  style: 'currency',
  currency: 'USD',
});

const ListDefault = (props: ListItems) => {
  const { data, title } = props;
  return (
    <div className='bg-white p-4 shadow-sm rounded'>
      <Typography className='mb-4'>{title}</Typography>
      <div className='h-[243px] overflow-y-auto'>
        {data?.map((card, index) => (
          <div className={`mb-2 pt-2 ${index > 0 ? 'border-t' : ''}`} key={"ListDefault" + index}>
            <Typography variant='h5'>{card.title}</Typography>
            <Typography
              variant='h3'
              className={`text-right ${
                card.value >= 0 ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {formatoMoneda.format(card.value)}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

const ListUtil = (props: ListItems) => {
  const { data, title } = props;
  return (
    <div className='bg-white p-4 shadow-sm rounded'>
      <Typography className='mb-4'>{title}</Typography>
      <div className='h-[243px] overflow-y-auto'>
        {data?.map((card, index) => (
          <div className={`mb-2 pt-2 ${index > 0 ? 'border-t' : ''}`} key={"ListUtil" + index}>
            <Typography variant='h5'>{card.title}</Typography>
            <div className='flex justify-between items- center'>
              <Typography variant='p' className={`text-right`}>
                {formatoMoneda.format(card.value)}{` (${card.percentage}%)`}
              </Typography>
              <Typography variant='p' className={`text-right`}>
                {formatoMoneda.format(card.limit ?? 0)}
              </Typography>
            </div>
            <div className='w-full bg-gray-200 rounded'>
              <div
                className='h-3 bg-red-500 rounded'
                style={{
                  width: `${card.percentage}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ListModal = (props: ListItems) => {
  const { data, title } = props;

  const [isOpen, setIsOpen] = useState(false)

  const handleSelectItem = () => {
    setIsOpen(true)
  }

  return (
    <div className='bg-white p-4 shadow-sm rounded'>
      <Typography className='mb-4'>{title}</Typography>
      <div className='h-[243px] overflow-y-auto'>
        {data?.map((card, index) => (
          <div className={`mb-2 pt-2 ${index > 0 ? 'border-t' : ''}`} key={"ListModal" + index} onClick={()=>handleSelectItem()}>
            <Typography variant='h5'>{card.title}</Typography>
            <Typography
              variant='h3'
              className={`text-right ${
                card.value >= 0 ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {formatoMoneda.format(card.value)}
            </Typography>
          </div>
        ))}
      </div>
      <Modal title='Listado de movimientos' isOpen={isOpen} onClose={()=> setIsOpen(false)}>
        <p>hisdufjsdfh</p>
      </Modal>
    </div>
  );
};

const ListItems = (props: ListItems) => {
  const { data, title, variant = 'default' } = props;

  if (variant === 'default') {
    return <ListDefault data={data} title={title} />;
  } else if (variant === 'utilization') {
    return <ListUtil data={data} title={title} />;
  } else if (variant === 'modal') {
    return <ListModal data={data} title={title} />;
  }
};

export default ListItems;

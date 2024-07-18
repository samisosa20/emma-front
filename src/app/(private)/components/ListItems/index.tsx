"use client"
import { useState } from 'react'
import { useRouter } from "next/navigation";

//components
import useComponents from '@/share/components';

// Interface
import { ListItems } from './ListItems.interface';

const formatoMoneda = new Intl.NumberFormat('es-US', {
  style: 'currency',
  currency: 'USD',
});

const ListDefault = (props: ListItems) => {
  const { data, title } = props;
  const { Typography } = useComponents();
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
  const { Typography } = useComponents();
  return (
    <div className='bg-white p-4 shadow-sm rounded'>
      <Typography className='mb-4'>{title}</Typography>
      <div className='h-[243px] overflow-y-auto'>
        {data?.map((card, index) => (
          <div className={`mb-2 pt-2 ${index > 0 ? 'border-t' : ''}`} key={"ListUtil" + index}>
            <Typography variant='h5'>{card.title} {card.father ? ` (${card.father})` : ''}</Typography>
            <div className='flex justify-between items- center'>
              <Typography variant='p' className={`text-right`}>
                {formatoMoneda.format(card.value)}{` (${Math.abs(card.percentage ?? 0)}%)`}
              </Typography>
              <Typography variant='p' className={`text-right`}>
                {formatoMoneda.format(card.limit ?? 0)}
              </Typography>
            </div>
            <div className='w-full bg-gray-200 rounded'>
              <div
                className={`h-3 bg-${card.color}-400 rounded`}
                style={{
                  width: `${Math.abs(card.percentage ?? 0) > 100 ? 100 : Math.abs(card.percentage ?? 0)}%`,
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
  const { data, title, onClickModal, dataModal, showHistory } = props;
  const { Typography, Modal, Button } = useComponents();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false)
  const [categoryId, setCategoryId] = useState(0)

  const handleSelectItem = async(id: number) => {
    onClickModal && await onClickModal(id)
    setIsOpen(true)
    setCategoryId(id)
  }

  return (
    <div className='bg-white p-4 shadow-sm rounded'>
      <Typography className='mb-4'>{title}</Typography>
      <div className='h-[243px] overflow-y-auto'>
        {data?.map((card, index) => (
          <div className={`mb-2 pt-2 ${index > 0 ? 'border-t' : ''} cursor-pointer`} key={"ListModal" + index} onClick={()=>handleSelectItem(card.id)}>
            <Typography variant='h5'>{card.title} {card.father ? ` (${card.father})` : ''}</Typography>
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
        {dataModal && dataModal.map((data, index) => (
          <div className={`${index > 0 ? 'border-t' : ''} py-3`} key={index}>
            <div className="flex items-center justify-between">
            <Typography>{formatoMoneda.format(data.amount)}</Typography>
            <Typography>{data.account?.name ?? `${data.category.name} ${data.category.category_father ? ` (${data.category.category_father.name})`: ''}` }</Typography>
            </div>
            <div className="flex items-center justify-between">
            <Typography>{data.date_purchase}</Typography>
            {data.event && <Typography>{data.event?.name}</Typography>}
            </div>
            {data.description && <Typography>{data.description}</Typography>}
          </div>
        ))}
        {showHistory && <div className='text-center mt-6'>
          <Typography
          variant='p'
          className='text-black underline cursor-pointer hover:text-gray-400'
          onClick={()=> router.push(`categories/${categoryId}`)}
          >
            Ver historico
          </Typography>
        </div>}
      </Modal>
    </div>
  );
};

const ListItems = (props: ListItems) => {
  const { data, title, variant = 'default', onClickModal, dataModal = [], showHistory = false } = props;

  if (variant === 'default') {
    return <ListDefault data={data} title={title} />;
  } else if (variant === 'utilization') {
    return <ListUtil data={data} title={title} />;
  } else if (variant === 'modal') {
    return <ListModal data={data} title={title} onClickModal={onClickModal} dataModal={dataModal} showHistory={showHistory} />;
  }
};

export default ListItems;

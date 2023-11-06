import { useState, ReactNode } from 'react';
import { MdFilterList, MdClose } from 'react-icons/md';

//components
import useComponents from '@/share/components';

interface FiltersProps {
    children: ReactNode
}

export default function Filters(props: FiltersProps) {
    const {children} = props;
  const [isOpen, setIsOpen] = useState(false);
  const { Typography } = useComponents();

  return (
    <div>
      <div>
        <div >
          <MdFilterList className='w-[24px] h-[24px] ml-auto cursor-pointer' onClick={() => setIsOpen(true)} id="fiona-filter" />
        </div>
      </div>
      <div className={`bg-white h-screen fixed top-0 right-0 px-4 py-6 z-10 shadow-lg ${isOpen ? 'w-screen md:w-[350px]' : 'w-0 hidden'}`}>
        <div className='flex items-center justify-between'>
          <Typography variant='h2'>Filtros:</Typography>
          <div onClick={() => setIsOpen(false)}>
            <MdClose className='w-[24px] h-[24px] cursor-pointer' />
          </div>
        </div>
        <div className="relative h-[97%]">
            {children}
        </div>
      </div>
    </div>
  );
}

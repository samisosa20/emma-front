'use client';
import {useState} from 'react'
import Image from 'next/image';
import Link from 'next/link';
import {
  MdAttachMoney,
  MdAccountBalanceWallet,
  MdEventNote,
  MdOutlineStackedLineChart,
  MdAccountBalance,
  MdOutlinePayment,
  MdOutlineCategory,
  MdMenu,
  MdOutlineClose,
} from 'react-icons/md';
import { usePathname } from 'next/navigation';

// Assets
import imgLogo from '../../../../../public/img/logo.png';

// Components
import useComponents from '@/share/components';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { Typography } = useComponents();
  const pathname = usePathname();
  const links = [
    {
      name: 'Movimientos',
      link: '/moves',
      show: true,
      icon: MdAttachMoney,
    },
    {
      name: 'Cuentas',
      link: '/accounts',
      show: true,
      icon: MdAccountBalanceWallet,
    },
    {
      name: 'Eventos',
      link: '/events',
      show: true,
      icon: MdEventNote,
    },
    {
      name: 'Inversiones',
      link: '/investments',
      show: true,
      icon: MdOutlineStackedLineChart,
    },
    {
      name: 'Presupuesto',
      link: '/budgets',
      show: false,
      icon: MdAttachMoney,
    },
    {
      name: 'Patrimonio',
      link: '/heritages',
      show: true,
      icon: MdAccountBalance,
    },
    {
      name: 'Categorias',
      link: '/categories',
      show: true,
      icon: MdOutlineCategory,
    },
    {
      name: 'Pagos',
      link: '/payments',
      show: true,
      icon: MdOutlinePayment,
    },
  ];

  return (
    <nav className='lg:hidden bg-primary p-4'>
      <div className='flex items-center justify-between'>
        <Link href='/dashboard'>
          <Image src={imgLogo} alt='Logo fiona' width='166' height='45' />
        </Link>
        <div onClick={()=> setIsOpen(true)}>
        <MdMenu className='text-white w-[24px] h-[24px]' />
        </div>
      </div>
      <div className={`${isOpen ? 'h-screen' : 'hidden h-0'} fixed inset-0 w-screen bg-primary px-6 pt-8 transition-all z-10`}>
        <div className='flex items-center justify-between'>
          <Link href='/dashboard'>
            <Image src={imgLogo} alt='Logo fiona' width='166' height='45' />
          </Link>
          <div onClick={()=> setIsOpen(false)}>
          <MdOutlineClose className='text-white w-[24px] h-[24px]' />
          </div>
        </div>
        <ul className='mt-8 text-white'>
          {links
            .filter((v) => v.show)
            .map((link, index) => {
              const Icon = link.icon;
              return (
                <Link href={link.link} key={index} onClick={()=> setIsOpen(false)}>
                  <li
                    className={`${
                      pathname === link.link ? 'text-secondary' : 'text-white'
                    } mb-2 flex space-x-4 items-center hover:text-secondary`}
                  >
                    <Icon />
                    <Typography
                      variant='h3'
                      className={`${
                        pathname === link.link ? 'text-secondary' : 'text-white'
                      } hover:text-secondary`}
                    >
                      {link.name}
                    </Typography>
                  </li>
                </Link>
              );
            })}
        </ul>
      </div>
    </nav>
  );
};

export default Header;

"use client"
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
} from 'react-icons/md';
import { usePathname } from "next/navigation";

// Assets
import imgLogo from '../../../../../public/img/logo.png';

// Components
import useComponents from '@/share/components';

const Header = () => {
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
      link: '/moves',
      show: true,
      icon: MdOutlineStackedLineChart,
    },
    {
      name: 'Presupuesto',
      link: '/moves',
      show: true,
      icon: MdAttachMoney,
    },
    {
      name: 'Patrimonio',
      link: '/moves',
      show: true,
      icon: MdAccountBalance,
    },
    {
      name: 'Categorias',
      link: '/moves',
      show: true,
      icon: MdOutlineCategory,
    },
    {
      name: 'Pagos',
      link: '/moves',
      show: true,
      icon: MdOutlinePayment,
    },
  ];

  return (
    <aside className='hidden lg:block bg-primary p-4'>
      <Link href='/dashboard'>
        <Image src={imgLogo} alt='Logo fiona' />
      </Link>
      <ul className='mt-4 text-white'>
        {links.map((link, index) => {
          const Icon = link.icon;
          return (
            <Link href={link.link} key={index}>
              <li className={`${pathname === link.link ? 'text-secondary' : 'text-white'} mb-2 flex space-x-4 items-center hover:text-secondary`}>
                <Icon />
                <Typography variant="h3" className={`${pathname === link.link ? 'text-secondary' : 'text-white'} hover:text-secondary`}>{link.name}</Typography>
              </li>
            </Link>
          );
        })}
      </ul>
    </aside>
  );
};

export default Header;

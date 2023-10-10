'use client';
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
import { usePathname } from 'next/navigation';

// Assets
import imgLogo from '../../../../../public/img/logo.png';

// Components
import useComponents from '@/share/components';

export default function Navbar() {
  const { Typography } = useComponents();
  const pathname = usePathname();

  const obtenerIniciales = (name: string) => {
    const partesDelNombre = name.split(' ');
    const iniciales = partesDelNombre.map((parte) => parte[0].toUpperCase());
    return iniciales.join('');
  };

  const user = JSON.parse(localStorage.getItem('user') ?? '{}').name ?? 'Demo';

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
      show: false,
      icon: MdOutlinePayment,
    },
  ];

  return (
    <aside className='hidden lg:block bg-primary p-4'>
      <Link href='/dashboard'>
        <Image src={imgLogo} alt='Logo fiona' />
      </Link>
      <ul className='mt-4 text-white'>
        {links
          .filter((v) => v.show)
          .map((link, index) => {
            const Icon = link.icon;
            return (
              <Link href={link.link} key={index}>
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
        <li>
          <Link href={'/profile'}>
            <div className='bg-neutral-700 rounded py-2 px-3 fixed bottom-8 flex items-center w-[168px]'>
              <div className='w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-base font-semibold flex-shrink-0'>
                {obtenerIniciales(user)}
              </div>
              <span className='ml-2 text-white font-medium text-sm truncate'>
                {user}
              </span>
            </div>
          </Link>
        </li>
      </ul>
    </aside>
  );
}

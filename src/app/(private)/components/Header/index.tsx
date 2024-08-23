'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MdMenu, MdOutlineClose } from 'react-icons/md';
import { usePathname } from 'next/navigation';

// Assets
import imgLogo from '../../../../../public/img/logo.png';

// Components
import useComponents from '@/share/components';

import { links } from '@/share/helpers';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState('Demo');
  const { Typography } = useComponents();
  const pathname = usePathname();

  const obtenerIniciales = (name: string) => {
    const partesDelNombre = name.split(' ');
    const iniciales = partesDelNombre.map((parte) => parte[0].toUpperCase());
    return iniciales.join('');
  };

  useEffect(() => {
    if (localStorage.getItem('emma-user'))
      setUserName(JSON.parse(localStorage.getItem('emma-user') ?? '{}').name);
  }, []);

  return (
    <nav className='lg:hidden bg-primary px-4 py-3'>
      <div className='flex items-center justify-between'>
        <div id="emma-logo-header">
        <Link href='/dashboard' onClick={() => setIsOpen(false)}>
          <Image src={imgLogo} alt='Logo emma' width='166' height='45' />
        </Link>
        </div>
        <div id="emma-menu-mobile" onClick={() => setIsOpen(true)}>
          <MdMenu className='text-white w-[24px] h-[24px]' />
        </div>
      </div>
      <div
        className={`${
          isOpen ? 'h-screen' : 'hidden h-0'
        } fixed inset-0 w-screen bg-primary px-4 pt-4 transition-all z-10`}
      >
        <div className='flex items-center justify-between'>
          <Link href='/dashboard' onClick={() => setIsOpen(false)}>
            <Image src={imgLogo} alt='Logo emma' width='166' height='45' />
          </Link>
          <div onClick={() => setIsOpen(false)}>
            <MdOutlineClose className='text-white w-[24px] h-[24px]' />
          </div>
        </div>
        <ul className='mt-8 text-white'>
          {links
            .filter((v) => v.show)
            .map((link, index) => {
              const Icon = link.icon;
              if (typeof link.link === 'string') {
                return (
                  <Link
                    href={link.link}
                    key={index}
                    onClick={() => setIsOpen(false)}
                  >
                    <li
                      className={`${
                        pathname === link.link ? 'text-secondary' : 'text-white'
                      } ${!link.mobile ? 'hidden lg:block' : ''} mb-2 flex space-x-4 items-center hover:text-secondary`}
                    >
                      <Icon />
                      <Typography
                        variant='h2'
                        className={`${
                          pathname === link.link
                            ? 'text-secondary'
                            : 'text-white'
                        } hover:text-secondary`}
                      >
                        {link.name}
                      </Typography>
                    </li>
                  </Link>
                );
              }
              return (
                <div onClick={link.onClick} key={index}>
                  <li
                    className={`${!link.mobile ? 'hidden lg:block' : ''} text-white mb-2 flex space-x-4 items-center hover:text-secondary cursor-pointer`}
                  >
                    <Icon />
                    <Typography
                      variant='h2'
                      className={`text-white hover:text-secondary`}
                    >
                      {link.name}
                    </Typography>
                  </li>
                </div>
              );
            })}
          <li>
            <Link href={'/profile'} onClick={() => setIsOpen(false)}>
              <div className='bg-neutral-700 rounded py-2 px-3 fixed bottom-8 flex items-center left-6 right-6 w-profile'>
                <div className='w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-base font-semibold flex-shrink-0'>
                  {obtenerIniciales(userName)}
                </div>
                <span className='ml-2 text-white font-medium text-sm truncate'>
                  {userName}
                </span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;

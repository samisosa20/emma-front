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

  useEffect(()=>{
    if(localStorage.getItem('user'))
    setUserName(JSON.parse(localStorage.getItem('user') ?? '{}').name)
  }, [])

  return (
    <nav className='lg:hidden bg-primary p-4'>
      <div className='flex items-center justify-between'>
        <Link href='/dashboard' onClick={() => setIsOpen(false)}>
          <Image src={imgLogo} alt='Logo fiona' width='166' height='45' />
        </Link>
        <div onClick={() => setIsOpen(true)}>
          <MdMenu className='text-white w-[24px] h-[24px]' />
        </div>
      </div>
      <div
        className={`${
          isOpen ? 'h-screen' : 'hidden h-0'
        } fixed inset-0 w-screen bg-primary px-6 pt-8 transition-all z-10`}
      >
        <div className='flex items-center justify-between'>
          <Link href='/dashboard' onClick={() => setIsOpen(false)}>
            <Image src={imgLogo} alt='Logo fiona' width='166' height='45' />
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
              return (
                <Link
                  href={link.link}
                  key={index}
                  onClick={() => setIsOpen(false)}
                >
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

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

// Assets
import imgLogo from '../../../public/img/logo.png';

export const metadata: Metadata = {
  title: 'Fiona',
  description: 'Manejo de finanzas personales',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='grid lg:grid-cols-[200px_1fr] h-screen'>
          <aside className='hidden lg:block bg-primary p-4'>
            <Image src={imgLogo} alt='Logo fiona' />
            <ul className='mt-4 text-white'>
              <li className='mb-2'>Movimientos</li>
              <li className='mb-2'>Cuentas</li>
              <li className='mb-2'>Eventos</li>
            </ul>
          </aside>

          <main className='py-8 px-4 lg:px-16 2xl:w-[1440px] 2xl:mx-auto'>{children}</main>
        </div>
      </body>
    </html>
  );
}

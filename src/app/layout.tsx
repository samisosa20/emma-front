import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] });
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

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
        <Providers>
          <ToastContainer
            position='top-right'
            autoClose={4000}
            hideProgressBar={true}
            newestOnTop={false}
            rtl={false}
            pauseOnFocusLoss
            draggable={false}
            limit={10}
            pauseOnHover
            theme='colored'
            style={{ width: 'auto' }}
          />
          {children}
        </Providers>
      </body>
    </html>
  );
}

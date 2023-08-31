import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

// Component
import Header from "./components/Navbar";

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
          <Header/>

          <main className='py-8 px-4 lg:px-16 2xl:w-[1440px] 2xl:mx-auto'>{children}</main>
        </div>
      </body>
    </html>
  );
}

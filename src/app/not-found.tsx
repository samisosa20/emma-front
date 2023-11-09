import Link from 'next/link';
import Image from 'next/image';

// Assets
import imgLogo from '../../public/img/logo.png';

export default function NotFound() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-primary'>
      <div className='text-center w-11/12 max-w-[350px]'>
        <Image src={imgLogo} alt='Logo fiona' className='mx-auto mb-8' />
        <h1 className='text-xl text-white font-bold mb-8'>
          ¡Oops! Parece que te has perdido en la web
        </h1>
        <Link href='/login'>
          <p className='px-4 py-3 rounded-md font-semibold bg-yellow-400 hover:bg-yellow-200 text-primary border border-yellow-400 hover:bg-yellow-400 hover:text-white'>
            Ir a Inicio
          </p>
        </Link>
      </div>
    </div>
  );
}

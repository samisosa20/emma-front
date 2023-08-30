import Image from 'next/image';

// Assets
import imgLogo from '../../public/img/logo.png';

//components
import useComponents from "@/components";

const Login = () => {
  const { Button, Typography } = useComponents()
  return (
    <div className='flex items-center flex-col justify-center h-screen bg-primary space-y-4'>
      <Image src={imgLogo} alt='Logo fiona' />
      <div className='bg-white rounded-2xl border shadow-x1 py-10 px-8 max-w-[90vw] md:max-w-lg'>
        <div className='flex flex-col items-center space-y-4'>
          <Typography variant="h1" className='text-center'>
            Inicio de sesión
          </Typography>
          <Typography variant="p" className='w-5/6 text-center'>
            Hola, porfavor ingresa tu email y contraseña para acceder.
          </Typography>
          <input
            type='email'
            placeholder='Email'
            className='border-2 rounded-lg w-full h-12 px-4 text-primary'
          />
          <input
            type='password'
            placeholder='Contraseña'
            className='border-2 rounded-lg w-full h-12 px-4 text-primary'
          />
          <Button variant='contained' block>
            Iniciar sesión
          </Button>
        </div>
      </div>
      <Typography variant="p" className='text-white text-center'>
        © Copyright 2023 {' '}
        <a href='//itpmsoftware.com' target='_blank'>
          Sammy Guttman
        </a>
      </Typography>
    </div>
  );
}

export default Login
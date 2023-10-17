'use client';
import Image from 'next/image';
import { Controller } from 'react-hook-form';

// Assets
import imgLogo from '../../public/img/logo.png';

//components
import useComponents from '@/share/components';

import useLogin from './controller';

const Login = () => {
  const { Button, Typography, Input, FormControl, Checbox } = useComponents();

  const { handleSubmit, onSubmit, control } = useLogin();

  return (
    <div className='flex items-center flex-col justify-center h-screen bg-primary space-y-4'>
      <Image src={imgLogo} alt='Logo fiona' />
      <div className='bg-white rounded-2xl border shadow-x1 py-10 px-8 max-w-[90vw] md:max-w-lg'>
        <div className='flex flex-col items-center space-y-4'>
          <Typography variant='h1' className='text-center'>
            Inicio de sesión
          </Typography>
          <Typography variant='p' className='w-5/6 text-center'>
            Hola, porfavor ingresa tu email y contraseña para acceder.
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
            <Controller
              name={'email'}
              control={control}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <FormControl fieldState={fieldState}>
                  <Input
                    type='email'
                    placeholder='Email'
                    onChange={(e) => {
                      onChange(e);
                    }}
                    iserror={!!fieldState.error}
                    value={value}
                  />
                </FormControl>
              )}
            />
            <Controller
              name={'password'}
              control={control}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <FormControl fieldState={fieldState}>
                  <Input
                    type='password'
                    placeholder='Contraseña'
                    onChange={(e) => {
                      onChange(e);
                    }}
                    iserror={!!fieldState.error}
                    value={value}
                  />
                </FormControl>
              )}
            />
            <Controller
              name={'remind'}
              control={control}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <FormControl withOutHeight fieldState={fieldState}>
                  <div className="h-[45px] ml-auto w-min">
                    <Checbox
                      label='Recordarme'
                      handleCheckboxChange={(e: any) => {
                        onChange(e);
                      }}
                      isChecked={!!value}
                    />
                  </div>
                </FormControl>
              )}
            />
            <Button variant='contained' block type='submit'>
              Iniciar sesión
            </Button>
          </form>
        </div>
      </div>
      <Typography variant='p' className='text-white text-center'>
        © Copyright 2023{' '}
        <a href='//itpmsoftware.com' target='_blank'>
          Sammy Guttman
        </a>
      </Typography>
    </div>
  );
};

export default Login;

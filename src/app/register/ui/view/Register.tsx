import Image from 'next/image';
import Link from 'next/link';
import { Controller } from 'react-hook-form';

// Assets
import imgLogo from '../../../../../public/img/logo.png';

//components
import useComponents from '@/share/components';

export default function Register(props: any) {
  const { Button, Typography, Input, FormControl, Select } = useComponents();

  const { handleSubmit, onSubmit, control, currencyOptions } = props;

  return (
    <div className='flex items-center flex-col justify-center h-screen bg-primary space-y-4'>
      <Image src={imgLogo} alt='Logo fiona' />
      <div className='bg-white rounded-2xl border shadow-x1 py-8 2xl:py-10 px-8 max-w-[90vw] md:max-w-lg'>
        <div className='flex flex-col items-center space-y-4'>
          <Typography variant='h1' className='text-center'>
            Registro
          </Typography>
          <Typography variant='p' className='w-5/6 text-center'>
            Hola! estas a un paso de comenzar una nueva aventura, completa el siguiente formulario para crear tu cuenta.
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
            <Controller
              name={'name'}
              control={control}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <FormControl fieldState={fieldState}>
                  <Input
                    type='text'
                    placeholder='Nombre'
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
              name={'badge_id'}
              control={control}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <FormControl fieldState={fieldState}>
                  <Select
                  placeholder='Divisa por defecto'
                  id='badge_id'
                  onChange={(e) => {
                    onChange(e);
                  }}
                  options={currencyOptions}
                  iserror={!!fieldState.error}
                  value={value}
                />
                </FormControl>
              )}
            />
            <Button variant='contained' block type='submit'>
              Registrar
            </Button>
            <Link href={'/'}>
              <Typography variant='p' className='underline mt-4 text-center'>
                Ya tengo cuenta
              </Typography>
            </Link>
          </form>
        </div>
      </div>
      <Typography variant='p' className='text-white text-center'>
        © Copyright 2023
      </Typography>
    </div>
  );
};

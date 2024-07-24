import Image from 'next/image';
import Link from 'next/link';
import { Controller } from 'react-hook-form';

// Assets
import imgLogo from '../../../../../../public/img/logo.png';

//components
import useComponents from '@/share/components';

export default function Register(props: any) {
  const { Button, Typography, Input, FormControl, AutoComplete } = useComponents();

  const { handleSubmit, onSubmit, control, currencyOptions, isSubmitting } = props;

  return (
    <div className='flex items-center flex-col justify-center min-h-screen bg-primary space-y-4 py-8'>
      <Image src={imgLogo} alt="Logo emma" className="w-[250px] 2xl:w-[350px]" loading="lazy" height={94} width={350} />
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
                  <AutoComplete
                  placeholder='Divisa por defecto'
                  id='badge_id'
                  handleOnChange={(e: any) => {
                    onChange(e);
                  }}
                  options={currencyOptions}
                  iserror={!!fieldState.error}
                  value={value}
                />
                </FormControl>
              )}
            />
            <Button variant='contained' block type='submit' disabled={isSubmitting}>
              Registrar
            </Button>
            <Link href={'/login'}>
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

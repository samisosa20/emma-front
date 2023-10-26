import { Controller } from 'react-hook-form';
import { MdOutlineExitToApp } from 'react-icons/md';

//components
import useComponents from '@/share/components';

export default function Profile(props: any) {
  const { handleLogout, currencyOptions = [], control, onSubmit, handleSubmit } = props;
  const { Typography, Input, Select, FormControl, Button } = useComponents();

  return (
    <div>
      <div className='flex items-center justify-between w-full'>
        <div>
          <Typography variant='h1'>Perfil</Typography>
          <Typography>Edita tu informacion</Typography>
        </div>
        <div>
          <Button className='flex items-center space-x-2 bg-white p-2 rounded shadow-sm' onClick={handleLogout}>
            <MdOutlineExitToApp />
            <Typography>Cerrar sesion</Typography>
          </Button>
        </div>
      </div>
      <div className='mt-6 bg-white rounded shadow-sm py-6 px-4'>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
            name={'name'}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <FormControl fieldState={fieldState} withLabel={true}>
                <Input
                  type='text'
                  placeholder='Nombre'
                  label='Nombre'
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
              <FormControl fieldState={fieldState} withLabel={true}>
                <Input
                  type='password'
                  placeholder='Contraseña'
                  label='Contraseña'
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
              <FormControl fieldState={fieldState} withLabel={true}>
                <Select
                  label='Moneda'
                  placeholder='Seleciona una opcion'
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

          <Button type='submit' className='w-full'>
            Aplicar
          </Button>
        </form>
      </div>
    </div>
  );
}

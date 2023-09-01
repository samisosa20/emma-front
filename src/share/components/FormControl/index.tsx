import Typography from '../Typography';

import { FormControlProps } from './FormControl.interface';

const FormControl = (props: FormControlProps) => {
  const { fieldState } = props;
  return (
    <div className='h-[75px]'>
      {props.children}
      {fieldState.error && (
        <Typography variant='h6' className='text-red-500'>
          {fieldState.error?.message}
        </Typography>
      )}
    </div>
  );
};

export default FormControl;

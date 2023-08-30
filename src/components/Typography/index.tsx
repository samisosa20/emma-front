import { twMerge } from "tailwind-merge";

// Interface
import { TypographyProps } from './typography.interface';
// Style
import { useTheme } from './typography.styles';

const Button = (props: TypographyProps) => {
  const {
    children,
    onClick,
    className = '',
    variant = 'p',
  } = props;

  const { typography } = useTheme();

  const Element = variant 
  return (
    <Element
      onClick={onClick}
      className={twMerge(
        typography[variant],
        className
      )}
    >
      {children}
    </Element>
  );
};

export default Button;

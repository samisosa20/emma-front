import { twMerge } from "tailwind-merge";

// Interface
import { TypographyProps } from './Typography.interface';
// Style
import { useTheme } from './Typography.styles';

const Button = (props: TypographyProps) => {
  const {
    id,
    children,
    onClick,
    className = '',
    variant = 'p',
  } = props;

  const { typography } = useTheme();

  const Element = variant 
  return (
    <Element
      id={id}
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

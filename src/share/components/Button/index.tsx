import { twMerge } from "tailwind-merge";

// Interface
import { ButtonProps } from './Button.interface';

// Style
import { useTheme } from './Button.styles';

const Button = (props: ButtonProps) => {
  const {
    children,
    onClick,
    className = '',
    size = 'md',
    variant = 'contained',
    color = 'default',
    block = false,
    disabled = false,
    style,
    onMouseEnter,
    onMouseLeave,
  } = props;

  const { button } = useTheme();
  return (
    <button
      onClick={onClick}
      className={twMerge(
        button.base,
        button.size[size],
        button.variant[variant],
        button[variant][color],
        block && button.block,
        disabled && button.disabled,
        className
      )}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </button>
  );
};

export default Button;

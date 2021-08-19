import styles from './Button.module.css';

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  name?: string;
  disabled?: boolean;
}

const Button = ({
  onClick,
  name,
  disabled,
  className,
  children,
  style,
}: ButtonProps) => {
  return (
    <button
      name={name}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${className}`}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;

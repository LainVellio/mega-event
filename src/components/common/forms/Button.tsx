import styles from './Button.module.css';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  name?: string;
  disabled?: boolean;
}

const Button = ({
  onClick,
  name,
  disabled,
  className,
  children,
}: ButtonProps) => {
  return (
    <button
      name={name}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

import React from 'react';

import styles from './Button.module.css';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({
  onClick,
  type = 'button',
  name,
  disabled,
  className,
  children,
  style,
}: ButtonProps) => {
  return (
    <button
      type={type}
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

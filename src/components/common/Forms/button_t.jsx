import styles from './button.module.css';

const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={`${styles.button} ${props.className}`}
    >
      {props.children}
    </button>
  );
};

export default Button;

import styles from './Input.module.css';

export const InputReduxForm = ({ input, meta, ...props }) => {
  <div className={styles.inputBlock}>
    {props.value && <label>{props.placeholder}</label>}
    <input
      className={styles.input}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      type={props.type}
    />
  </div>;
};

import styles from './Checkbox.module.css';
import stateOn from '../../../assets/Images/State=on.svg';
import stateOff from '../../../assets/Images/State=off.svg';

const Checkbox = (props) => {
  return (
    <div className={styles.container}>
      <img
        id={props.id}
        onClick={props.onClick}
        src={props.checked ? stateOn : stateOff}
        alt=""
      />
      <div className={styles.text}>{props.text}</div>
    </div>
  );
};

export default Checkbox;

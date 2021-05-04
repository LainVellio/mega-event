import styles from './Checkbox.module.css';
import stateOn from '../../../assets/Images/CheckboxOn.svg';
import stateOff from '../../../assets/Images/CheckboxOff.svg';

const Checkbox = (props) => {
  return (
    <div
      id={props.id}
      onClick={props.onClick}
      className={`${styles.container} ${
        props.disabled ? styles.disabledContainer : ''
      }`}
    >
      <img
        className={styles.img}
        src={props.checked ? stateOn : stateOff}
        alt=""
      />
      <div
        className={`${styles.text} ${
          props.disabled ? styles.textDisabled : ''
        }`}
      >
        {props.text}
      </div>
    </div>
  );
};

export default Checkbox;

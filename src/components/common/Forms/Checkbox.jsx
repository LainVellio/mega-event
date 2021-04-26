import styles from './checkbox.module.css';
import stateOn from '../../../assets/images/checkboxOn.svg';
import stateOff from '../../../assets/images/checkboxOff.svg';

const Checkbox = (props) => {
  return (
    <div id={props.id} onClick={props.onClick} className={styles.container}>
      <img
        className={styles.img}
        src={props.checked ? stateOn : stateOff}
        alt=""
      />
      <div className={styles.text}>{props.text}</div>
    </div>
  );
};

export default Checkbox;

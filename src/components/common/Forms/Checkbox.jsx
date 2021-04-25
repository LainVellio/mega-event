import styles from './Checkbox.module.css';
import stateOn from '../../../assets/Images/CheckboxOn.svg';
import stateOff from '../../../assets/Images/CheckboxOff.svg';

const Checkbox = (props) => {
  return (
    <div id={props.id} onClick={props.onClick} className={styles.container}>
      <img src={props.checked ? stateOn : stateOff} alt="" />
      <div className={styles.text}>{props.text}</div>
    </div>
  );
};

export default Checkbox;

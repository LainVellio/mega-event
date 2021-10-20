import React from 'react';

import styles from './Checkbox.module.css';
import stateOn from '../../../assets/images/checkboxOn.svg';
import stateOff from '../../../assets/images/checkboxOff.svg';

interface CheckboxProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  checked: boolean;
  label: string;
}

const Checkbox = ({ onClick, disabled, checked, label }: CheckboxProps) => {
  return (
    <div
      onClick={onClick}
      className={`${styles.container} ${
        disabled ? styles.disabledContainer : ''
      }`}
    >
      <img className={styles.img} src={checked ? stateOn : stateOff} alt="" />
      <div className={`${styles.text} ${disabled ? styles.textDisabled : ''}`}>
        {label}
      </div>
    </div>
  );
};

export default Checkbox;

import React from 'react';

import styles from './Checkbox.module.css';
import stateOn from '../../../assets/images/checkboxOn.svg';
import stateOff from '../../../assets/images/checkboxOff.svg';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  formik: any;
}

const FormikCheckbox = ({ name, label, disabled, formik }: CheckboxProps) => {
  const checked = formik.values[name!];
  return (
    <div
      onClick={() => formik.setFieldValue(name, !checked)}
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

export default FormikCheckbox;

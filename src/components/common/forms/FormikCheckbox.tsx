import React from 'react';
import { FormikProps } from 'formik';

import { ResultForm } from '../../../store/interfaces';

import styles from './Checkbox.module.css';
import stateOn from '../../../assets/images/checkboxOn.svg';
import stateOff from '../../../assets/images/checkboxOff.svg';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: keyof ResultForm;
  label: string;
  formik: FormikProps<ResultForm>;
}

const FormikCheckbox = ({ name, label, disabled, formik }: CheckboxProps) => {
  const checked = formik.values[name];
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

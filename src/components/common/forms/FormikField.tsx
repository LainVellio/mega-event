import React, { useRef, useState } from 'react';
import { FormikProps } from 'formik';
import MaskedInput from 'react-text-mask';

import styles from './InputField.module.css';
import eyeOpenDisabled from '../../../assets/images/eyeOpenDisabled.svg';
import eyeOpenActive from '../../../assets/images/eyeOpenActive.svg';
import eyeClosed from '../../../assets/images/eyeClosed.svg';

interface IFormikField<T>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'> {
  name: keyof T;
  formik: FormikProps<T>;
  mask: Array<RegExp | string> | false;
}

const FormikField = <T,>({
  name,
  type,
  placeholder,
  disabled,
  formik,
  mask,
}: IFormikField<T>) => {
  const { handleBlur, handleChange } = formik;
  const value = formik.values[name];
  const isTouched = formik.touched[name];
  const error = formik.errors[name];

  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputRef = useRef<MaskedInput>(null);

  const onFocus = () => {
    setIsFocused(true);
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    handleBlur(e);
    setIsFocused(false);
  };

  const onMouseDownEye = () => {
    setIsPasswordVisible(true);
  };

  const onMouseUpEye = () => {
    setIsPasswordVisible(false);
    inputRef.current && inputRef.current.inputElement.focus();
  };

  const onChangeEye = () => {
    if (!isFocused && !isPasswordVisible) {
      return eyeOpenDisabled;
    } else if (isFocused && !isPasswordVisible) {
      return eyeClosed;
    } else return eyeOpenActive;
  };
  return (
    <div className={styles.inputBlock}>
      <div
        className={`${styles.input} ${
          isFocused && !disabled && styles.selected
        } ${disabled && styles.inputDisabled}`}
      >
        {(value || isFocused) && (
          <label className={styles.label}>{placeholder}</label>
        )}
        <MaskedInput
          name={typeof name === 'string' ? name : undefined}
          value={typeof value === 'string' ? value : undefined}
          mask={mask}
          className={
            styles.inputField +
              ' ' +
              ((value || isFocused) && styles.inputModified) || ''
          }
          placeholder={placeholder}
          onChange={handleChange}
          type={type === 'password' && isPasswordVisible ? 'text' : type}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          ref={inputRef}
        />

        {type === 'password' && (
          <img
            onMouseDown={onMouseDownEye}
            onMouseUp={onMouseUpEye}
            className={styles.eye}
            src={onChangeEye()}
            alt=""
          />
        )}
      </div>
      {isTouched && error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default FormikField;

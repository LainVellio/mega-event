import React, { useRef, useState } from 'react';

import styles from './InputField.module.css';

import eyeOpenDisabled from '../../../assets/images/eyeOpenDisabled.svg';
import eyeOpenActive from '../../../assets/images/eyeOpenActive.svg';
import eyeClosed from '../../../assets/images/eyeClosed.svg';

interface IFormikField extends React.InputHTMLAttributes<HTMLInputElement> {
  formik: any;
}

const FormikField = ({
  name,
  type,
  placeholder,
  disabled,
  formik,
}: IFormikField) => {
  const { handleBlur, handleChange } = formik;
  const value = formik.values[name!];
  const isTouched = formik.touched[name!];
  const error = formik.errors[name!];

  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
    inputRef.current && inputRef.current.focus();
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
        <input
          name={name}
          className={
            styles.inputField +
              ' ' +
              ((value || isFocused) && styles.inputModified) || ''
          }
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          type={type === 'password' && isPasswordVisible ? 'text' : type}
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

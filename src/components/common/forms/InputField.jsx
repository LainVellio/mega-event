import React, { useEffect, useRef, useState } from 'react';
import MaskedInput from 'react-text-mask';

import styles from './InputField.module.css';
import eyeOpenDisabled from '../../../assets/images/eyeOpenDisabled.svg';
import eyeOpenActive from '../../../assets/images/eyeOpenActive.svg';
import eyeClosed from '../../../assets/images/eyeClosed.svg';

const InputField = ({
  type,
  value,
  placeholder,
  disabled,
  validators,
  onChange,
  validate,
  mask,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [error, setError] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputRef = useRef('input');

  useEffect(() => {
    const checkValidate = () => {
      const error = validators
        .map((validator) => validator(value))
        .find((e) => e);
      setError(error);
      validate(!error);
    };

    validators && checkValidate();
  }, [value, isFocused]);

  const onFocus = (event) => {
    setIsFocused(true);
    setIsTouched(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  const onMouseDownEye = () => {
    setIsPasswordVisible(true);
  };

  const onMouseUpEye = () => {
    setIsPasswordVisible(false);
    inputRef.current.inputElement.focus();
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
          mask={mask}
          className={
            styles.inputField +
              ' ' +
              ((value || isFocused) && styles.inputModified) || ''
          }
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
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
      {isTouched && !isFocused && error && (
        <div className={styles.error}>{error}</div>
      )}
    </div>
  );
};

export default InputField;

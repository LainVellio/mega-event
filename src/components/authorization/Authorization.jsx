import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { login } from '../../redux/mainReducer';
import {
  email as emailValidator,
  required,
} from '../common/validators/validators';

import InputField from '../common/forms/InputField';
import Button from '../common/forms/Button';

import commonStyles from '../../App.module.css';
import styles from './Authorization.module.css';

const Authorization = ({
  login,
  isServerProgress,
  isAuth,
  serverErrorMessage,
}) => {
  const [loginData, setLogInData] = useState({ email: '', password: '' });
  const [isInputByValidate, setInputValidate] = useState({
    email: false,
    password: false,
  });
  const { email, password } = loginData;

  const handleChange = (fieldName) => (fieldValue) => {
    setLogInData({
      ...loginData,
      [fieldName]: fieldValue,
    });
  };

  const handleValidate = (fieldName) => (isValidateField) => {
    setInputValidate({
      ...isInputByValidate,
      [fieldName]: isValidateField,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const isButtonDisabled = () => {
    if (isServerProgress) return true;
    return !Object.values(isInputByValidate).every((i) => i);
  };

  return (
    <div>
      {isAuth && <Redirect to="/questionary" />}
      <h1 className={commonStyles.h1}>Добро пожаловать</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputBlock}>
          <div className={styles.email}>
            <InputField
              type="text"
              placeholder="E-mail"
              validators={[required, emailValidator]}
              value={email}
              onChange={handleChange('email')}
              validate={handleValidate('email')}
              disabled={isServerProgress}
              mask={false}
            />
          </div>

          <div>
            <InputField
              type="password"
              placeholder="Пароль"
              validators={[required]}
              value={password}
              onChange={handleChange('password')}
              validate={handleValidate('password')}
              disabled={isServerProgress}
              mask={false}
            />
            <div className={styles.serverError}>{serverErrorMessage}</div>
          </div>
        </div>
        <Button disabled={isButtonDisabled()}>Войти</Button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.reducer.isAuth,
  isServerProgress: state.reducer.isServerProgress,
  serverErrorMessage: state.reducer.serverErrorMessage,
});

export default connect(mapStateToProps, { login })(Authorization);

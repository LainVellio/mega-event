import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { login } from '../../redux/reducer';
import { email, required } from '../common/validators/validators';

import InputField from '../common/forms/InputField';
import Button from '../common/forms/Button';

import commonStyles from '../../App.module.css';
import styles from './Authorization.module.css';

const Authorization = (props) => {
  const [logInData, setLogInData] = useState({ email: '', password: '' });
  const [inputValidate, setInputValidate] = useState({
    email: false,
    password: false,
  });

  const handleChange = (fieldName) => (fieldValue) => {
    setLogInData({
      ...logInData,
      [fieldName]: fieldValue,
    });
  };

  const handleValidate = (fieldName) => (isValidateField) => {
    setInputValidate({
      ...inputValidate,
      [fieldName]: isValidateField,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.login(logInData.email, logInData.password);
  };

  const isDisabledButton = () => {
    if (props.isServerProgress) return true;
    else
      for (let i in inputValidate) {
        if (!inputValidate[i]) return true;
      }
    return false;
  };

  return (
    <div>
      {props.isAuth && <Redirect to="/questionary" />}
      <h1 className={commonStyles.h1}>Добро пожаловать</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputBlock}>
          <div className={styles.email}>
            <InputField
              type="text"
              placeholder="E-mail"
              validators={[required, email]}
              value={logInData.email}
              onChange={handleChange('email')}
              validate={handleValidate('email')}
              disabled={props.isServerProgress}
              mask={false}
            />
          </div>

          <div>
            <InputField
              type="password"
              placeholder="Пароль"
              validators={[required]}
              value={logInData.password}
              onChange={handleChange('password')}
              validate={handleValidate('password')}
              disabled={props.isServerProgress}
              mask={false}
            />
            <div className={styles.serverError}>{props.serverErrorMessage}</div>
          </div>
        </div>
        <Button disabled={isDisabledButton()}>Войти</Button>
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

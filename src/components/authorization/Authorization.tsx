import { useState } from 'react';
import { Redirect } from 'react-router';

import {
  email as emailValidator,
  required,
} from '../common/validators/validators';

import InputField from '../common/forms/InputField';
import Button from '../common/forms/Button';

import commonStyles from '../../App.module.css';
import styles from './Authorization.module.css';
import ButtonLink from '../common/forms/ButtonLink';

interface AuthorizationProps {
  login: Function;
  isServerProgress: boolean;
  isAuth: boolean;
  serverErrorMessage: string;
}

const Authorization = ({
  login,
  isServerProgress,
  isAuth,
  serverErrorMessage,
}: AuthorizationProps) => {
  const [loginData, setLogInData] = useState({ email: '', password: '' });
  const [isInputByValidate, setInputValidate] = useState({
    email: false,
    password: false,
  });
  const { email, password } = loginData;

  const handleChange = (fieldName: string) => (fieldValue: string) => {
    setLogInData({
      ...loginData,
      [fieldName]: fieldValue,
    });
  };

  const handleValidate = (fieldName: string) => (isValidateField: string) => {
    setInputValidate({
      ...isInputByValidate,
      [fieldName]: isValidateField,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
        <div className={styles.mediaLinks}>
          <ButtonLink className={styles.button} to="/media">
            Медиафайлы
          </ButtonLink>
          <ButtonLink className={styles.button} to="/animation">
            CSS анимация
          </ButtonLink>
          <ButtonLink className={styles.button} to="/moment">
            MomentJS
          </ButtonLink>
          <ButtonLink className={styles.button} to="/events">
            Events
          </ButtonLink>
          <ButtonLink to="/grid">Grid</ButtonLink>
        </div>
      </form>
    </div>
  );
};

export default Authorization;

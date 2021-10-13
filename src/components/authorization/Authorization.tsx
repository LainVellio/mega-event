import React from 'react';
import { Redirect } from 'react-router';
import { useFormik } from 'formik';

import validate from './validate';
import FormikField from '../common/forms/FormikField';
import Button from '../common/forms/Button';
import ButtonLink from '../common/forms/ButtonLink';

import commonStyles from '../../App.module.css';
import styles from './Authorization.module.css';

export interface ILoginData {
  email: string;
  password: string;
}

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
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: validate,
    onSubmit: (values: ILoginData) => {
      login(values.email, values.password);
    },
  });
  const isButtonDisabled = () => {
    if (isServerProgress) return true;
    return Object.values(formik.errors).some((i) => i);
  };

  return (
    <div>
      {isAuth && <Redirect to="/questionary" />}
      <h1 className={commonStyles.h1}>Добро пожаловать</h1>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.inputBlock}>
          <div className={styles.email}>
            <FormikField
              name="email"
              type="text"
              placeholder="E-mail"
              formik={formik}
              disabled={isServerProgress}
            />
          </div>

          <div>
            <FormikField
              name="password"
              type="password"
              placeholder="Пароль"
              formik={formik}
              disabled={isServerProgress}
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
          <ButtonLink className={styles.button} to="/grid">
            Grid
          </ButtonLink>
          <ButtonLink to="/ChartJS">ChartJS</ButtonLink>
        </div>
      </form>
    </div>
  );
};

export default Authorization;

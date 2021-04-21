import React from 'react';
import serverAPI from '../../serverAPI/serverAPI';
import Input from '../common/Forms/Input';
import { required } from '../common/validators/validators';
import styles from './Authorization.module.css';

class AuthorizationContainer extends React.Component {
  state = {
    isAuth: false,
    email: '',
    password: '',
  };

  onAuth() {
    serverAPI.auth().then((response) => console.log(response));
  }

  render() {
    return (
      <div className={styles.authForm}>
        <h1>Добро пожаловать</h1>

        <Input
          placeholder="E-mail"
          value={this.state.email}
          validate={[required]}
        />
        <div>
          <Input
            placeholder="Пароль"
            value={this.state.password}
            type="password"
            validate={[required]}
          />
        </div>
        <button onClick={this.onAuth} className={styles.button}>
          Войти
        </button>
      </div>
    );
  }
}

export default AuthorizationContainer;

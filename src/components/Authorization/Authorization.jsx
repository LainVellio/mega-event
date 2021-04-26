import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import Input from '../common/forms/input';
import Button from '../common/forms/button';
import { email, required } from '../common/validators/validators';
import { login } from '../../redux/authReducer';
import commonStyles from '../../App.module.css';
import styles from './authorization.module.css';

class Authorization extends React.Component {
  state = {
    inputs: [
      {
        id: 0,
        value: '',
        placeholder: 'E-mail',
        type: 'text',
        validate: [required, email],
        isValidate: false,
      },
      {
        id: 1,
        value: '',
        placeholder: 'Пароль',
        type: 'password',
        validate: [required],
        isValidate: false,
      },
    ],
  };

  setValidate = (id, isValidate) => {
    this.setState({
      ...this.state,
      inputs: this.state.inputs.map((i) =>
        i.id === Number(id) ? { ...i, isValidate } : i,
      ),
    });
  };

  onChange = (e) => {
    const id = e.currentTarget.id;
    const value = e.currentTarget.value;
    this.setState({
      ...this.state,
      inputs: this.state.inputs.map((i) =>
        i.id === Number(id) ? { ...i, value } : i,
      ),
    });
  };

  onClick = () => {
    this.props.login(this.state.email, this.state.password);
  };

  render() {
    return (
      <div>
        {this.props.isAuth && <Redirect to="/questionary" />}
        <h1 className={commonStyles.h1}>Добро пожаловать</h1>
        <form className={styles.form}>
          <div className={styles.inputBlock}>
            {this.state.inputs.map((input) => (
              <Input
                key={input.id}
                {...input}
                onChange={this.onChange}
                setValidate={this.setValidate}
              />
            ))}
          </div>
          <Button
            onClick={this.onClick}
            disabled={!this.state.inputs.every((i) => i.isValidate === true)}
          >
            Войти
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Authorization);

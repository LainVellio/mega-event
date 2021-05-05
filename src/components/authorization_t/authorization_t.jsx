import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import Input from '../common/forms/input';
import Button from '../common/forms/button';
import { email, required } from '../common/validators/validators';
import { login, setServerErrorMessage } from '../../redux/reducer';
import commonStyles from '../../App.module.css';
import styles from './authorization.module.css';

class Authorization extends React.Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
  }
  state = {
    inputs: [
      {
        id: 0,
        value: '',
        placeholder: 'E-mail',
        type: 'text',
        validate: [required, email],
        isValidate: true,
      },
      {
        id: 1,
        value: '',
        placeholder: 'Пароль',
        type: 'password',
        validate: [required],
        isValidate: true,
      },
    ],
  };

  componentDidMount() {
    const EMAIL = process.env.REACT_APP_EMAIL || '';
    const PASSWORD = process.env.REACT_APP_PASSWORD || '';
    this.setState({
      ...this.state,
      inputs: this.state.inputs.map((i) =>
        i.id === 0 ? { ...i, value: EMAIL } : { ...i, value: PASSWORD },
      ),
    });
  }

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
    this.props.setServerErrorMessage('');
    this.setState({
      ...this.state,
      inputs: this.state.inputs.map((i) =>
        i.id === Number(id) ? { ...i, value } : i,
      ),
    });
  };

  onClick = () => {
    const email = this.state.inputs[0].value;
    const password = this.state.inputs[1].value;
    this.props.login(email, password);
  };

  isDisabledButton = () => {
    return (
      !this.state.inputs.every((i) => i.isValidate === true) ||
      this.props.isServerProgress
    );
  };
  isDisabledInput = () => {
    return this.props.isServerProgress;
  };

  render() {
    return (
      <div>
        {this.props.isAuth && <Redirect to="/questionary" />}
        <h1 className={commonStyles.h1}>Добро пожаловать</h1>
        <div className={styles.form}>
          <div className={styles.inputBlock}>
            <div className={styles.email}>
              <Input
                disabled={this.isDisabledInput()}
                key={this.state.inputs[0].id}
                {...this.state.inputs[0]}
                onChange={this.onChange}
                setValidate={this.setValidate}
              />
            </div>

            <div>
              <Input
                disabled={this.isDisabledInput()}
                key={this.state.inputs[1].id}
                {...this.state.inputs[1]}
                onChange={this.onChange}
                setValidate={this.setValidate}
              />
              <div className={styles.serverError}>
                {this.props.serverErrorMessage}
              </div>
            </div>
          </div>
          <Button onClick={this.onClick} disabled={this.isDisabledButton()}>
            Войти
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.reducer.isAuth,
  isServerProgress: state.reducer.isServerProgress,
  serverErrorMessage: state.reducer.serverErrorMessage,
  isListComplete: state.reducer.isListComplete,
});

export default connect(mapStateToProps, { login, setServerErrorMessage })(
  Authorization,
);
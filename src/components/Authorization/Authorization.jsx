import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import Input from '../common/forms/Input';
import Button from '../common/forms/Button';
import { email as emailValidator, required } from '../common/validators/validators';
import { login, setServerErrorMessage } from '../../redux/reducer';
import commonStyles from '../../App.module.css';
import styles from './Authorization.module.css';

class Authorization extends React.Component {
	state = {
		inputValueByKey: {
			email: '',
			password: ''
		},
		inputValidatedByKey: {
			email: false,
			password: false
		}
	};

	componentDidMount() {
		const EMAIL = process.env.REACT_APP_EMAIL || '';
		const PASSWORD = process.env.REACT_APP_PASSWORD || '';

		this.setState({
			inputValueByKey: {
				email: EMAIL,
				password: PASSWORD
			}
		});
	}

	setValidate = (id, isValidate) => {
		const { inputValidatedByKey } = this.state;

		this.setState({
			inputValidatedByKey: {
				...inputValidatedByKey,
				[id]: isValidate
			}
		});
	};

	onChange = (e) => {
		const { id, value } = e.currentTarget;
		const { inputValueByKey } = this.state;

		this.props.setServerErrorMessage('');
		this.setState({
			inputValueByKey: {
				...inputValueByKey,
				[id]: value
			}
		});
	};

	onLoginClick = () => {
		const { email, password } = this.state.inputValueByKey;
		this.props.login(email, password);
	};

	isButtonDisabled = () => {
		const { inputValidatedByKey } = this.state;
		return !Object.values(inputValidatedByKey).every((val) => val) || this.props.isServerProgress;
	};

	isInputsDisabled = () => {
		return this.props.isServerProgress;
	};

	render() {
		const { password, email } = this.state.inputValueByKey;

		return (
			<div>
				{this.props.isAuth && <Redirect to="/questionary" />}
				<h1 className={commonStyles.h1}>Добро пожаловать</h1>
				<div className={styles.form}>
					<div className={styles.inputBlock}>
						<div className={styles.email}>
							<Input
								id="email"
								disabled={this.isInputsDisabled()}
								placeholder="E-mail"
								type="text"
								validate={[ required, emailValidator ]}
								onChange={this.onChange}
								setValidate={this.setValidate}
								value={email}
							/>
						</div>
						<div>
							<Input
								id="password"
								disabled={this.isInputsDisabled()}
								placeholder="Пароль"
								type="password"
								validate={[ required ]}
								onChange={this.onChange}
								setValidate={this.setValidate}
								value={password}
							/>
							<div className={styles.serverError}>{this.props.serverErrorMessage}</div>
						</div>
					</div>
					<Button onClick={this.onLoginClick} disabled={this.isButtonDisabled()}>
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
});

export default connect(mapStateToProps, { login, setServerErrorMessage })(Authorization);

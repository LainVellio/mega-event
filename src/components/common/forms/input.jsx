import React from 'react';

import styles from './input.module.css';
import eyeOpenDisabled from '../../../assets/images/eyeOpenDisabled.svg';
import eyeOpenActive from '../../../assets/images/eyeOpenActive.svg';
import eyeClosed from '../../../assets/images/eyeClosed.svg';

class Input extends React.Component {
  state = {
    isFocused: false,
    isTouched: false,
    error: '',
    isPasswordVisible: false,
  };

  checkValidate = () => {
    const error = this.props.validate
      .map((validator) => validator(this.props.value))
      .find((e) => e);
    this.setState({ error: error });
    this.props.setValidate(this.props.id, !error);
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      (prevProps.value !== this.props.value ||
        prevState.isFocused !== this.state.isFocused) &&
      this.props.validate
    ) {
      this.checkValidate();
    }
  }

  onFocus = (event) => {
    this.setState({
      isFocused: true,
      isTouched: true,
    });
  };

  onBlur = () => {
    this.setState({
      isFocused: false,
    });
  };

  onMouseDownEye = () => {
    this.setState({
      isPasswordVisible: true,
    });
  };

  onMouseUpEye = () => {
    this.setState({
      isPasswordVisible: false,
    });
    this.ref.focus();
  };

  onChangeEye = () => {
    if (!this.state.isFocused && !this.state.isPasswordVisible) {
      return eyeOpenDisabled;
    } else if (this.state.isFocused && !this.state.isPasswordVisible) {
      return eyeClosed;
    } else return eyeOpenActive;
  };

  render() {
    return (
      <div className={styles.inputBlock}>
        <div
          className={`${styles.input} ${
            this.state.isFocused && !this.props.disabled && styles.selected
          } ${this.props.disabled && styles.inputDisabled}`}
        >
          {(this.props.value || this.state.isFocused) && (
            <label className={styles.label}>{this.props.placeholder}</label>
          )}
          <input
            disabled={this.props.disabled}
            className={
              styles.inputField +
                ' ' +
                ((this.props.value || this.state.isFocused) &&
                  styles.inputModified) || ''
            }
            id={this.props.id}
            value={this.props.value}
            onChange={this.props.onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            placeholder={this.props.placeholder}
            type={
              this.props.type === 'password' && this.state.isPasswordVisible
                ? 'text'
                : this.props.type
            }
            ref={(ref) => (this.ref = ref)}
          />

          {this.props.type === 'password' && (
            <img
              onMouseDown={this.onMouseDownEye}
              onMouseUp={this.onMouseUpEye}
              className={styles.eye}
              src={this.onChangeEye()}
              alt=""
            />
          )}
        </div>
        {this.state.isTouched && !this.state.isFocused && this.state.error && (
          <div className={styles.error}>{this.state.error}</div>
        )}
      </div>
    );
  }
}

export default Input;

import styles from './Input.module.css';
import React from 'react';
import eyeOpenDisabled from '../../../assets/Images/EyeOpenDisabled.svg';
import eyeOpenActive from '../../../assets/Images/EyeOpenActive.svg';
import eyeClosed from '../../../assets/Images/EyeClosed.svg';

class Input extends React.Component {
  state = {
    value: '',
    isFocused: false,
    isTouched: false,
    error: '',
    isPasswordVisible: false,
  };

  componentDidUpdate(prevProps, prevState) {
    prevState.value !== this.state.value ||
      (prevState.isFocused !== this.state.isFocused &&
        this.props.validate &&
        this.props.validate.map((validator) =>
          this.setState({ error: validator(this.state.value) }),
        ));
  }

  onChange = (e) => {
    const value = e.currentTarget.value;
    this.setState({
      value: value,
    });
    console.log('отпустил', this.state.isPasswordVisible);
  };

  onFocus = (event) => {
    this.setState({
      isFocused: true,
      isTouched: true,
    });
    this.ref.selectionStart = this.state.value.length;
    this.ref.selectionEnd = this.state.value.length;
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
    this.ref.focus();
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
            this.state.isFocused && styles.selected
          }`}
        >
          {(this.state.value || this.state.isFocused) && (
            <label>{this.props.placeholder}</label>
          )}
          <input
            className={
              (this.state.value || this.state.isFocused) && styles.inputModified
            }
            value={this.value}
            onChange={this.onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            placeholder={this.props.placeholder}
            type={
              this.props.type === 'password' && this.state.isPasswordVisible
                ? 'text'
                : this.props.type
            }
            autocomplete="off"
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

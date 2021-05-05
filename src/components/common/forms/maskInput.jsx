import React from 'react';
import MaskedInput from 'react-text-mask';

import styles from './input.module.css';

class MaskInput extends React.Component {
  state = {
    isFocused: false,
    isTouched: false,
    error: '',
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
          <MaskedInput
            mask={this.props.mask}
            showMask={false}
            placeholderChar={'\u2000'}
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
            type={this.props.type}
          />
        </div>
        {this.state.isTouched && !this.state.isFocused && this.state.error && (
          <div className={styles.error}>{this.state.error}</div>
        )}
      </div>
    );
  }
}

export default MaskInput;

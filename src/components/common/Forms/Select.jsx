import React from 'react';

import styles from './Select.module.css';
import dropDown from '../../../assets/Images/ArrowDropDown.svg';
import dropUp from '../../../assets/Images/ArrowDropUp.svg';

class Select extends React.Component {
  state = { isOpen: false };

  onClickMain = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  isSelected = () => {
    const item = this.props.eventsDate.find((i) => i.isSelected === true);
    return item ? item.label : 'День мероприятия';
  };

  render() {
    const Field = (props) => {
      const onClickDate = () => {
        this.setState({ isOpen: false });
        props.selectDate(props.data.id);
      };
      return (
        <div className={styles.input}>
          <div
            data={props.data}
            onClick={onClickDate}
            className={`${styles.date}`}
          >
            {props.data.label}
          </div>
        </div>
      );
    };

    return (
      <div className={styles.selectBlock}>
        <div
          onClick={this.onClickMain}
          className={`${styles.inputBlock} ${
            this.props.disabled ? styles.inputBlockDisabled : ''
          }`}
        >
          <div
            className={`${styles.input} ${
              this.props.disabled ? styles.inputDisabled : ''
            }`}
          >
            <div className={styles.text}>{this.isSelected()}</div>
            <img
              className={styles.img}
              src={this.state.isOpen ? dropUp : dropDown}
              alt=""
            />
          </div>
        </div>
        {this.state.isOpen && (
          <div className={styles.inputBlock}>
            {this.props.eventsDate.map((i) => (
              <Field key={i.id} data={i} selectDate={this.props.selectDate} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Select;

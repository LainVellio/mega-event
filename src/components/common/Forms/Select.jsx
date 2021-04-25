import styles from './Select.module.css';
import dropDown from '../../../assets/Images/ArrowDropDown.svg';
import dropUp from '../../../assets/Images/ArrowDropUp.svg';
import React from 'react';

class Select extends React.Component {
  state = { isOpen: false };

  onClickMain = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  isSelected = () => {
    const item = this.props.selectData.find((i) => i.isSelected === true);
    return item ? item.date : 'День мероприятия';
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
            {props.data.date}
          </div>
        </div>
      );
    };

    return (
      <div className={styles.selectBlock}>
        <div onClick={this.onClickMain} className={styles.inputBlock}>
          <div className={`${styles.input}`}>
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
            {this.props.selectData.map((i) => (
              <Field data={i} selectDate={this.props.selectDate} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Select;

import React, { useState } from 'react';

import styles from './Select.module.css';
import dropDown from '../../../assets/images/arrowDropDown.svg';
import dropUp from '../../../assets/images/arrowDropUp.svg';

const Select = ({ eventsDate, selectEventDate, onSelect, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClickMain = () => {
    setIsOpen({ isOpen: !isOpen });
  };

  const Field = (props) => {
    const onClickDate = () => {
      setIsOpen(false);
      onSelect(props.id);
    };
    return (
      <div className={styles.input}>
        <div onClick={onClickDate} className={`${styles.date}`}>
          {props.label}
        </div>
      </div>
    );
  };
  return (
    <div className={styles.selectBlock}>
      <div
        onClick={onClickMain}
        className={`${styles.inputBlock} ${
          disabled ? styles.inputBlockDisabled : ''
        }`}
      >
        <div
          className={`${styles.input} ${disabled ? styles.inputDisabled : ''}`}
        >
          <div className={styles.text}>
            {selectEventDate || 'День мероприятия'}
          </div>
          <img className={styles.img} src={isOpen ? dropUp : dropDown} alt="" />
        </div>
      </div>
      {isOpen && (
        <div className={styles.inputBlock}>
          {eventsDate.map((i) => (
            <Field key={i.id} {...i} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;

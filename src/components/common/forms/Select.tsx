import React, { useState } from 'react';

import styles from './Select.module.css';
import dropDown from '../../../assets/images/arrowDropDown.svg';
import dropUp from '../../../assets/images/arrowDropUp.svg';
import { EventDate } from '../../../App';

interface SelectProps {
  eventsDate: Array<EventDate>;
  selectEventDate: string;
  disabled: boolean;
  onSelect: Function;
}

const Select = ({
  eventsDate,
  selectEventDate,
  onSelect,
  disabled,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClickMain = () => {
    setIsOpen(!isOpen);
  };

  const Field = (props: EventDate) => {
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

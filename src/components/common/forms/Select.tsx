import React, { useState } from 'react';
import { FormikProps } from 'formik';

import styles from './Select.module.css';
import dropDown from '../../../assets/images/arrowDropDown.svg';
import dropUp from '../../../assets/images/arrowDropUp.svg';
import { EventDate, ResultForm } from '../../../store/interfaces';

type SelectNames = 'selectEventDate';

interface SelectProps {
  name: SelectNames;
  eventsDate: Array<EventDate>;
  formik: FormikProps<ResultForm>;
  disabled: boolean;
}

const Select = ({ name, formik, eventsDate, disabled }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectEventDate = formik.values[name];

  const onClickMain = () => {
    setIsOpen(!isOpen);
  };

  const Field = (selectDate: EventDate) => {
    const onClickDate = () => {
      setIsOpen(false);
      formik.setFieldValue(name, selectDate);
    };
    return (
      <div className={styles.input}>
        <div onClick={onClickDate} className={`${styles.date}`}>
          {selectDate.label}
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
            {selectEventDate.label || 'День мероприятия'}
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

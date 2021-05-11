import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import { getListEventsDate, sendResultForm } from '../../redux/reducer';
import { minLength, required } from '../common/validators/validators';

import Checkbox from '../common/forms/Checkbox';
import InputField from '../common/forms/InputField';
import Select from '../common/forms/Select';
import Button from '../common/forms/Button';
import Preloader from '../common/preloader/Preloader';

import commonStyles from '../../App.module.css';
import styles from './Questionary.module.css';

const Questionary = (props) => {
  const [data, setData] = useState({
    fullName: '',
    birthday: '',
    companyName: '',
    position: '',
    phone: '',
    selectEventDate: {},
    parkingCheckbox: false,
    handoutsCheckbox: false,
    needHelpCheckbox: false,
    switch: true,
  });

  const [inputValidate, setInputValidate] = useState({
    fullName: false,
    personalPhone: false,
    birthday: false,
    companyName: false,
    position: false,
    companyPhone: false,
  });

  useEffect(() => {
    props.getListEventsDate();
  }, [props.isAuth]);

  const handleChange = (fieldName) => (fieldValue) => {
    setData({
      ...data,
      [fieldName]: fieldValue,
    });
  };

  const handleValidate = (fieldName) => (isValidateField) => {
    setInputValidate({
      ...inputValidate,
      [fieldName]: isValidateField,
    });
  };
  const minLengthBirthday = minLength(10);
  const minLengthPhone = minLength(16);

  const onChecked = (checkboxName) => () => {
    setData({
      ...data,
      [checkboxName]: !data[checkboxName],
    });
  };

  const onSwitch = () => {
    setData({
      ...data,
      switch: !data.switch,
    });
  };

  const onSelect = (id) => {
    setData({
      ...data,
      selectEventDate: props.eventsDate.find((i) => i.id === id),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.sendResultForm(data);
  };

  const isDisabledButton = () => {
    if (
      props.isServerProgress ||
      !inputValidate.phone ||
      !data.selectEventDate.id
    )
      return true;
    else
      return data.switch
        ? !(inputValidate.fullName && inputValidate.birthday)
        : !(inputValidate.companyName && inputValidate.position);
  };

  return (
    <div className={styles.container}>
      {!props.isAuth && <Redirect to="/login" />}
      {props.isError500 && <Redirect to="/error" />}
      {!props.isListComplete ? (
        <Preloader />
      ) : (
        <div>
          <h1 className={commonStyles.h1}>Заполните анкету участника</h1>
          <div
            className={`${styles.switch} ${
              props.isServerProgress ? styles.switchDisabled : ''
            }`}
          >
            <Button
              onClick={onSwitch}
              className={styles.switchButton}
              disabled={data.switch}
            >
              Физ. лицо
            </Button>
            <Button
              onClick={onSwitch}
              className={styles.switchButton}
              disabled={!data.switch}
            >
              Юр. лицо
            </Button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.questionary}>
              <div className={styles.personalDataLeft}>
                {data.switch ? (
                  <div>
                    <h2 className={commonStyles.h2}>Личные данные</h2>
                    <div className={styles.input}>
                      <InputField
                        type="text"
                        placeholder="ФИО"
                        validators={[required]}
                        value={data.fullName}
                        disabled={props.isServerProgress}
                        onChange={handleChange('fullName')}
                        validate={handleValidate('fullName')}
                        mask={false}
                      />
                    </div>
                    <div className={styles.input}>
                      <InputField
                        type="text"
                        placeholder="Дата рождения"
                        validators={[required, minLengthBirthday]}
                        value={data.birthday}
                        disabled={props.isServerProgress}
                        onChange={handleChange('birthday')}
                        validate={handleValidate('birthday')}
                        mask={[
                          /[0-3]/,
                          /\d/,
                          '.',
                          /[0-1]/,
                          /\d/,
                          '.',
                          /[1-2]/,
                          /[09]/,
                          /\d/,
                          /\d/,
                        ]}
                      />
                    </div>
                    <div className={styles.input}>
                      <InputField
                        type="text"
                        placeholder="Номер телефона"
                        validators={[required, minLengthPhone]}
                        value={data.phone}
                        disabled={props.isServerProgress}
                        onChange={handleChange('phone')}
                        validate={handleValidate('phone')}
                        mask={[
                          '+',
                          '7',
                          ' ',
                          '(',
                          /[1-9]/,
                          /\d/,
                          /\d/,
                          ')',
                          ' ',
                          /\d/,
                          /\d/,
                          /\d/,
                          '-',
                          /\d/,
                          /\d/,
                          '-',
                          /\d/,
                          /\d/,
                        ]}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className={commonStyles.h2}>Личные данные</h2>
                    <div className={styles.input}>
                      <InputField
                        type="text"
                        placeholder="Название компании"
                        validators={[required]}
                        value={data.companyName}
                        disabled={props.isServerProgress}
                        onChange={handleChange('companyName')}
                        validate={handleValidate('companyName')}
                        mask={false}
                      />
                    </div>

                    <div className={styles.input}>
                      <InputField
                        type="text"
                        placeholder="Ваша должность"
                        validators={[required]}
                        value={data.position}
                        disabled={props.isServerProgress}
                        onChange={handleChange('position')}
                        validate={handleValidate('position')}
                        mask={false}
                      />
                    </div>
                    <div className={styles.input}>
                      <InputField
                        type="text"
                        placeholder="Номер телефона"
                        validators={[required, minLengthPhone]}
                        value={data.phone}
                        disabled={props.isServerProgress}
                        onChange={handleChange('phone')}
                        validate={handleValidate('phone')}
                        mask={[
                          '+',
                          '7',
                          ' ',
                          '(',
                          /[1-9]/,
                          /\d/,
                          /\d/,
                          ')',
                          ' ',
                          /\d/,
                          /\d/,
                          /\d/,
                          '-',
                          /\d/,
                          /\d/,
                          '-',
                          /\d/,
                          /\d/,
                        ]}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.dividerLeft}></div>
              <div className={styles.dividerRight}></div>

              <div className={styles.personalDataRight}>
                <div>
                  <h2 className={commonStyles.h2}>Выберите дату мероприятия</h2>
                  <div className={styles.select}>
                    <Select
                      eventsDate={props.eventsDate}
                      selectEventDate={data.selectEventDate.label}
                      onSelect={onSelect}
                      disabled={props.isServerProgress}
                    />
                  </div>
                  <div className={styles.checkboxBlock}>
                    <Checkbox
                      label="Нужна парковка"
                      checked={data.parkingCheckbox}
                      disabled={props.isServerProgress}
                      onClick={onChecked('parkingCheckbox')}
                    />
                    <Checkbox
                      label="Хочу получить раздаточный материал"
                      disabled={props.isServerProgress}
                      checked={data.handoutsCheckbox}
                      onClick={onChecked('handoutsCheckbox')}
                    />
                    <Checkbox
                      label="Нужна помощь сопровождающего"
                      checked={data.needHelpCheckbox}
                      disabled={props.isServerProgress}
                      onClick={onChecked('needHelpCheckbox')}
                    />
                  </div>
                </div>
              </div>
            </div>
            <Button disabled={isDisabledButton()}>Отправить заявку</Button>
          </form>
          {props.isComplete && <Redirect to="/result" />}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.reducer.isAuth,
  eventsDate: state.reducer.eventsDate,
  isComplete: state.reducer.isComplete,
  isListComplete: state.reducer.isListComplete,
  isError500: state.reducer.isError500,
  isServerProgress: state.reducer.isServerProgress,
});

export default connect(mapStateToProps, {
  sendResultForm,
  getListEventsDate,
})(Questionary);

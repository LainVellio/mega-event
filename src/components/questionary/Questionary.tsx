import { useState, useEffect } from 'react';
import { Redirect } from 'react-router';

import { minLength, required } from '../common/validators/validators';

import Checkbox from '../common/forms/Checkbox';
import InputField from '../common/forms/InputField';
import Select from '../common/forms/Select';
import Button from '../common/forms/Button';
import Preloader from '../common/preloader/Preloader';

import commonStyles from '../../App.module.css';
import styles from './Questionary.module.css';
import { EventDate, initialResultForm } from '../../App';
import Switch, { SwitchI } from '../common/forms/Switch';

type CheckboxName = 'parkingCheckbox' | 'handoutsCheckbox' | 'needHelpCheckbox';

interface QuestionaryProps {
  isAuth: boolean;
  eventsDate: Array<EventDate>;
  sendResultForm: Function;
  isError500: boolean;
  isListComplete: boolean;
  isComplete: boolean;
  getListEventsDate: Function;
  isServerProgress: boolean;
}

const Questionary = ({
  isAuth,
  eventsDate,
  sendResultForm,
  isError500,
  isListComplete,
  isComplete,
  getListEventsDate,
  isServerProgress,
}: QuestionaryProps) => {
  const [data, setData] = useState(initialResultForm);

  const [inputValidate, setInputValidate] = useState({
    fullName: false,
    personalPhone: false,
    birthday: false,
    companyName: false,
    position: false,
    phone: false,
  });

  const isSwitch = !data.switches[0].isSwitch;

  useEffect(() => {
    getListEventsDate();
  }, [isAuth]);

  const handleChange = (fieldName: string) => (fieldValue: string) => {
    setData({
      ...data,
      [fieldName]: fieldValue,
    });
  };

  const handleValidate = (fieldName: string) => (isValidateField: string) => {
    setInputValidate({
      ...inputValidate,
      [fieldName]: isValidateField,
    });
  };
  const minLengthBirthday = minLength(10);
  const minLengthPhone = minLength(16);

  const onChecked = (checkboxName: CheckboxName) => () => {
    setData({
      ...data,
      [checkboxName]: !data[checkboxName],
    });
  };

  const onSwitch = (switches: Array<SwitchI>) => {
    setData({ ...data, switches: [...switches] });
    console.log(data);
  };

  const onSelect = (id: number) => {
    setData({
      ...data,
      selectEventDate:
        eventsDate.find((i) => i.id === id) || data.selectEventDate,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendResultForm(data);
  };

  const isDisabledButton = () => {
    if (isServerProgress || !inputValidate.phone || !data.selectEventDate.id)
      return true;
    else
      return isSwitch
        ? !(inputValidate.fullName && inputValidate.birthday)
        : !(inputValidate.companyName && inputValidate.position);
  };

  return (
    <div className={styles.container}>
      {!isAuth && <Redirect to="/login" />}
      {isError500 && <Redirect to="/error" />}
      {!isListComplete ? (
        <Preloader />
      ) : (
        <div>
          <h1 className={commonStyles.h1}>Заполните анкету участника</h1>
          <Switch setSwitch={onSwitch} names={['Физ. Лицо', 'Юр. Лицо']} />
          <form onSubmit={handleSubmit}>
            <div className={styles.questionary}>
              <div className={styles.personalDataLeft}>
                <h2 className={commonStyles.h2}>Личные данные</h2>

                <div>
                  <div className={isSwitch ? styles.input : styles.inputHidden}>
                    <InputField
                      type="text"
                      placeholder="ФИО"
                      validators={[required]}
                      value={data.fullName}
                      disabled={isServerProgress}
                      onChange={handleChange('fullName')}
                      validate={handleValidate('fullName')}
                      mask={false}
                    />
                  </div>
                  <div className={isSwitch ? styles.input : styles.inputHidden}>
                    <InputField
                      type="text"
                      placeholder="Дата рождения"
                      validators={[required, minLengthBirthday]}
                      value={data.birthday}
                      disabled={isServerProgress}
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
                </div>

                <div>
                  <div
                    className={!isSwitch ? styles.input : styles.inputHidden}
                  >
                    <InputField
                      type="text"
                      placeholder="Название компании"
                      validators={[required]}
                      value={data.companyName}
                      disabled={isServerProgress}
                      onChange={handleChange('companyName')}
                      validate={handleValidate('companyName')}
                      mask={false}
                    />
                  </div>

                  <div
                    className={!isSwitch ? styles.input : styles.inputHidden}
                  >
                    <InputField
                      type="text"
                      placeholder="Ваша должность"
                      validators={[required]}
                      value={data.position}
                      disabled={isServerProgress}
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
                      disabled={isServerProgress}
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
              </div>

              <div className={styles.dividerLeft}></div>
              <div className={styles.dividerRight}></div>

              <div className={styles.personalDataRight}>
                <div>
                  <h2 className={commonStyles.h2}>Выберите дату мероприятия</h2>
                  <div className={styles.select}>
                    <Select
                      eventsDate={eventsDate}
                      selectEventDate={data.selectEventDate.label}
                      onSelect={onSelect}
                      disabled={isServerProgress}
                    />
                  </div>
                  <div className={styles.checkboxBlock}>
                    <Checkbox
                      label="Нужна парковка"
                      checked={data.parkingCheckbox}
                      disabled={isServerProgress}
                      onClick={onChecked('parkingCheckbox')}
                    />
                    <Checkbox
                      label="Хочу получить раздаточный материал"
                      disabled={isServerProgress}
                      checked={data.handoutsCheckbox}
                      onClick={onChecked('handoutsCheckbox')}
                    />
                    <Checkbox
                      label="Нужна помощь сопровождающего"
                      checked={data.needHelpCheckbox}
                      disabled={isServerProgress}
                      onClick={onChecked('needHelpCheckbox')}
                    />
                  </div>
                </div>
              </div>
            </div>
            <Button disabled={isDisabledButton()}>Отправить заявку</Button>
          </form>
          {isComplete && <Redirect to="/result" />}
        </div>
      )}
    </div>
  );
};

export default Questionary;

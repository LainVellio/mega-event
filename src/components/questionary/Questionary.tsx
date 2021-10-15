import React, { useEffect } from 'react';
import { Redirect } from 'react-router';
import { useFormik } from 'formik';

import validate from './validate';
import { EventDate, ResultForm } from '../../App';
import Select from '../common/forms/Select';
import Button from '../common/forms/Button';
import Preloader from '../common/preloader/Preloader';
import FormikField from '../common/forms/FormikField';
import Switch, { SwitchI } from '../common/forms/Switch';
import FormikCheckbox from '../common/forms/FormikCheckbox';

import commonStyles from '../../App.module.css';
import styles from './Questionary.module.css';

interface QuestionaryProps {
  resultForm: ResultForm;
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
  resultForm,
  eventsDate,
  sendResultForm,
  isError500,
  isListComplete,
  isComplete,
  getListEventsDate,
  isServerProgress,
}: QuestionaryProps) => {
  const formik = useFormik({
    initialValues: resultForm,
    validationSchema: validate,
    onSubmit: (values: ResultForm) => {
      sendResultForm(values);
    },
  });
  const isSwitch = formik.values.switches[0].isSwitch;
  const errors = formik.errors;
  useEffect(() => {
    isAuth && getListEventsDate();
  }, [isAuth]);

  const onSwitch = (switches: Array<SwitchI>) => {
    formik.setFieldValue('switches', switches);
  };

  const setDisabledButton = () => {
    if (isServerProgress || errors.phone || !formik.values.selectEventDate.id)
      return true;
    else
      return isSwitch
        ? !!(errors.fullName || errors.birthday)
        : !!(errors.companyName || errors.position);
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
          <Switch
            setSwitch={onSwitch}
            names={formik.values.switches}
            isServerProgress={isServerProgress}
          />
          <form onSubmit={formik.handleSubmit}>
            <div className={styles.questionary}>
              <div className={styles.personalDataLeft}>
                <h2 className={commonStyles.h2}>Личные данные</h2>

                <div>
                  {isSwitch ? (
                    <>
                      <div className={styles.input}>
                        <FormikField
                          name="fullName"
                          type="text"
                          placeholder="ФИО"
                          formik={formik}
                          disabled={isServerProgress}
                          mask={false}
                        />
                      </div>

                      <div className={styles.input}>
                        <FormikField
                          name="birthday"
                          type="text"
                          placeholder="Дата рождения"
                          formik={formik}
                          disabled={isServerProgress}
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
                    </>
                  ) : null}
                </div>

                <div>
                  {!isSwitch ? (
                    <>
                      <div className={styles.input}>
                        <FormikField
                          name="companyName"
                          type="text"
                          placeholder="Название компании"
                          formik={formik}
                          disabled={isServerProgress}
                          mask={false}
                        />
                      </div>

                      <div className={styles.input}>
                        <FormikField
                          name="position"
                          type="text"
                          placeholder="Ваша должность"
                          disabled={isServerProgress}
                          formik={formik}
                          mask={false}
                        />
                      </div>
                    </>
                  ) : null}
                  <div className={styles.input}>
                    <FormikField
                      name="phone"
                      type="text"
                      placeholder="Номер телефона"
                      formik={formik}
                      disabled={isServerProgress}
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
                      name="selectEventDate"
                      eventsDate={eventsDate}
                      formik={formik}
                      disabled={isServerProgress}
                    />
                  </div>
                  <div className={styles.checkboxBlock}>
                    <FormikCheckbox
                      name="parkingCheckbox"
                      label="Нужна парковка"
                      disabled={isServerProgress}
                      formik={formik}
                    />
                    <FormikCheckbox
                      name="handoutsCheckbox"
                      label="Хочу получить раздаточный материал"
                      formik={formik}
                      disabled={isServerProgress}
                    />
                    <FormikCheckbox
                      name="needHelpCheckbox"
                      label="Нужна помощь сопровождающего"
                      formik={formik}
                      disabled={isServerProgress}
                    />
                  </div>
                </div>
              </div>
            </div>
            <Button type="submit" disabled={setDisabledButton()}>
              Отправить заявку
            </Button>
          </form>
          {isComplete && <Redirect to="/result" />}
        </div>
      )}
    </div>
  );
};

export default Questionary;

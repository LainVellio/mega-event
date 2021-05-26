import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import Button from '../common/forms/Button';
import commonStyles from '../../App.module.css';
import styles from './FinalPage.module.css';

const FinalPage = ({ completedForm, isAuth, isError500 }) => {
  const [isRedirect, setIsRedirect] = useState(false);

  const onRedirect = () => {
    setIsRedirect(true);
  };

  const result = completedForm;
  const Item = (props) => (
    <div className={styles.item}>
      <div className={styles.label}>{props.label}</div>
      <div className={styles.value}>{props.value}</div>
    </div>
  );

  return (
    <div className={styles.container}>
      {!isAuth ? (
        <Redirect to="/login" />
      ) : (
        <div>
          {isError500 && <Redirect to="/error" />}
          {isRedirect && <Redirect to="/questionary" />}
          <h1 className={commonStyles.h1}>Спасибо за заявку!</h1>
          <div className={styles.result}>
            {result.switch ? (
              <Item label="ФИО" value={result.fullName} />
            ) : (
              <Item label="Название компании" value={result.companyName} />
            )}

            {result.switch ? (
              <Item label="Тип участника" value="Физ. лицо" />
            ) : (
              <Item label="Тип участника" value="Юр. лицо" />
            )}

            <Item label="Номер телефона" value={result.phone} />

            {result.switch ? (
              <Item label="Дата рождения" value={result.birthday} />
            ) : (
              <Item label="Должность" value={result.position} />
            )}

            <div className={styles.label}>Опции</div>
            {result.parkingCheckbox && (
              <div className={styles.option}>Нужна парковка</div>
            )}
            {result.handoutsCheckbox && (
              <div className={styles.option}>
                Хочу получить раздаточный материал
              </div>
            )}
            {result.needHelpCheckbox && (
              <div className={styles.option}>Нужна помощь сопровождающего</div>
            )}
          </div>
          <Button onClick={onRedirect}>Вернуться на главную</Button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.reducer.isAuth,
  completedForm: state.reducer.completedForm,
});

export default connect(mapStateToProps, {})(FinalPage);

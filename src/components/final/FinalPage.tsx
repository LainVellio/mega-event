import React, { useState } from 'react';
import { Redirect } from 'react-router';

import Button from '../common/forms/Button';
import commonStyles from '../../App.module.css';
import styles from './FinalPage.module.css';
import { ResultForm } from '../../App';

interface FinalPageProps {
  resultForm: ResultForm;
  isAuth: boolean;
  isError500: boolean;
}

interface ItemProps {
  label: string;
  value: string;
}

const FinalPage = ({ resultForm, isAuth, isError500 }: FinalPageProps) => {
  const result = resultForm;
  const isSwitch = result.switches[0].isSwitch;
  const [isRedirect, setIsRedirect] = useState(false);

  const onRedirect = () => {
    setIsRedirect(true);
  };

  const Item = ({ label, value }: ItemProps) => (
    <div className={styles.item}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
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
            {isSwitch ? (
              <Item label="ФИО" value={result.fullName} />
            ) : (
              <Item label="Название компании" value={result.companyName} />
            )}

            {isSwitch ? (
              <Item label="Тип участника" value="Физ. лицо" />
            ) : (
              <Item label="Тип участника" value="Юр. лицо" />
            )}

            <Item label="Номер телефона" value={result.phone} />

            {isSwitch ? (
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

export default FinalPage;

import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { setError500 } from '../../store/action-creators';
import { InitialState } from '../../store/interfaces';
import Button from '../common/forms/Button';

import styles from './Error500.module.css';

interface Error500Props {
  isError500: boolean;
  setError500(isError500: boolean): void;
}

const Error500 = ({ setError500, isError500 }: Error500Props) => {
  const onClick = () => {
    setError500(false);
  };
  return (
    <div>
      {!isError500 && <Redirect to="/questionary" />}
      <div className={styles.blockError}>Ошибка сервера</div>
      <Button onClick={onClick}>Попробовать ещё раз</Button>
    </div>
  );
};

const mapStateToProps = (state: InitialState) => ({
  isError500: state.isError500,
});

export default connect(mapStateToProps, { setError500 })(Error500);

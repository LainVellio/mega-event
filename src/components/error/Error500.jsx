import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { setError500 } from '../../redux/mainReducer';

import Button from '../common/forms/Button';

import styles from './Error500.module.css';

const Error500 = ({ setError500, isError500 }) => {
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

const mapStateToProps = (state) => ({
  isError500: state.reducer.isError500,
});

export default connect(mapStateToProps, { setError500 })(Error500);

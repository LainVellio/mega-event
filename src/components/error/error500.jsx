import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Button from '../common/forms/Button';
import styles from './error500.module.css';
import { setError500 } from '../../redux/reducer';

const Error500 = (props) => {
  const onClick = () => {
    props.setError500(false);
  };
  return (
    <div>
      {!props.isError500 && <Redirect to="/questionary" />}
      <div className={styles.blockError}>Ошибка сервера</div>
      <Button onClick={onClick}>Попробовать ещё раз</Button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isError500: state.reducer.isError500,
});

export default connect(mapStateToProps, { setError500 })(Error500);

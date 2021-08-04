import { Redirect } from 'react-router';

import Button from '../common/forms/Button';

import styles from './Error500.module.css';

interface Error500Props {
  setError500: Function;
  isError500: boolean;
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

export default Error500;

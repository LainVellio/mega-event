import { EmailInput, PasswordInput } from '../common/Forms/Input';
import styles from './Authorization.module.css';

const Authorization = () => {
  return (
    <div className={styles.authForm}>
      <h1>Добро пожаловать</h1>
      <EmailInput />
      <PasswordInput />
    </div>
  );
};

export default Authorization;

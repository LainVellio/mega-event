import * as Yup from 'yup';

const REQUIRED = 'Поле обязательно для заполнения';

const validate = Yup.object({
  email: Yup.string().required(REQUIRED).email('Неверный Email'),
  password: Yup.string().required(REQUIRED),
});

export default validate;

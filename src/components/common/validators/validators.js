export const required = (value) => {
  if (value) return undefined;
  return 'Поле обязательно для заполнения';
};

export const email = (value) => {
  const re = /\S+@\S+\.\S+/;
  if (re.test(value)) return undefined;
  return 'Неверный Email';
};

export const tel = (value) => {
  const re = /\+7\d{10}/;
  if (re.test(value)) return undefined;
  return 'Некорректный телефон';
};

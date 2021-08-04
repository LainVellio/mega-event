export const required = (value: string) => {
  if (value) return undefined;
  return 'Поле обязательно для заполнения';
};

export const email = (value: string) => {
  const re = /\S+@\S+\.\S+/;
  if (re.test(value)) return undefined;
  return 'Неверный Email';
};

export const minLength = (minLength: number) => (value: string) => {
  if (value.replace(/_/g, '').length >= minLength) return undefined;
  return 'Поле заполненно не полностью';
};

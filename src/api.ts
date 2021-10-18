import axios from 'axios';
import { ResultForm } from './store/reducer';

const api = axios.create({
  baseURL: process.env.REACT_APP_DOMAIN,
  headers: { 'Content-Type': 'application/json' },
});
const requestSuccessInterceptor = (config: any) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};
const responseSuccessInterceptor = (response: any) => {
  return { data: response.data };
};
const networkErrorInterceptor = (error: any) => {
  return Promise.reject(error.response);
};

api.interceptors.request.use(requestSuccessInterceptor);
api.interceptors.response.use(
  responseSuccessInterceptor,
  networkErrorInterceptor,
);

const serverAPI = {
  async auth(email: string, password: string) {
    const response = await api.post('/auth', {
      username: email,
      password: password,
    });
    return response;
  },

  async getList() {
    const response = await api.get('/list');
    return response;
  },

  async postForm(form: ResultForm) {
    const response = await api.post('/request', form);
    return response;
  },
};

export default serverAPI;

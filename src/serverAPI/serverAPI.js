import axios from 'axios';

const AUTH_URL = process.env.REACT_APP_AUTH_URL;
const LIST_URL = process.env.REACT_APP_LIST_URL;
const REQUEST_URL = process.env.REACT_APP_REQUEST_URL;

const serverAPI = {
  auth(email, password) {
    return axios({
      method: 'post',
      url: AUTH_URL,
      headers: { 'Content-Type': 'application/json' },
      data: { username: email, password: password },
    })
      .then((response) => response)
      .catch((error) => error.response);
  },

  getList(token) {
    return axios({
      method: 'get',
      url: LIST_URL,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response)
      .catch((error) => error.response);
  },

  postForm(token, form) {
    return axios({
      method: 'post',
      url: REQUEST_URL,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: form,
    })
      .then((response) => response)
      .catch((error) => error.response);
  },
};

export default serverAPI;

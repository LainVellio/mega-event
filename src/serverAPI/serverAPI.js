import axios from 'axios';

const serverAPI = {
  auth() {
    axios({
      method: 'post',
      withCredentials: true,
      url: 'http://pink-code.ru:20085/auth',
      headers: { 'Content-Type': 'application/json' },
      data: { username: 'user@example.com', password: 'user8952' },
    }).then((response) => response);
  },
};

export default serverAPI;

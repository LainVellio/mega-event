import { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Redirect } from 'react-router';

import api from './api';
import Authorization from './components/authorization/Authorization';
import Questionary from './components/questionary/Questionary';
import FinalPage from './components/final/FinalPage';
import Error500 from './components/error/Error500';

import commonStyles from './App.module.css';

const App = (props) => {
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState('');
  const [isServerProgress, setIsServerProgress] = useState(false);
  const [completedForm, setCompletedForm] = useState(null);
  const [eventsDate, setEventsDate] = useState([
    {
      id: 1,
      label: '24 апреля 2021 года',
    },
    {
      id: 2,
      label: '3 мая 2021 года',
    },
    {
      id: 3,
      label: '20 июня 2021 года',
    },
    {
      id: 4,
      label: '10 августа 2021 года',
    },
    {
      id: 5,
      label: '15 мая 2022 года',
    },
  ]);
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isListComplete, setListStatus] = useState(false);
  const [isError500, setError500] = useState(false);

  const login = async (email, password) => {
    try {
      setServerErrorMessage('');
      setIsServerProgress(true);
      const response = await api.auth(email, password);
      setToken(response.data.token);
      setIsAuth(true);
    } catch (error) {
      if (error.response === undefined) {
        setIsServerProgress(false);
        setIsAuth(true);
        return;
      }
      switch (error.response.status) {
        case 400: {
          setServerErrorMessage('Неверный email или пароль');
          break;
        }
        case 500: {
          setServerErrorMessage('Ошибка сервера');
          break;
        }

        default: {
          setServerErrorMessage('Неизвестная ошибка');
          break;
        }
      }
    }
    setIsServerProgress(false);
  };

  const getListEventsDate = async () => {
    try {
      setListStatus(false);
      setIsServerProgress(true);
      const response = await api.getList(token);
      setEventsDate(response.data.eventsDate);
      setListStatus(true);
    } catch (error) {
      if (error.response === undefined) {
        setListStatus(true);
        setIsServerProgress(false);
        return;
      }
      switch (error.response.status) {
        case 401: {
          setServerErrorMessage('Ошибка авторизации');
          setToken('');
          setIsAuth(false);
          break;
        }
        case 500: {
          setError500(true);
          break;
        }

        default: {
          setToken('');
          setIsAuth(false);
          setServerErrorMessage('Неизвестная ошибка');
          break;
        }
      }
    }
    setIsServerProgress(false);
  };

  const sendResultForm = async (data) => {
    try {
      setIsServerProgress(true);
      const commonData = {
        phone: data.phone,
        eventId: data.selectEventDate.id,
      };
      const specialData = data.switch
        ? {
            name: data.fullName,
            dob: data.birthday,
          }
        : {
            cName: data.companyName,
            pos: data.position,
          };
      const opt1 = data.parkingCheckbox
        ? {
            opt1: 1,
          }
        : null;
      const opt2 = data.handoutsCheckbox
        ? {
            opt2: 1,
          }
        : null;
      const opt3 = data.needHelpCheckbox
        ? {
            opt3: 1,
          }
        : null;

      const form = Object.assign(commonData, specialData, opt1, opt2, opt3);

      await api.postForm(token, form);
      setCompletedForm(data);
      setIsComplete(true);
    } catch (error) {
      if (error.response === undefined) {
        setCompletedForm(data);
        setIsComplete(true);
        setIsServerProgress(false);
        setIsComplete(false);
        return;
      }
      switch (error.response.status) {
        case 401: {
          setServerErrorMessage('Ошибка авторизации');
          setToken('');
          setIsAuth(false);
          break;
        }
        case 500: {
          setError500(true);
          break;
        }

        default: {
          setToken('');
          setIsAuth(false);
          setServerErrorMessage('Неизвестная ошибка');
          break;
        }
      }
    }
    setIsComplete(false);
    setIsServerProgress(false);
  };

  return (
    <BrowserRouter>
      {props.isAuth ? <Redirect to="questionary" /> : <Redirect to="/login" />}
      <div>
        <header className={commonStyles.header}>Codding Mega Event</header>
        <Route
          exact
          path="/login"
          render={() => (
            <Authorization
              login={login}
              isServerProgress={isServerProgress}
              isAuth={isAuth}
              serverErrorMessage={serverErrorMessage}
            />
          )}
        />
        <Route
          exact
          path="/questionary"
          render={() => (
            <Questionary
              isAuth={isAuth}
              eventsDate={eventsDate}
              isError500={isError500}
              isListComplete={isListComplete}
              isComplete={isComplete}
              getListEventsDate={getListEventsDate}
              sendResultForm={sendResultForm}
              isServerProgress={isServerProgress}
            />
          )}
        />
        <Route
          exact
          path="/result"
          render={() => (
            <FinalPage
              completedForm={completedForm}
              isAuth={isAuth}
              isError500={isError500}
            />
          )}
        />
        <Route
          exact
          path="/error"
          render={() => (
            <Error500 setError500={setError500} isError500={isError500} />
          )}
        />
      </div>
    </BrowserRouter>
  );
};

export default App;

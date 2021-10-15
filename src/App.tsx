import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import Moment from './components/moment/Moment';
import ChartJS from './components/chartjs/chartjs';

import api from './api';
import Authorization from './components/authorization/Authorization';
import Questionary from './components/questionary/Questionary';
import FinalPage from './components/final/FinalPage';
import Error500 from './components/error/Error500';
import Media from './components/media/Media';
import Animation from './components/animation/Animation';
import { SwitchI } from './components/common/forms/Switch';
import Events from './components/events/Events';
import Button from './components/common/forms/Button';
import Grid from './components/grid/Grid';

import commonStyles from './App.module.css';

export interface EventDate {
  id: number;
  label: string;
}

export interface ResultForm {
  fullName: string;
  birthday: string;
  companyName: string;
  position: string;
  phone: string;
  selectEventDate: EventDate;
  parkingCheckbox: boolean;
  handoutsCheckbox: boolean;
  needHelpCheckbox: boolean;
  switches: Array<SwitchI>;
}

export const initialResultForm: ResultForm = {
  fullName: '',
  birthday: '',
  companyName: '',
  position: '',
  phone: '',
  selectEventDate: {
    id: 0,
    label: '',
  },
  parkingCheckbox: false,
  handoutsCheckbox: false,
  needHelpCheckbox: false,
  switches: [
    { name: 'Физ. лицо', isSwitch: true },
    { name: 'Юр. лицо', isSwitch: false },
  ],
};

const initialEventsDate: Array<EventDate> = [
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
];

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isServerProgress, setIsServerProgress] = useState(false);
  const [resultForm, setResultForm] = useState(initialResultForm);
  const [eventsDate, setEventsDate] = useState(initialEventsDate);
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isListComplete, setListStatus] = useState(false);
  const [isError500, setError500] = useState(false);
  const saveToken = (token: string) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  useEffect(() => {
    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setServerErrorMessage('');
      setIsServerProgress(true);
      const response = await api.auth(email, password);
      saveToken(response.data.token);
      setIsAuth(true);
    } catch (error: any) {
      if (error === undefined) {
        setIsServerProgress(false);
        setIsAuth(true);
        return;
      }
      switch (error.status) {
        case 400: {
          setServerErrorMessage('Неверный email или пароль');
          break;
        }
        case 500: {
          setServerErrorMessage('Ошибка сервера');
          break;
        }
        default: {
          setServerErrorMessage(error.message);
          break;
        }
      }
    }
    setIsServerProgress(false);
  };

  const logout = () => {
    saveToken('');
    setIsAuth(false);
  };

  const getListEventsDate = async () => {
    try {
      setListStatus(false);
      setIsServerProgress(true);
      const response = await api.getList();
      setEventsDate(response.data.eventsDate);
      setListStatus(true);
    } catch (error: any) {
      if (error === undefined) {
        setListStatus(true);
        setIsServerProgress(false);
        return;
      }
      switch (error.status) {
        case 401: {
          saveToken('');
          setIsAuth(false);
          break;
        }
        case 500: {
          setError500(true);
          break;
        }

        default: {
          saveToken('');
          setIsAuth(false);
          setServerErrorMessage(error.message);
          break;
        }
      }
    }
    setIsServerProgress(false);
  };

  const sendResultForm = async (data: ResultForm) => {
    try {
      setIsServerProgress(true);
      const commonData = {
        phone: data.phone,
        eventId: data.selectEventDate.id,
      };
      const specialData = data.switches[0].isSwitch
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
      setResultForm(data);
      await api.postForm(form);
      setIsComplete(true);
    } catch (error: any) {
      if (error === undefined) {
        setResultForm(data);
        setIsComplete(true);
        setIsServerProgress(false);
        setIsComplete(false);
        return;
      }
      switch (error.status) {
        case 401: {
          setServerErrorMessage('Ошибка авторизации');
          saveToken('');
          setIsAuth(false);
          break;
        }
        case 500: {
          setError500(true);
          break;
        }

        default: {
          saveToken('');
          setIsAuth(false);
          setServerErrorMessage('Неизвестная ошибка');
          break;
        }
      }
    }
    setIsComplete(false);
    setIsServerProgress(false);
    setListStatus(false);
  };

  return (
    <BrowserRouter>
      {isAuth ? <Redirect to="questionary" /> : <Redirect to="/login" />}
      <div>
        <header className={commonStyles.header}>
          Codding Mega Event
          {isAuth ? (
            <Button
              className={commonStyles.logoutButton}
              onClick={() => logout()}
            >
              Разлогиниться
            </Button>
          ) : null}
        </header>
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
        <Route exact path="/media" render={() => <Media />} />
        <Route exact path="/animation" render={() => <Animation />} />
        <Route exact path="/moment" render={() => <Moment />} />
        <Route exact path="/events" render={() => <Events />} />
        <Route exact path="/grid" render={() => <Grid />} />
        <Route exact path="/ChartJS" render={() => <ChartJS />} />
        <Route
          exact
          path="/questionary"
          render={() => (
            <Questionary
              resultForm={resultForm}
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
              resultForm={resultForm}
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

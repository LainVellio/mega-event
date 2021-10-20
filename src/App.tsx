import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import Moment from './components/moment/Moment';
import ChartJS from './components/chartjs/chartjs';

import { logout } from './store/reducer';
import Authorization from './components/authorization/Authorization';
import Questionary from './components/questionary/Questionary';
import FinalPage from './components/final/FinalPage';
import Error500 from './components/error/Error500';
import Media from './components/media/Media';
import Animation from './components/animation/Animation';
import Events from './components/events/Events';
import Button from './components/common/forms/Button';
import Grid from './components/grid/Grid';
import { InitialState } from './store/interfaces';

import commonStyles from './App.module.css';

interface AppProps {
  isAuth: boolean;
  logout(): void;
}

const App = ({ isAuth, logout }: AppProps) => {
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
        <Route exact path="/login" render={() => <Authorization />} />
        <Route exact path="/media" render={() => <Media />} />
        <Route exact path="/animation" render={() => <Animation />} />
        <Route exact path="/moment" render={() => <Moment />} />
        <Route exact path="/events" render={() => <Events />} />
        <Route exact path="/grid" render={() => <Grid />} />
        <Route exact path="/ChartJS" render={() => <ChartJS />} />
        <Route exact path="/questionary" render={() => <Questionary />} />
        <Route exact path="/result" render={() => <FinalPage />} />
        <Route exact path="/error" render={() => <Error500 />} />
      </div>
    </BrowserRouter>
  );
};

const mapStateToProps = (state: InitialState) => ({
  isAuth: state.isAuth,
});

export default connect(mapStateToProps, { logout })(App);

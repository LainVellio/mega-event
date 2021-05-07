import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import Authorization from './components/authorization/Authorization';
import Questionary from './components/questionary/Questionary';
import FinalPage from './components/final/FinalPage';
import Error500 from './components/error/Error500';

import commonStyles from './App.module.css';

const App = (props) => {
  return (
    <BrowserRouter>
      {props.isAuth ? <Redirect to="questionary" /> : <Redirect to="/login" />}
      <div>
        <header className={commonStyles.header}>Codding Mega Event</header>
        <Route exact path="/login" component={Authorization} />
        <Route exact path="/questionary" component={Questionary} />
        <Route exact path="/result" component={FinalPage} />
        <Route exact path="/error" component={Error500} />
      </div>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.reducer.isAuth,
});

export default connect(mapStateToProps, {})(App);

import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Redirect } from 'react-router';

import commonStyles from './App.module.css';
import Authorization from './components/authorization/authorization';
import Questionary from './components/questionary/questionary';
import FinalPage from './components/final/finalPage';
import Error500 from './components/error/error500';
import { connect } from 'react-redux';

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

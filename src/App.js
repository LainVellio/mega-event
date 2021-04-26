import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Redirect } from 'react-router';

import commonStyles from './App.module.css';
import Authorization from './components/authorization/authorization';
import Questionary from './components/questionary/questionary';
import FinalPage from './components/final/finalPage';

const App = (props) => {
  return (
    <BrowserRouter>
      <Redirect to="/login" />
      <div>
        <header className={commonStyles.header}>Codding Mega Event</header>
        <Route exact path="/login" component={Authorization} />
        <Route exact path="/questionary" component={Questionary} />
        <Route exact path="/result" component={FinalPage} />
      </div>
    </BrowserRouter>
  );
};

export default App;

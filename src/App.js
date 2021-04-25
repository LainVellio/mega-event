import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import './App.css';
import Authorization from './components/Authorization/Authorization';
import Questionary from './components/Questionary/Questionary';
import FinalPage from './components/Final/FinalPage';

const App = (props) => {
  return (
    <BrowserRouter>
      <Redirect to="/login" />
      <div>
        <header>Codding Mega Event</header>
        <Route exact path="/login" component={Authorization} />
        <Route exact path="/questionary" component={Questionary} />
        <Route exact path="/result" component={FinalPage} />
      </div>
    </BrowserRouter>
  );
};

export default App;

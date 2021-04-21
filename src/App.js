import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AuthorizationContainer from './components/Authorization/AuthorizationContainer';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <header className="App-header">Codding Mega Event</header>
        <AuthorizationContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;

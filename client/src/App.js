import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Login } from './components/Login';
import { setAuthToken } from './utils/setAuthToken';

import { GlobalProvider } from './context/GlobalState';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Header />
        <div className='container'>
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/' component={Dashboard} />
          </Switch>
          <Dashboard />
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;

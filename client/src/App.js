import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header } from './components/Header';
import { Alerts } from './components/Alerts';
import { Dashboard } from './components/Dashboard';
import { Login } from './components/pages/Login';
import { Register } from './components/pages/Register';
import { setAuthToken } from './utils/setAuthToken';
import { PrivateRoute } from './components/routing/PrivateRoute';

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
          <Alerts />
          <Switch>
            <PrivateRoute exact path='/' component={Dashboard} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Register} />
          </Switch>
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;

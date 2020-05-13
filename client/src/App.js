import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Login } from './components/Login';
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
          <Switch>
            <PrivateRoute exact path='/' component={Dashboard} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;

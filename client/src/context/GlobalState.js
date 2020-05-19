import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { setAuthToken } from '../utils/setAuthToken';

// Initial state
const initialState = {
  transactions: [],
  current: null,
  error: null,
  loading: false,
  user: null,
  isAuthenticated: null,
  token: localStorage.getItem('token'),
  alerts: [],
};

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions

  const getTransactions = async () => {
    try {
      const res = await axios.get('/api/v1/transactions');

      dispatch({
        type: 'GET_TRANSACTIONS',
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`/api/v1/transactions/${id}`);
      dispatch({
        type: 'DELETE_TRANSACTION',
        payload: id,
      });
      setAlert('Transaction removed.', 'danger');
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error,
      });
      setAlert('Something went wrong.  Please try again.', 'danger');
    }
  };

  const deleteAllTransactions = async () => {
    try {
      await axios.delete('/api/v1/transactions/');
      dispatch({
        type: 'DELETE_ALL_TRANSACTIONS',
      });
      setAlert('All transactions have been deleted.', 'danger');
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error,
      });
      setAlert('Something went wrong.  Please try again.', 'danger');
    }
  };

  const createTransaction = async (transaction) => {
    try {
      const res = await axios.post('/api/v1/transactions', transaction, config);
      dispatch({
        type: 'CREATE_TRANSACTION',
        payload: res.data.data,
      });
      setAlert('Transaction added.', 'success');
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error,
      });
      setAlert('Please enter a valid description and amount.', 'danger');
    }
  };

  const editTransaction = async (transaction, updates) => {
    try {
      const res = await axios.put(
        `/api/v1/transactions/${transaction._id}`,
        updates,
        config
      );

      dispatch({
        type: 'EDIT_TRANSACTION',
        payload: res.data.data,
      });
      setAlert('Transaction saved.', 'success');
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error,
      });
      setAlert('Something went wrong.  Please try again.', 'danger');
    }
  };

  const setCurrent = (transaction) => {
    dispatch({
      type: 'SET_CURRENT',
      payload: transaction,
    });
  };

  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);

      try {
        const res = await axios.get('/api/v1/auth');
        dispatch({ type: 'USER_LOADED', payload: res.data.user });
      } catch (err) {
        dispatch({
          type: 'AUTH_ERROR',
          payload: err.response.data.error,
        });
      }
    }
  };

  const loginUser = async (userData) => {
    try {
      const res = await axios.post('/api/v1/auth', userData, config);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.data,
      });
      loadUser();
      setAlert('Log in successful.', 'success');
    } catch (err) {
      setAlert(err.response.data.error, 'danger');
      dispatch({
        type: 'AUTH_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  const changePassword = async (userData) => {
    console.log(userData);
    try {
      const res = await axios.put('/api/v1/auth', userData, config);
      dispatch({
        type: 'PASSWORD_CHANGE_SUCCESS',
        payload: res.data,
      });
      loadUser();
      setAlert(res.data.message, 'success');
    } catch (err) {
      setAlert(err.response.data.error, 'danger');
    }
  };

  const logoutUser = () => {
    dispatch({
      type: 'LOGOUT_USER',
    });
  };

  const createUser = async (userData) => {
    try {
      const res = await axios.post('/api/v1/users', userData, config);
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: res.data,
      });
      setAlert('Account created successfully.', 'success');
      loadUser();
    } catch (err) {
      setAlert(err.response.data.error, 'danger');
      dispatch({
        type: 'AUTH_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Set Alert
  const setAlert = (message, type, timeout = 4000) => {
    const id = uuidv4();
    dispatch({
      type: 'SET_ALERT',
      payload: { message, type, id },
    });
    setTimeout(() => {
      dispatch({ type: 'REMOVE_ALERT', payload: id });
    }, 5000);
  };

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        current: state.current,
        error: state.error,
        loading: state.loading,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        alerts: state.alerts,
        getTransactions,
        setCurrent,
        deleteTransaction,
        deleteAllTransactions,
        createTransaction,
        editTransaction,
        loadUser,
        loginUser,
        logoutUser,
        createUser,
        changePassword,
        setAlert,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

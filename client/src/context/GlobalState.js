import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

// Initial state
const initialState = {
  transactions: [],
  current: null,
  error: null,
  loading: true,
  user: null,
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
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  const createTransaction = async (transaction) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/v1/transactions', transaction, config);

      dispatch({
        type: 'CREATE_TRANSACTION',
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  const editTransaction = async (transaction, updates) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

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
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  const setCurrent = (transaction) => {
    dispatch({
      type: 'SET_CURRENT',
      payload: transaction,
    });
  };

  const loginUser = (formData) => {
    console.log('logging in user....');
    dispatch({
      type: 'LOGIN_USER',
      payload: formData.email,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        current: state.current,
        error: state.error,
        loading: state.loading,
        user: state.user,
        getTransactions,
        setCurrent,
        deleteTransaction,
        createTransaction,
        editTransaction,
        loginUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

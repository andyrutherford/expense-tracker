import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const context = useContext(GlobalContext);
  const { isAuthenticated, loading } = context;

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

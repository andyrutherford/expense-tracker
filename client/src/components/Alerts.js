import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Alerts = () => {
  const context = useContext(GlobalContext);
  const { alerts } = context;

  return (
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <i className='fas fa-info-circle'></i> {alert.message}
      </div>
    ))
  );
};

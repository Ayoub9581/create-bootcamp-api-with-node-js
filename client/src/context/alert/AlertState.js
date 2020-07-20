import React, { useReducer } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT } from './../types';
import Alert from '../../components/alert/Alert';

const AlertState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  const setAlert = (msg, type, textcolor, timeout = 3000) => {
    const id = uuidv4();
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, textcolor, id },
    });

    setTimeout(() => {
      dispatch({ type: REMOVE_ALERT, payload: id });
    }, timeout);
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
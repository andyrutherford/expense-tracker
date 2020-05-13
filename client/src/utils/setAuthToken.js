import axios from 'axios';

export const setAuthToken = (token) => {
  // Assign token to axios global headers
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

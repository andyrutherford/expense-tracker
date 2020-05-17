export default (state, action) => {
  switch (action.type) {
    case 'GET_TRANSACTIONS':
      return {
        ...state,
        loading: false,
        transactions: action.payload,
      };
    case 'CREATE_TRANSACTION':
      return {
        ...state,
        loading: false,
        transactions: [...state.transactions, action.payload],
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        loading: false,
        transactions: state.transactions.filter(
          (transaction) => transaction._id !== action.payload
        ),
      };
    case 'DELETE_ALL_TRANSACTIONS':
      return {
        ...state,
        loading: false,
        transactions: [],
      };
    case 'EDIT_TRANSACTION':
      return {
        ...state,
        loading: false,
        transactions: state.transactions.map((transaction) =>
          transaction._id === action.payload._id ? action.payload : transaction
        ),
      };
    case 'SET_CURRENT':
      return {
        ...state,
        loading: false,
        current: action.payload,
      };
    case 'TRANSACTION_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'USER_LOADED':
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case 'REGISTER_SUCCESS':
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        error: null,
        isAuthenticated: true,
        user: action.payload.user,
        loading: false,
      };
    case 'LOGOUT_USER':
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    case 'AUTH_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'SET_ALERT':
      return {
        ...state,
        alerts: [action.payload, ...state.alerts],
      };
    case 'REMOVE_ALERT':
      return {
        ...state,
        alerts: state.alerts.filter((alert) => alert.id !== action.payload),
      };
    default:
      return state;
  }
};

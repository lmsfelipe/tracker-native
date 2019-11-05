import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';
import { AsyncStorage } from 'react-native';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };

    case 'clear_error_message':
      return { ...state, errorMessage: '' };

    case 'signup':
      return { ...state, token: action.payload, errorMessage: '' };

    case 'signin':
      return { ...state, token: action.payload, errorMessage: '' };

    case 'signout':
      return { ...state, token: '' };

    default:
      return state;
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'clear_error_message' });
};

const tryLocalSignin = dispatch => async () => {
  const token = await AsyncStorage.getItem('token');

  if (token) {
    dispatch({ type: 'signin', payload: token });
    navigate('TrackList');
  } else {
    navigate('Signup');
  }
};

const signup = dispatch => async ({ email, password }) => {
  try {
    const resp = await trackerApi.post('/signup', {
      email,
      password,
    });
    await AsyncStorage.setItem('token', resp.data.token);

    dispatch({ type: 'signup', payload: resp.data.token });
    navigate('TrackList');
  } catch (error) {
    dispatch({ type: 'add_error', payload: 'Something went wrong' });
  }
};

const signin = dispatch => async ({ email, password }) => {
  try {
    const resp = await trackerApi.post('/signin', {
      email,
      password,
    });
    await AsyncStorage.setItem('token', resp.data.token);

    dispatch({ type: 'signin', payload: resp.data.token });
    navigate('TrackList');
  } catch (error) {
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong on signin',
    });
  }
};

const signout = dispatch => async () => {
  await AsyncStorage.removeItem('token');
  navigate('Signup');
  dispatch({ type: 'signout' });
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, clearErrorMessage, tryLocalSignin, signout },
  { token: null, errorMessage: '' },
);

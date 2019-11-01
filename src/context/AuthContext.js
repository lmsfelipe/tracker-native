import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';
import { AsyncStorage } from 'react-native';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };

    case 'signup':
      return { ...state, token: action.payload, errorMessage: '' };

    case 'signin':
      return { ...state, token: action.payload, errorMessage: '' };

    default:
      return state;
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

    console.log(resp);
    dispatch({ type: 'signin', payload: resp.data.token });
    navigate('TrackList');
  } catch (error) {
    console.log('error', error);
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong on signin',
    });
  }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin },
  { token: null, errorMessage: '' },
);

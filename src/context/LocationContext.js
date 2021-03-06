import createDataContext from './createDataContext';

const initialState = {
  name: '',
  recording: false,
  locations: [],
  currentLocation: null,
};

const locationReducer = (state, action) => {
  switch (action.type) {
    case 'add_current_location':
      return { ...state, currentLocation: action.payload };

    case 'start_recording':
      return { ...state, recording: true, name: action.payload };

    case 'stop_recording':
      return { ...state, recording: false };

    case 'add_location':
      return {
        ...state,
        locations: [...state.locations, action.payload],
      };

    case 'reset':
      return {
        ...state,
        name: '',
        locations: [],
      };

    default:
      return state;
  }
};

const startRecording = dispatch => name => {
  dispatch({ type: 'start_recording', payload: name });
};

const stopRecording = dispatch => () => {
  dispatch({ type: 'stop_recording' });
};

const reset = dispatch => () => {
  dispatch({ type: 'reset' });
};

const addLocation = dispatch => (location, recording) => {
  dispatch({ type: 'add_current_location', payload: location });

  if (recording) {
    dispatch({ type: 'add_location', payload: location });
  }
};

export const { Context, Provider } = createDataContext(
  locationReducer,
  { startRecording, stopRecording, addLocation, reset },
  initialState,
);

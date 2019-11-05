import React, { useState, useContext } from 'react';
import { Input, Button } from 'react-native-elements';

import Spacer from './Spacer';
import { Context } from '../context/LocationContext';

const TrackForm = () => {
  const {
    state: { recording, locations },
    startRecording,
    stopRecording,
  } = useContext(Context);
  const [name, setName] = useState('');

  return (
    <>
      <Spacer>
        <Input
          onChangeText={setName}
          value={name}
          placeholder="Enter name"
        />
      </Spacer>
      {recording ? (
        <Button onPress={() => stopRecording()} title="Stop" />
      ) : (
        <Button
          onPress={() => startRecording(name)}
          title="Start Recording"
        />
      )}
    </>
  );
};

export default TrackForm;

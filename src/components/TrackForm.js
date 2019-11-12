import React, { useState, useContext } from 'react';
import { Input, Button } from 'react-native-elements';

import Spacer from './Spacer';
import { Context } from '../context/LocationContext';
import useSaveTrack from '../hooks/useSaveTrack';

const TrackForm = () => {
  const {
    state: { recording, locations },
    startRecording,
    stopRecording,
  } = useContext(Context);
  const [name, setName] = useState('');
  const [saveTrack] = useSaveTrack();

  return (
    <>
      <Spacer>
        <Input
          onChangeText={setName}
          value={name}
          placeholder="Enter name"
        />
      </Spacer>

      <Spacer>
        {recording ? (
          <Button onPress={() => stopRecording()} title="Stop" />
        ) : (
          <Button
            onPress={() => startRecording(name)}
            title="Start Recording"
          />
        )}
      </Spacer>

      <Spacer>
        {!recording && locations.length ? (
          <Button title="Save recording" onPress={saveTrack} />
        ) : null}
      </Spacer>
    </>
  );
};

export default TrackForm;

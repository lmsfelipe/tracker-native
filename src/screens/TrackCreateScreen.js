import React, { useContext, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView, withNavigationFocus } from 'react-navigation';

import '../_mockLocation';
import Map from '../components/Map';
import TrackForm from '../components/TrackForm';
import { Context } from '../context/LocationContext';
import useLocation from '../hooks/useLocation';

const TrackCreateScreen = ({ isFocused }) => {
  const { state, addLocation } = useContext(Context);
  const callback = useCallback(
    location => {
      addLocation(location, state.recording);
    },
    [state.recording],
  );
  const [error] = useLocation(isFocused, callback);

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Text h2>Create track</Text>
      <Map />
      {error ? <Text>Please enable location</Text> : null}
      <TrackForm />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);

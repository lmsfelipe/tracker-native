import React, { useContext } from 'react';
import { StyleSheet, Text } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';

import { Context as TrackContext } from '../context/TrackerContext';

const TrackDetailScreen = ({ navigation }) => {
  const { state } = useContext(TrackContext);
  const _id = navigation.getParam('_id');

  const track = state.find(track => track._id === _id);
  const initialCoords = track.locations[0].coords;

  const TrackList = () => null;

  trackList();

  return (
    <>
      <Text>{track.name}</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          longitudeDelta: 0.01,
          latitudeDelta: 0.01,
          ...initialCoords,
        }}
      >
        <Polyline
          coordinates={track.locations.map(loc => loc.coords)}
        />
      </MapView>
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300,
  },
});

export default TrackDetailScreen;

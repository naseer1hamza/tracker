import '../_mockLocation';
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import Map from '../components/Map';
import { SafeAreaView, withNavigationFocus } from 'react-navigation';
import useLocation from '../hooks/useLocation';
import { Context as LocationContext } from '../context/LocationContext';

const TrackCreateScreen = ({ isFocused }) => {
  const { addLocation } = useContext(LocationContext);

  const [permissions] = useLocation(addLocation);
  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Text h2> Create a Track </Text>
      <Map />
      {permissions === 'denied' ? (
        <Text>Please enable location services</Text>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);

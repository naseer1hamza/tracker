import { useEffect, useState } from 'react';
import {
  requestPermissionsAsync,
  watchPositionAsync,
  Accuracy
} from 'expo-location';
import * as Permissions from 'expo-permissions';

export default callback => {
  const [permissions, setPermissions] = useState(null);

  const startWatching = async () => {
    const response = await Permissions.askAsync(Permissions.LOCATION);
    setPermissions(response.status);
    await watchPositionAsync(
      {
        accuracy: Accuracy.BestForNavigation,
        timeInterval: 1000,
        distanceInterval: 10
      },
      callback
    );
  };

  useEffect(() => {
    startWatching();
  }, []);

  return [permissions];
};

import { useEffect, useState } from "react";
import {
  requestPermissionsAsync,
  watchPositionAsync,
  Accuracy
} from "expo-location";
import * as Permissions from "expo-permissions";

export default (shouldTrack, callback) => {
  const [permissions, setPermissions] = useState(null);
  //const [subscriber, setSubscriber] = useState(null);

  useEffect(() => {
    let subscriber;

    const startWatching = async () => {
      const response = await Permissions.askAsync(Permissions.LOCATION);
      setPermissions(response.status);
      subscriber = await watchPositionAsync(
        {
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 10
        },
        callback
      );
    };

    if (shouldTrack) {
      startWatching();
    } else {
      if (subscriber) {
        subscriber.remove();
      }
      subscriber = null;
    }
    return () => {
      if (subscriber) {
        subscriber.remove();
      }
    };
  }, [shouldTrack, callback]);

  return [permissions];
};

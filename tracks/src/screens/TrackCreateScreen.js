//import "../_mockLocation";
import React, { useContext, useCallback } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import Map from "../components/Map";
import { SafeAreaView, withNavigationFocus } from "react-navigation";
import useLocation from "../hooks/useLocation";
import { Context as LocationContext } from "../context/LocationContext";
import TrackForm from "../components/trackForm";
import { FontAwesome } from "@expo/vector-icons";

const TrackCreateScreen = ({ isFocused }) => {
  const {
    state: { recording },
    addLocation
  } = useContext(LocationContext);
  const callback = useCallback(
    location => {
      addLocation(location, recording);
    },
    [recording]
  );
  const [permissions] = useLocation(isFocused || recording, callback);
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text h2> Create a Track </Text>
      <Map />
      {permissions === "denied" ? (
        <Text>Please enable location services</Text>
      ) : null}
      <TrackForm />
    </SafeAreaView>
  );
};

TrackCreateScreen.navigationOptions = {
  title: "Add track",
  tabBarIcon: <FontAwesome name="plus" size={20} />
};

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);

import * as React from "react";
import { Text } from "react-native";
import { useGeolocation } from "react-use";

const GeoLocation = () => {
  const state = useGeolocation();

  if (state.error) {
    // TODO
    return <Text>Error using your geolocation</Text>;
  }
  if (state.loading) {
    // TODO - use spinner
    return <Text>Loading geolocation...</Text>;
  }
  return <pre>{JSON.stringify(state, null, 2)}</pre>;
};

export default GeoLocation;

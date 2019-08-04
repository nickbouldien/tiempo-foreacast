import * as React from "react";
import { StyleSheet, Text } from "react-native";
import { shallowEqual, useSelector } from "react-redux";
import { AppState } from "../../rootReducer";

const styles = StyleSheet.create({
  currentWeather: {
    fontSize: 20,
    margin: 10,
    textAlign: "center"
  }
});

export const CurrentWeather = () => {
  const currentWeather = useSelector(
    (state: AppState) => state.currentWeather,
    shallowEqual
  );
  console.log("state.currentWeather: ", currentWeather);
  if (currentWeather.error) {
    return (
      // TODO - show a more customized error message based on the actual error
      <Text>
        Getting the current weather resulted in an error. Please try again
      </Text>
    );
  }
  if (currentWeather.loading) {
    // TODO - add a spinner component
    return <Text>loading...</Text>;
  }
  return (
    <>
      <Text style={styles.currentWeather}>Current weather</Text>
    </>
  );
};

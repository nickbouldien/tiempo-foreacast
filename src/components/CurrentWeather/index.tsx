import * as React from "react";
import { StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    margin: 10,
    textAlign: "center"
  }
});

// interface IProps {
// }

export const CurrentWeather = () => (
  <>
    <Text style={styles.welcome}>Current weather</Text>
  </>
);

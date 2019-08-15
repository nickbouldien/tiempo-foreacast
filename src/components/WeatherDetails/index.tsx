import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { AppState } from "../../rootReducer";

const styles = StyleSheet.create({
  details: {
    flex: 1,
    paddingVertical: 0
  }
});

// interface IProps {
//   humidity: string | number;
//   sunrise: string | number;
//   sunset: string | number;
//   uvIndex: string | number;
// }

const WeatherDetails = (/*props: IProps*/) => {
  const weatherDetails = useSelector(
    (state: AppState) => state.currentWeather.weather
  );
  console.log("weatherDetails: ", weatherDetails);

  return (
    <View>
      <Text style={styles.details}>Weather details</Text>
    </View>
  );
};

export default WeatherDetails;

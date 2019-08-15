import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { IWeatherForecast } from "../../reducers/weatherForecast";

const styles = StyleSheet.create({
  day: {
    color: "#333333",
    marginBottom: 5
  },
  card: {
    paddingLeft: 8,
    paddingRight: 8,
    textAlign: "center"
  }
});

interface IProps {
  forecast: IWeatherForecast;
}

const ForecastCard = ({ forecast }: IProps) => (
  <View style={styles.card}>
    <Text style={styles.day}>{forecast.dayName}</Text>
    <Text style={styles.day}>high: {forecast.highTemp}&deg; </Text>
    <Text style={styles.day}>low: {forecast.lowTemp}&deg; </Text>
    <Text style={styles.day}>{forecast.precipitation}</Text>
    {/* <Text style={styles.day}>
      precipitation type: {forecast.precipitationType}
    </Text> */}
  </View>
);

export default ForecastCard;

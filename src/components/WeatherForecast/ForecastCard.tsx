import * as React from "react";
import { StyleSheet, Text } from "react-native";
import { IWeatherForecast } from "../../reducers/weatherForecast";

const styles = StyleSheet.create({
  day: {
    color: "#333333",
    marginBottom: 5,
    textAlign: "center"
  }
});

interface IProps {
  forecast: IWeatherForecast;
}

const ForecastCard = ({ forecast }: IProps) => (
  <>
    <Text style={styles.day}>day: {forecast.dayName}</Text>
    <Text style={styles.day}>high: {forecast.highTemp}</Text>
    <Text style={styles.day}>low: {forecast.lowTemp}</Text>
    <Text style={styles.day}>precipitation: {forecast.precipitation}</Text>
    <Text style={styles.day}>
      precipitation type: {forecast.precipitationType}
    </Text>
  </>
);

export default ForecastCard;

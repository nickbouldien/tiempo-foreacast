import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import ForecastCard from "./ForecastCard";
import { fetchWeatherForecast } from "../../actions/actionCreators";
import { ILocationState } from "../../reducers/location";
import {
  IWeatherForecastState,
  IWeatherForecast
} from "../../reducers/weatherForecast";
import { AppState } from "../../rootReducer";

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    margin: 10,
    textAlign: "center"
  },
  forecastSection: {
    flexDirection: "row"
  },
  weatherForecast: {
    backgroundColor: "#e8f4fd",
    borderRadius: 18
  }
});

interface IState {}

interface IOwnProps {}

interface IStateProps {
  location?: ILocationState;
  weatherForecast: IWeatherForecastState;
}

interface IDispatchProps {
  fetchWeatherForecast: (search: string) => void;
}

type Props = IStateProps & IOwnProps & IDispatchProps;

class WeatherForecast extends React.Component<Props, IState> {
  state: IState = {};

  render() {
    const { location, weatherForecast } = this.props;
    if (weatherForecast.loading || (location && location.loading)) {
      return <Text>loading forecast...</Text>;
    }
    if (weatherForecast.error || !weatherForecast.weather) {
      return <Text>error retrieving the weather forecast</Text>;
    }
    return (
      <View style={styles.weatherForecast}>
        {/* TODO - add the # of days for the forecast ie "{props.forecastDays} Day Weather Forecast" */}
        <Text style={styles.welcome}>5 Day Forecast</Text>
        {/* <pre>{JSON.stringify(weatherForecast)}</pre> */}
        <View style={styles.forecastSection}>
          {weatherForecast.weather.map((day: IWeatherForecast, ind) => (
            <ForecastCard key={`${day.dayName}${ind}`} forecast={day} />
          ))}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  localation: state.location,
  weatherForecast: state.weatherForecast
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): IDispatchProps => ({
  fetchWeatherForecast: (search: string) =>
    dispatch(fetchWeatherForecast(search))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeatherForecast);

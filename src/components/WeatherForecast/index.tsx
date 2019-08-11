import * as React from "react";
import { StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import ForecastCard from "./ForecastCard";
import { fetchWeatherForecast } from "../../actions/actionCreators";
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
  }
});

interface IState {}

interface IOwnProps {}

interface IStateProps {
  weatherForecast: IWeatherForecastState;
}

interface IDispatchProps {
  fetchWeatherForecast: (search: string) => void;
}

type Props = IStateProps & IOwnProps & IDispatchProps;

class WeatherForecast extends React.Component<Props, IState> {
  state: IState = {};
  componentDidMount() {
    this.props.fetchWeatherForecast("zip=38018");
  }
  render() {
    const { weatherForecast } = this.props;
    if (weatherForecast.loading) {
      return <Text>loading forecast...</Text>;
    }
    if (weatherForecast.error || !weatherForecast.weather) {
      return <Text>error retrieving the weather forecast</Text>;
    }
    return (
      <>
        {/* TODO - add the # of days for the forecast ie "{props.forecastDays} Day Weather Forecast" */}
        <Text style={styles.welcome}>Weather Forecast</Text>
        {/* <pre>{JSON.stringify(weatherForecast)}</pre> */}
        {weatherForecast.weather.map((day: IWeatherForecast, ind) => (
          <ForecastCard key={`${day.dayName}${ind}`} forecast={day} />
        ))}
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
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

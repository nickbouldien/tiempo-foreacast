import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { fetchWeather } from "../../actions/actionCreators";
import { ICurrentWeatherState } from "../../reducers/currentWeather";
import { ILocationState } from "../../reducers/location";
import { AppState } from "../../rootReducer";

const styles = StyleSheet.create({
  currentWeather: {
    alignItems: "center",
    backgroundColor: "#e8f4fd",
    borderRadius: 18,
    flex: 1,
    marginBottom: 16
  },
  title: {
    fontSize: 20,
    paddingBottom: 8,
    paddingTop: 8
  },
  temperature: {
    fontSize: 26,
    paddingBottom: 8,
    paddingTop: 8
  },
  details: {
    fontSize: 14,
    paddingBottom: 4,
    paddingTop: 4
  }
});

interface IState {}

interface IOwnProps {}

interface IStateProps {
  currentWeather: ICurrentWeatherState;
  location: ILocationState;
}

interface IDispatchProps {
  fetchWeather: (search: string) => void;
}

type Props = IStateProps & IOwnProps & IDispatchProps;

class CurrentWeather extends React.Component<Props, IState> {
  state: IState = {};

  render() {
    const { currentWeather, location } = this.props;
    if (!currentWeather || currentWeather.error || !currentWeather.weather) {
      return (
        // TODO - show a more customized error message based on the actual error
        <Text>
          Getting the current weather resulted in an error. Please try again
        </Text>
      );
    }
    if (currentWeather.loading || location.loading) {
      // TODO - add a spinner component
      return <Text>loading...</Text>;
    }
    return (
      <View style={styles.currentWeather}>
        <Text style={styles.title}>Current weather</Text>
        {/* <Text>{currentWeather.weather.city}</Text> */}
        <Text style={styles.temperature}>
          {currentWeather.weather.temperature}&deg;
        </Text>
        <Text style={styles.details}>{currentWeather.weather.description}</Text>
        <Text style={styles.details}>
          wind: {currentWeather.weather.wind} mph
        </Text>
      </View>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  currentWeather: state.currentWeather,
  location: state.location
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): IDispatchProps => ({
  fetchWeather: (search: string) => dispatch(fetchWeather(search))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentWeather);

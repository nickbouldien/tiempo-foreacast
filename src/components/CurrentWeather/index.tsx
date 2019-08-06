import * as React from "react";
import { Button, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { fetchWeather } from "../../actions/actionCreators";
import { ICurrentWeatherState } from "../../reducers/currentWeather";
import { AppState } from "../../rootReducer";

const styles = StyleSheet.create({
  currentWeather: {
    fontSize: 20,
    margin: 10,
    textAlign: "center"
  }
});

interface IState {}

interface IOwnProps {}

interface IStateProps {
  currentWeather: ICurrentWeatherState;
}

interface IDispatchProps {
  fetchWeather: (search: string) => void;
}

type Props = IStateProps & IOwnProps & IDispatchProps;

class CurrentWeather extends React.Component<Props, IState> {
  state = {};
  componentDidMount() {
    this.props.fetchWeather("memphis");
  }
  render() {
    const { currentWeather } = this.props;
    console.log("state.currentWeather: ", currentWeather);
    if (!currentWeather || currentWeather.error) {
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
        <Button
          onPress={() => this.props.fetchWeather("knoxville")}
          title="Refetch weather"
        />
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  currentWeather: state.currentWeather
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

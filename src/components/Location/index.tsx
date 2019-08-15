import * as React from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  Switch,
  View
} from "react-native";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import {
  fetchWeather,
  changeLocation,
  changeZipCode,
  toggleUseZipCode,
  toggleUseLocation
} from "../../actions/actionCreators";
import { AppState } from "../../rootReducer";
import { ILocationState } from "../../reducers/location";

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    textTransform: "capitalize",
    margin: 10,
    textAlign: "center"
  },
  locationSection: {
    backgroundColor: "#e8f4fd",
    borderRadius: 18,
    marginBottom: 16,
    padding: 8,
    paddingBottom: 12
  }
});

interface IState {
  searchValue: string;
  useMetric: boolean;
  zipCode: string;
}

interface IOwnProps {}

interface IStateProps {
  location: ILocationState;
}

interface IDispatchProps {
  fetchWeather: (search: string) => void;
  changeLocation: (city: string) => void;
  changeZipCode: (zipCode: string | number) => void;
  toggleUseZipCode: (useZipCode: boolean) => void;
  toggleUseLocation: (useLocation: boolean) => void;
}

type Props = IStateProps & IOwnProps & IDispatchProps;

class Location extends React.Component<Props, IState> {
  state: IState = {
    searchValue: "memphis",
    useMetric: false,
    zipCode: "37996"
  };

  refetchWeather = () => {
    // TODO - validate and handle errors
    let searchString = `q=${this.state.searchValue}`;

    const coords = this.props.location.coordinates;

    if (this.props.location.useLocation && coords) {
      // TODO - implement using browser location
      searchString = `lat=${coords.lat}&lon=${coords.lng}`;
    } else if (this.props.location.useZipCode) {
      searchString = `zip=${this.state.zipCode}`;
    }
    this.props.fetchWeather(searchString);
  };

  updateSearchMethod = () => {
    const useZip = this.props.location.useZipCode;
    this.props.toggleUseZipCode(!useZip);
  };

  updateUseLocation = () => {
    const useGeolocation = this.props.location.useLocation;
    this.props.toggleUseLocation(!useGeolocation);
  };

  toggleUnits = () => {
    this.setState({
      useMetric: !this.state.useMetric
    });
  };

  render() {
    const { location } = this.props;
    return (
      <View style={styles.locationSection}>
        {location.city && <Text style={styles.heading}>{location.city}</Text>}
        <Text>{location.useZipCode ? "use zipcode" : "use city"}</Text>
        <Switch
          onValueChange={this.updateSearchMethod}
          value={location.useZipCode}
        />
        {/* TOOD - using location is more invovled, so move this to another component */}
        <Text>{location.useLocation ? "use location" : "use search"}</Text>
        <Switch
          onValueChange={this.updateUseLocation}
          value={location.useLocation}
        />
        {/* <Text>{this.state.useMetric ? "°C" : "°F"}</Text>
        <Switch onValueChange={this.toggleUnits} value={this.state.useMetric} /> */}

        {/* TODO - best way to make labels in react-native??? */}
        {/* <Text>search value</Text> */}
        <TextInput
          editable={true}
          maxLength={30}
          keyboardType={"default"}
          onChangeText={text => this.setState({ searchValue: text })}
          value={this.state.searchValue}
        />
        <Text>zipcode</Text>
        <TextInput
          editable={true}
          maxLength={9}
          keyboardType={"number-pad"}
          onChangeText={num => this.setState({ zipCode: num })}
          value={this.state.zipCode}
        />
        <Button onPress={this.refetchWeather} title="Refetch Weather" />
      </View>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  location: state.location
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): IDispatchProps => ({
  fetchWeather: (search: string) => dispatch(fetchWeather(search)),
  changeLocation: (city: string) => dispatch(changeLocation(city)),
  changeZipCode: (zipCode: string | number) => dispatch(changeZipCode(zipCode)),
  toggleUseZipCode: (useZipCode: boolean) =>
    dispatch(toggleUseZipCode(useZipCode)),
  toggleUseLocation: (useLocation: boolean) =>
    dispatch(toggleUseLocation(useLocation))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Location);

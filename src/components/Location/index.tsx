import * as React from "react";
import { Button, StyleSheet, Text, TextInput, Switch } from "react-native";
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
    fontSize: 14,
    margin: 10,
    textAlign: "center"
  }
});

interface IState {
  searchValue: string;
  useLocation: boolean;
  useMetric: boolean;
  useZip: boolean;
  zipCode: number | string;
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
  state = {
    searchValue: "memphis",
    useLocation: false,
    useMetric: false,
    useZip: false,
    zipCode: "37996"
  };

  refetchWeather = () => {
    // TODO - validate and handle errors
    let searchString = `q=${this.state.searchValue}`;

    if (this.state.useLocation) {
      // TODO - implement using browser location
      searchString = "lat=35&lon=139";
    } else if (this.state.useZip) {
      searchString = `zip=${this.state.zipCode}`;
    }
    this.props.fetchWeather(searchString);
  };

  updateSearchMethod = () => {
    this.setState({
      useZip: !this.state.useZip
    });
  };

  updateUseLocation = () => {
    this.setState({
      useLocation: !this.state.useLocation
    });
  };

  toggleUnits = () => {
    this.setState({
      useMetric: !this.state.useMetric
    });
  };

  render() {
    // const { location } = this.props;
    return (
      <>
        <Text style={styles.heading}>location section</Text>
        <Text>{this.state.useZip ? "use zipcode" : "use city"}</Text>
        <Switch
          onValueChange={this.updateSearchMethod}
          value={this.state.useZip}
        />
        {/* TOOD - using location is more invovled, so move this to another component */}
        {/* <Text>{this.state.useLocation ? "use location" : "use search"}</Text>
        <Switch
          onValueChange={this.updateUseLocation}
          value={this.state.useLocation}
        /> */}
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
        {/* <Text>zipcode</Text> */}
        <TextInput
          editable={true}
          maxLength={9}
          keyboardType={"number-pad"}
          onChangeText={num => this.setState({ zipCode: num })}
          value={this.state.zipCode}
        />
        <Button onPress={this.refetchWeather} title="Refetch Weather" />
      </>
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

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
  zipCode: number | string;
  useZip: boolean;
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
    zipCode: "",
    useZip: false
  };

  updateSearch = () => {
    console.log("called updateSearch ");
    if (this.state.useZip) {
      //
    }
  };

  updateSearchMethod = () => {
    console.log("called updateSearchMethod ");
    this.setState({
      useZip: !this.state.useZip
    });
  };

  render() {
    const { location } = this.props;
    console.log("state.location: ", location);
    return (
      <>
        <Text style={styles.heading}>location section</Text>
        <Text>{this.state.useZip ? "use zipcode" : "don't use zipcode"}</Text>
        <Switch
          onValueChange={this.updateSearchMethod}
          value={this.state.useZip}
        />
        <TextInput
          editable={true}
          maxLength={30}
          keyboardType={"default"}
          onChangeText={text => this.setState({ searchValue: text })}
          value={this.state.searchValue}
        />
        <TextInput
          editable={true}
          maxLength={9}
          keyboardType={"number-pad"}
          onChangeText={num => this.setState({ zipCode: num })}
          value={this.state.zipCode}
        />
        <Button onPress={this.updateSearch} title="Update Search" />
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

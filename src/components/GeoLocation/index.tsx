import * as React from "react";
import { Text } from "react-native";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import {
  fetchWeather,
  updateCoordinates,
  locationError
} from "../../actions/actionCreators";
import { ILocationState, ICoordinates } from "../../reducers/location";
import { AppState } from "../../rootReducer";

function getCurrentPosition() {
  if (navigator.geolocation) {
    return new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject)
    );
  } else {
    // no geolocation, so reject
    return new Promise(reject => reject());
  }
}

interface IState {}

interface IOwnProps {}

interface IStateProps {
  location: ILocationState;
}

interface IDispatchProps {
  fetchWeather: (search: string) => void;
  updateCoordinates: (coordinates: ICoordinates) => void;
  locationError: (error: Error) => void;
}

type Props = IStateProps & IOwnProps & IDispatchProps;

class GeoLocation extends React.Component<Props, IState> {
  state: IState = {};
  componentDidMount() {
    // get geoLocation if the user wants to allow/use it
    if (this.props.location.useLocation) {
      // getGeolocation
      getCurrentPosition()
        .then((position: any) => {
          // TODO - fix the any
          const coordinates = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.props.updateCoordinates(coordinates);
        })
        .catch(() => {
          const err = new Error("Error retreiving your geolocation.");
          this.props.locationError(err);
        });
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.location.useLocation !== this.props.location.useLocation) {
    }
  }

  useGeoLocation = () => {
    // get geoLocation since the user wants to allow/use it
  };

  render() {
    return <Text>GeoLocation</Text>;
  }
}

const mapStateToProps = (state: AppState) => ({
  location: state.location
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): IDispatchProps => ({
  fetchWeather: (search: string) => dispatch(fetchWeather(search)),
  updateCoordinates: (coordinates: ICoordinates) =>
    dispatch(updateCoordinates(coordinates)),
  locationError: (err: Error) => dispatch(locationError(err))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GeoLocation);

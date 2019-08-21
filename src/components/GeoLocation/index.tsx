import * as React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import {
  fetchWeather,
  updateCoordinates,
  locationError,
  setLoading,
  toggleUseLocation,
  fetchWeatherForecast
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
  fetchWeather: (search?: string) => void;
  fetchWeatherForecast: (search?: string) => void;
  updateCoordinates: (coordinates: ICoordinates) => void;
  locationError: (error: Error) => void;
  setLoading: (loading: boolean) => void;
  toggleUseLocation: (useLocation: boolean) => void;
}

type Props = IStateProps & IOwnProps & IDispatchProps;

class GeoLocation extends React.Component<Props, IState> {
  state: IState = {};

  async componentDidMount() {
    // get geoLocation if the user wants to allow/use it.
    // if there is an error, fall back to using the city/zipcode
    this.props.setLoading(true);
    try {
      // TODO - fix the any
      const position: any = await getCurrentPosition();
      this.props.setLoading(false);

      const coordinates = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      this.props.updateCoordinates(coordinates);
      this.props.toggleUseLocation(true);
    } catch (e) {
      console.error("e ", e);
      const err = new Error("Error retrieving your geolocation.");
      this.props.setLoading(false);
      this.props.locationError(err);
      this.props.toggleUseLocation(false);
    }
    this.props.fetchWeather();

    this.props.fetchWeatherForecast();
  }

  componentDidUpdate(prevProps: Props) {
    const prevPropsLocation = prevProps.location;
    const currLocation = this.props.location;

    // TODO - need to do deep check on coordinates
    if (
      prevPropsLocation.useLocation !== currLocation.useLocation ||
      prevPropsLocation.coordinates !== currLocation.coordinates
    ) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state: AppState) => ({
  location: state.location
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): IDispatchProps => ({
  fetchWeather: (search?: string) => dispatch(fetchWeather(search)),
  fetchWeatherForecast: (search?: string) =>
    dispatch(fetchWeatherForecast(search)),
  updateCoordinates: (coordinates: ICoordinates) =>
    dispatch(updateCoordinates(coordinates)),
  locationError: (err: Error) => dispatch(locationError(err)),
  setLoading: (loading: boolean) => dispatch(setLoading(loading)),
  toggleUseLocation: (useLocation: boolean) =>
    dispatch(toggleUseLocation(useLocation))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GeoLocation);

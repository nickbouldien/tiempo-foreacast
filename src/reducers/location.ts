export interface ICoordinates {
  lat: number;
  lng: number;
}

export interface ILocationState {
  coordinates: ICoordinates | null;
  city?: string;
  error: Error | null;
  useLocation: boolean;
  loading: boolean;
  useZipCode: boolean;
  zipCode: string | number;
}

// TODO - add stricter typing
export type LocationAction =
  | { type: "CHANGE_CITY"; payload: string }
  | { type: "CHANGE_COORDINATES"; payload: ICoordinates }
  | { type: "CHANGE_ZIPCODE"; payload: string }
  | { type: "TOGGLE_USE_ZIPCODE"; payload: boolean }
  | { type: "LOCATION_ERROR"; payload: any }
  | { type: "TOGGLE_USE_LOCATION"; payload: any };

const initialState: ILocationState = {
  city: "memphis",
  coordinates: null,
  useLocation: false,
  error: null,
  loading: false,
  zipCode: "",
  useZipCode: false
};

function location(
  state = initialState,
  action: LocationAction
): ILocationState {
  switch (action.type) {
    case "CHANGE_CITY":
      return {
        ...state,
        city: action.payload
      };
    case "CHANGE_ZIPCODE":
      return {
        ...state,
        zipCode: action.payload
      };
    case "TOGGLE_USE_LOCATION":
      return {
        ...state,
        useLocation: action.payload
      };
    case "TOGGLE_USE_ZIPCODE":
      return {
        ...state,
        useZipCode: action.payload
      };
    case "CHANGE_COORDINATES":
      return {
        ...state,
        coordinates: action.payload
      };
    case "LOCATION_ERROR":
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

export default location;

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
}

export type LocationAction =
  | { type: "CHANGE_CITY"; payload: string }
  | { type: "ERROR"; payload: any };

const initialState: ILocationState = {
  city: "memphis",
  coordinates: null,
  useLocation: false,
  error: null,
  loading: false
};

function location(state = initialState, action: LocationAction) {
  switch (action.type) {
    case "CHANGE_CITY":
      return {
        ...state,
        city: action.payload
      };
    default:
      return state;
  }
}

export default location;

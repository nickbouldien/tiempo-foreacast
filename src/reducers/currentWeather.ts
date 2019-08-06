export interface ICurrentWeather {
  city: string;
  description: string;
  pressure: number | string;
  temperature: number | string;
  wind: number | string;
  visibility: number | string;
  // dewPoint,
  // heatIndex,
  // humidity,
  // icon,
}

export interface ICurrentWeatherState {
  weather: ICurrentWeather | null;
  error: Error | null;
  loading: boolean;
}

export type CurrentWeatherAction =
  | { type: "ERROR"; payload: Error }
  | { type: "FETCH_WEATHER" }
  | { type: "FETCH_WEATHER_FINISHED" }
  | { type: "UPDATE_WEATHER"; payload: ICurrentWeather };

const initialState: ICurrentWeatherState = {
  weather: null,
  error: null,
  loading: false
};

function currentWeather(state = initialState, action: CurrentWeatherAction) {
  console.log("action.type: ", action.type);
  switch (action.type) {
    case "FETCH_WEATHER":
      return {
        ...state,
        loading: true
      };
    case "FETCH_WEATHER_FINISHED":
      return {
        ...state,
        loading: false
      };
    case "UPDATE_WEATHER":
      return {
        ...state,
        weather: action.payload
      };
    case "ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
}

export default currentWeather;

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

const initialState: ICurrentWeatherState = {
  weather: null,
  error: null,
  loading: false
};

export type CurrentWeatherAction = { type: "FETCH_WEATHER" };

function currentWeather(state = initialState, action: CurrentWeatherAction) {
  switch (action.type) {
    case "FETCH_WEATHER":
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}

export default currentWeather;

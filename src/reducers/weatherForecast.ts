export interface IWeatherForecast {
  city: string;
  pressure: number | string;
  temperature: number | string;
  wind: number | string;
  dayName: string;
  highTemp: string;
  humidity: string;
  lowTemp: string;
  precipitation: string | number;
  precipitationType: string;
}

export interface IWeatherForecastState {
  weather: IWeatherForecast | null;
  error: Error | null;
  loading: boolean;
}

export type WeatherForecastAction =
  | { type: "ERROR_WEATHER_FORECAST"; payload: Error }
  | { type: "FETCH_WEATHER_FORECAST" }
  | { type: "FETCH_WEATHER_FORECAST_FINISHED" }
  | { type: "UPDATE_WEATHER_FORECAST"; payload: IWeatherForecast };

const initialState: IWeatherForecastState = {
  weather: null,
  error: null,
  loading: false
};

function weatherForecast(state = initialState, action: WeatherForecastAction) {
  switch (action.type) {
    case "FETCH_WEATHER_FORECAST":
      return {
        ...state,
        loading: true
      };
    case "FETCH_WEATHER_FORECAST_FINISHED":
      return {
        ...state,
        loading: false
      };
    case "UPDATE_WEATHER_FORECAST":
      return {
        ...state,
        weather: action.payload
      };
    case "ERROR_WEATHER_FORECAST":
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
}

export default weatherForecast;

import { combineReducers } from "redux";
import currentWeather from "./reducers/currentWeather";
import location from "./reducers/location";
import weatherForecast from "./reducers/weatherForecast";

export const rootReducer = combineReducers({
  currentWeather,
  location,
  weatherForecast
});

export type AppState = ReturnType<typeof rootReducer>;

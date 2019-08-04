import { combineReducers } from "redux";
import currentWeather from "./reducers/currentWeather";
// import location from "./reducers/location";

export const rootReducer = combineReducers({
  currentWeather
  // location
});

export type AppState = ReturnType<typeof rootReducer>;

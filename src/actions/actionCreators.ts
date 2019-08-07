import axios from "axios";
import { Dispatch } from "redux";
import { apiUrl } from "../utils/constants";
import { Config } from "../utils/index";
import { ICurrentWeather } from "../reducers/currentWeather";

// | { type: "CHANGE_CITY"; payload: string }
// | { type: "CHANGE_ZIPCODE"; payload: string }
// | { type: "TOGGLE_USE_ZIPCODE"; payload: boolean }
// | { type: "ERROR"; payload: any }
// | { type: "TOGGLE_USE_LOCATION"; payload: any };

/* location */
export function changeLocation(city: string) {
  return {
    type: "CHANGE_CITY",
    payload: city
  };
}

export function changeZipCode(zipCode: string | number) {
  return {
    type: "CHANGE_ZIPCODE",
    payload: zipCode
  };
}

export function toggleUseZipCode(useZipCode: boolean) {
  return {
    type: "TOGGLE_USE_ZIPCODE",
    payload: useZipCode
  };
}

export function toggleUseLocation(useLocation: boolean) {
  return {
    type: "TOGGLE_USE_LOCATION",
    payload: useLocation
  };
}

/* weather */
export const fetchWeather = (search: string) => (dispatch: Dispatch) => {
  const url = `${apiUrl}/weather?q=${search}&appid=${Config.app.apiKey}`;
  console.log("called with : ", search);
  console.log("url : ", url);

  dispatch({ type: "FETCH_WEATHER" });
  axios
    .get(url)
    .then(response => {
      console.log("response: ", response.data);
      dispatch({ type: "FETCH_WEATHER_FINISHED" });
      if (response && response.data) {
        // form the weather object
        const formattedData = formatData(response.data);
        dispatch({
          type: "UPDATE_WEATHER",
          payload: formattedData
        });
        return;
      }
      const err = new Error("there was an error retreiving the weather data.");
      dispatch({
        type: "ERROR",
        payload: err
      });
    })
    .catch(error => {
      dispatch({
        type: "ERROR",
        payload: error
      });
    });
};

// TODO - fix the any
function formatData(weatherData: any): ICurrentWeather {
  return {
    city: weatherData.name,
    description: weatherData.weather[0].description,
    // maxTemp: weatherData.main.temp_max,
    // minTemp: weatherData.main.temp_min,
    pressure: weatherData.main.pressure,
    temperature: weatherData.main.temp,
    wind: weatherData.wind.speed,
    visibility: weatherData.visibility
  };
}

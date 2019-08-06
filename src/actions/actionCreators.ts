import axios from "axios";
import { Dispatch } from "redux";
import { apiUrl } from "../utils/constants";
import { Config } from "../utils/index";

export function changeLocation(city: string) {
  return {
    type: "CHANGE_CITY",
    payload: city
  };
}

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
        // const responseWeather = response.data;
        const weather = {};
        // form the weather object
        return {
          type: "UPDATE_WEATHER",
          payload: weather
        };
      }
      const err = new Error("there was an error retreiving the weather data.");
      return {
        type: "ERROR",
        payload: err
      };
    })
    .catch(error => {
      return {
        type: "ERROR",
        payload: error
      };
    });
};

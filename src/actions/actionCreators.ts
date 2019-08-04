import axios from "axios";

export function fetchWeather(url: string) {
  return axios(url);
}

export function changeLocation(city: string) {
  return {
    type: "CHANGE_CITY",
    payload: city
  };
}

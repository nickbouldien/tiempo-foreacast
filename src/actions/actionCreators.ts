import axios from "axios";
import { Dispatch } from "redux";
import { apiUrl } from "../utils/constants";
import { Config } from "../utils/index";
import { ICurrentWeather } from "../reducers/currentWeather";
import { IWeatherForecast } from "../reducers/weatherForecast";
import { AppState } from "../rootReducer";
import { ICoordinates } from "../reducers/location";

/* location actions */
// TODO - type all of the return values for these functions
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

export function updateCoordinates(coordinates: ICoordinates) {
  return {
    type: "CHANGE_COORDINATES",
    payload: coordinates
  };
}

export function locationError(error: Error) {
  return {
    type: "LOCATION_ERROR",
    payload: error
  };
}

/* weather actions */
// TODO - refactor the fetch weather functions
export const fetchWeather = (search: string) => (dispatch: Dispatch) => {
  const units = true ? "imperial" : "metric"; // TODO - implement
  const searchString = `${search}&units=${units}&appid=${Config.app.apiKey}`;

  const url = `${apiUrl}/weather?${searchString}`;

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

// TODO - make the above fetchWeather function more reusable
// 5 day forecast:  `http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&mode=json&cnt=${count}&units=${units}&apikey=${API_KEY}`;
export const fetchWeatherForecast = (search: string) => (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  const { location } = getState();

  const count = 5; // TODO - make this a function param with 5 as the default
  const units = true ? "imperial" : "metric"; // TODO - implement
  const searchString = `${search}&units=${units}&cnt=${count}&appid=${
    Config.app.apiKey
  }`;

  const url = `${apiUrl}/forecast?${searchString}`;

  console.log("called fetchWeatherForecast with : ", search);
  console.log("url : ", url);

  dispatch({ type: "FETCH_WEATHER_FORECAST" });
  axios
    .get(url)
    .then(response => {
      console.log("response: ", response.data);
      dispatch({ type: "FETCH_WEATHER_FORECAST_FINISHED" });
      if (response && response.data) {
        // form the weather object
        const formattedData = formatForecastData(response.data);
        dispatch({
          type: "UPDATE_WEATHER_FORECAST",
          payload: formattedData
        });
        if (location.useZipCode) {
          console.log("location.useZipCode");
        }
        return;
      }
      const err = new Error(
        "there was an error retreiving the weather forecast data."
      );
      dispatch({
        type: "ERROR_WEATHER_FORECAST",
        payload: err
      });
    })
    .catch(error => {
      dispatch({
        type: "ERROR_WEATHER_FORECAST",
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

function formatForecastData(weatherData: any): IWeatherForecast[] {
  // the don't actually have the percent chance of precipition by day
  // https://openweathermap.desk.com/customer/portal/questions/17457140-forecast-precipitation
  let data = weatherData.list.map((day: any) => {
    // TODO - format the data
    return {
      dayName: "", // TODO - day.dayName,
      highTemp: day.main.temp_max,
      humidity: day.main.humidity,
      lowTemp: day.main.temp_min,
      precipitation: day.weather[0].main,
      precipitationType: day.weather[0].description,
      pressure: day.main.pressure,
      temperature: day.main.temp,
      wind: day.wind.speed
    };
  });

  return data;
}

const REACT_APP_WEATHER_KEY = process.env["REACT_APP_WEATHER_KEY"];
// import { REACT_APP_WEATHER_KEY } from "react-native-dotenv";

interface IConfig {
  app: {
    name: string;
    apiKey?: string;
  };
  os: {
    ios: string;
    android: string;
    web: string;
  };
  web: {
    root: string;
  };
}

export const Config: IConfig = {
  app: {
    name: "example",
    apiKey: REACT_APP_WEATHER_KEY
  },
  os: {
    android: "android",
    ios: "ios",
    web: "web"
  },
  web: {
    root: "root"
  }
};

import * as React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "../../rootReducer";
import {
  CurrentWeather,
  GeoLocation,
  Header,
  Location,
  // WeatherDetails,
  WeatherForecast
} from "../../components";

const middlewares = [thunk];

if (process.env.NODE_ENV === `development`) {
  console.info("app starting in dev mode");
  const { logger } = require(`redux-logger`);

  middlewares.push(logger);
}

const store = compose(applyMiddleware(...middlewares))(createStore)(
  rootReducer
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    flex: 1,
    justifyContent: "center"
  }
});

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1 }}>
          <Header />
          <Location />
          <GeoLocation />
          <CurrentWeather />
          <WeatherForecast />
          {/* <WeatherDetails /> */}
        </View>
      </SafeAreaView>
    </Provider>
  );
};

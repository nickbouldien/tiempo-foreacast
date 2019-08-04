import * as React from "react";
import { Platform, SafeAreaView, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "../../rootReducer";
import {
  CurrentWeather,
  Instructions,
  WeatherForecast,
  Welcome
} from "../../components";

const store = createStore(rootReducer, applyMiddleware(thunk));

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    flex: 1,
    justifyContent: "center"
  }
});

export const App = () => {
  const instructions = Platform.select({
    android:
      "Double tap R on your keyboard to reload,\nShake or press menu button for dev menu",
    ios: "Press Cmd+R to reload,\nCmd+D or shake for dev menu"
  });

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <Instructions instructions={instructions} />
        <Welcome name="Human" enthusiasmLevel={1} />

        <CurrentWeather />
        <WeatherForecast />
      </SafeAreaView>
    </Provider>
  );
};

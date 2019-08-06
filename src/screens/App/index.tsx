import * as React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "../../rootReducer";
import { CurrentWeather, WeatherForecast, Welcome } from "../../components";

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
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <Welcome name="Human" enthusiasmLevel={1} />

        <CurrentWeather />
        <WeatherForecast />
      </SafeAreaView>
    </Provider>
  );
};

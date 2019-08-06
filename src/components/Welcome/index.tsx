import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  button: {
    flex: 1,
    paddingVertical: 0
  },
  buttons: {
    flexDirection: "row"
  },
  greeting: {
    color: "#999",
    fontWeight: "bold",
    fontSize: 24
  },
  root: {
    alignItems: "center",
    alignSelf: "center"
  }
});

interface IProps {
  name: string;
  enthusiasmLevel?: number;
}

export interface IState {
  enthusiasmLevel: number;
}

export class Welcome extends React.Component<IProps, IState> {
  state = {
    enthusiasmLevel: this.props.enthusiasmLevel || 1
  };

  public render() {
    return (
      <View style={styles.root}>
        <Text style={styles.greeting}>Welcome to tiempo-forecast!</Text>
      </View>
    );
  }
}

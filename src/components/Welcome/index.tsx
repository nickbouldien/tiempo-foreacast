import * as React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import { Config } from "../../utils/Config";

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
    fontWeight: "bold"
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
  constructor(props: IProps) {
    super(props);
    this.state = {
      enthusiasmLevel: props.enthusiasmLevel || 1
    };
  }

  public render() {
    return (
      <View style={styles.root}>
        <Text style={styles.greeting}>
          Hello{" "}
          {this.props.name +
            this.getExclamationMarks(this.state.enthusiasmLevel)}
        </Text>

        <Text>apiKey: {Config.app.apiKey}</Text>

        <View style={styles.buttons}>
          <View style={styles.button}>
            <Button
              title="-"
              onPress={this.onDecrement}
              accessibilityLabel="decrement"
            />
          </View>

          <View style={styles.button}>
            <Button
              title="+"
              onPress={this.onIncrement}
              accessibilityLabel="increment"
            />
          </View>
        </View>
      </View>
    );
  }

  private onIncrement = () =>
    this.setState({ enthusiasmLevel: this.state.enthusiasmLevel + 1 });

  private onDecrement = () =>
    this.setState({
      enthusiasmLevel:
        this.state.enthusiasmLevel - 1 > 0 ? this.state.enthusiasmLevel - 1 : 0
    });

  private getExclamationMarks = (numChars: number) =>
    Array(numChars + 1).join("!");
}

import * as React from "react";
import { StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  instructions: {
    color: "#333333",
    marginBottom: 5,
    textAlign: "center"
  },
  welcome: {
    fontSize: 20,
    margin: 10,
    textAlign: "center"
  }
});

interface IProps {
  instructions: string;
}

export const Instructions = ({ instructions }: IProps) => (
  <>
    <Text style={styles.welcome}>Welcome to React Native!</Text>
    <Text style={styles.instructions}>
      To get started, edit ./src/containers/App/index.tsx
    </Text>
    <Text style={styles.instructions}>{instructions}</Text>
  </>
);

import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  title: {
    color: "#2196f3",
    fontWeight: "bold",
    fontSize: 28,
    marginBottom: 8,
    marginTop: 8
  },
  root: {
    alignItems: "center",
    alignSelf: "center"
  }
});

const Header: React.FC = () => {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>tiempo-forecast</Text>
    </View>
  );
};

export default Header;

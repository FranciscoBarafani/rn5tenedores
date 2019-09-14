import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.viewBody}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

//El index se usa como componente principal, se abre automaticamente
import React, { Component } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import UserInfo from "./UserInfo";

export default class MyAccountUser extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.viewBody}>
        <UserInfo />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    height: "100%",
    backgroundColor: "#f2f2f2"
  }
});

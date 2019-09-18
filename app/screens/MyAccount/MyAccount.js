//Pantalla de MyAccount
import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-elements";

export default class MyAccountScreen extends Component {
  //Funcion que lleva a pantalla interna de la pantalla raiz (StackScreen)
  goToScreen = nameScreen => {
    this.props.navigation.navigate(nameScreen);
  };

  render() {
    //Al hacer click en el botton este activa la funcion goToScreen que nos lleva a la otra pantalla
    return (
      <View style={styles.viewBody}>
        <Text>MyAccount</Text>
        <Button title="Registro" onPress={() => this.goToScreen("Register")} />
        <Button title="Login" onPress={() => this.goToScreen("Login")} />
      </View>
    );
  }
}

//Definicion de estilos
const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

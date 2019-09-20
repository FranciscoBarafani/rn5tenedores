//Pantalla de MyAccount
import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import * as firebase from "firebase";

//Importacion de componentes que funcionan como screens
import MyAccountGuest from "../../components/MyAccount/MyAccountGuest";
import MyAccountUser from "../../components/MyAccount/MyAccountUser";

export default class MyAccountScreen extends Component {
  constructor() {
    super();
    this.state = {
      login: false
    };
  }

  //Component Did Mount es Codigo que se ejecuta primero al cargar el screen
  async componentDidMount() {
    //Verifica si estamos logeados en firebase
    await firebase.auth().onAuthStateChanged(user => {
      //Si user no esta vacio realiza la accion
      if (user) {
        //Cambio el estado de logeado a true porque firebase devolvio el token
        this.setState({
          login: true
        });
      } else {
        this.setState({
          login: false
        });
      }
    });
  }

  //Funcion que lleva a pantalla interna de la pantalla raiz (StackScreen)
  goToScreen = nameScreen => {
    this.props.navigation.navigate(nameScreen);
  };
  //Funcion para cerrar sesion
  logOut = () => {
    firebase.auth().signOut();
  };

  render() {
    //Este tipo de variable asigna a login el valor que tiene el state.login del componente
    const { login } = this.state;
    if (login) {
      return <MyAccountUser />;
    } else {
      return <MyAccountGuest goToScreen={this.goToScreen} />;
    }
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

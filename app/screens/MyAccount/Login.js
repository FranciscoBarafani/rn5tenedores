import React, { Component } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Image, Button } from "react-native-elements";
//Importacion de tcomb
import t from "tcomb-form-native";
const Form = t.form.Form;
import { LoginStruct, LoginOptions } from "../../forms/Login";

export default class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      loginOptions: LoginOptions,
      loginStruct: LoginStruct
    };
  }

  render() {
    const { loginStruct, loginOptions } = this.state;

    return (
      <View style={styles.viewBody}>
        <Image
          source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
          style={styles.logo}
          PlaceholderContent={<ActivityIndicator />}
          resizeMode="contain"
        />
        <View style={styles.viewForm}>
          <Form ref="loginForm" type={loginStruct} options={loginOptions} />
          <Button title="Login" buttonStyle={styles.buttonLoginContainer} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    marginTop: 40,
    marginLeft: 40,
    marginRight: 40
  },
  logo: {
    width: 300,
    height: 150
  },
  buttonLoginContainer: {
    backgroundColor: "#00A680",
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  viewForm: {
    marginTop: 50
  }
});

import React, { Component } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Image, Button, SocialIcon, Divider } from "react-native-elements";
//Importacion de tcomb
import t from "tcomb-form-native";
const Form = t.form.Form;
import { LoginStruct, LoginOptions } from "../../forms/Login";
//Importacion de firebase
import * as firebase from "firebase";
//Importar Toast
import Toast, { DURATION } from "react-native-easy-toast";
import { FacebookApi } from "../../utils/Social";
import * as Facebook from "expo-facebook";

export default class LoginScreen extends Component {
  //Aca se ponen los atributos de la clase y su constructor
  constructor() {
    super();
    this.state = {
      loginOptions: LoginOptions,
      loginStruct: LoginStruct,
      loginData: {
        email: "",
        password: ""
      },
      loginErrorMessage: ""
    };
  }

  //Metodo login
  login = () => {
    //Valida contra el validador del form, Le paso el valor del form a la variable validate
    //Para luego validarla y utilizar sus campos para logear en firebase
    const validate = this.refs.loginForm.getValue();
    if (!validate) {
      this.setState({ loginErrorMessage: "Los datos ingresados son erroneos" });
    } else {
      this.setState({ loginErrorMessage: "" });
      //Login de Firebase
      firebase
        .auth()
        .signInWithEmailAndPassword(validate.email, validate.password)
        .then(() => {
          this.refs.toastLogin.show("Login correcto", 200, () => {
            this.props.navigation.goBack();
          });
        })
        .catch(error => {
          this.refs.toastLogin.show("Login incorrecto", 1500);
        });
    }
  };

  loginFacebook = async () => {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      FacebookApi.application_id,
      { permissions: FacebookApi.permissions }
    );
    if (type == "success") {
      const credentials = firebase.auth.FacebookAuthProvider.credential(token);
      firebase
        .auth()
        .signInWithCredential(credentials)
        .then(() => {
          this.refs.toastLogin.show("Login Correcto", 100, () => {
            this.props.navigation.goBack();
          });
        })
        .catch(error => {
          this.refs.toastLogin.show("Error al iniciar sesion", 300);
        });
    } else if (type == "cancel") {
      this.refs.toastLogin.show("Inicio de sesion cancelado", 300);
    } else {
      this.refs.toastLogin.show("Error al iniciar sesion", 300);
    }
  };

  //Por cada cambio del form le paso los nuevos valores del form(formValue) a la variables del estado
  //componente loginData
  onChangeFormLogin = formValue => {
    this.setState({
      loginData: formValue
    });
  };

  render() {
    const { loginStruct, loginOptions, loginErrorMessage } = this.state;

    return (
      <View style={styles.viewBody}>
        <Image
          source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
          style={styles.logo}
          PlaceholderContent={<ActivityIndicator />}
          resizeMode="contain"
        />
        <View style={styles.viewForm}>
          <Form
            ref="loginForm"
            type={loginStruct}
            options={loginOptions}
            value={this.state.loginData}
            onChange={formValue => this.onChangeFormLogin(formValue)}
          />
          <Button
            title="Login"
            buttonStyle={styles.buttonLoginContainer}
            onPress={() => this.login()}
          />
          <Text style={styles.textRegister}>
            Aun no tienes una cuenta?
            <Text
              style={styles.buttonRegister}
              onPress={() => {
                this.props.navigation.navigate("Register");
              }}
            >
              Registrate
            </Text>
          </Text>
          <Text style={styles.loginErrorMessage}>{loginErrorMessage}</Text>
          <Divider style={styles.divider} />
          <SocialIcon
            title="Logea con facebook"
            button
            type="facebook"
            onPress={() => this.loginFacebook()}
          />
        </View>
        <Toast
          ref="toastLogin"
          position="bottom"
          positionValue={250}
          fadeInDuration={1000}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{ color: "#fff" }}
        />
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
  },
  loginErrorMessage: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20
  },
  divider: {
    backgroundColor: "#00A680",
    marginBottom: 20
  },
  textRegister: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10
  },
  buttonRegister: {
    color: "#00A680",
    fontWeight: "bold"
  }
});

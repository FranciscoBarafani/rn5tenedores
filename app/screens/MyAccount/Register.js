//Pantalla de Registro
import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import t from "tcomb-form-native";
import { Button, Text, Image } from "react-native-elements";

//Instanciacion de Componente formulario
const Form = t.form.Form;
//Register struct es la estructura del formulario y RegisterOptions son las opciones del formulario
import { RegisterStruct, RegisterOptions } from "../../forms/Register";
//Importar Firebase
import * as firebase from "firebase";
//Importar Toast
import Toast, { DURATION } from "react-native-easy-toast";

//Todos los this hacen referencia al componente MyAccountScreen
export default class MyAccountScreen extends Component {
  //Constructor de la clase MyAccountScreen pasandole parametros iniciales (state)
  constructor() {
    super();
    this.state = {
      registerStruct: RegisterStruct,
      registerOptions: RegisterOptions,
      //Formulario Vacio
      formData: {
        user: "",
        email: "",
        password: "",
        passwordConfirmation: ""
      },
      formErrorMessage: ""
    };
  }
  //Funcion para registrar usuario
  register = () => {
    //Creo dos variables a las cuales le asigno los valores del state actual del form
    const { password, passwordConfirmation } = this.state.formData;
    if (password == passwordConfirmation) {
      const validate = this.refs.registerForm.getValue();
      if (validate) {
        this.setState({ formErrorMessage: "" });
        //Autenticacion de Usuarios con Firebas
        firebase
          .auth()
          .createUserWithEmailAndPassword(validate.email, validate.password)
          .then(resolve => {
            //Muestra el Toast (mensaje pop up)
            this.refs.toast.show("Registro Correcto", 200, () => {
              this.props.navigation.navigate("MyAccount");
            });
          })
          .catch(err => {
            this.refs.toast.show("El e-mail ya esta en uso", 2500);
          });
      } else {
        this.setState({
          formErrorMessage: "Formulario invalido"
        });
      }
    } else {
      this.setState({
        formErrorMessage: "Las contraseñas no son iguales"
      });
    }
  };

  //Funcion que actualiza las variables por cada modificacion del input
  onChangeFormRegister = formValue => {
    this.setState({
      formData: formValue
    });
    console.log(this.state.formData);
  };

  render() {
    //Asigno la estructura y opciones del formulario importados a MyAccountScreen
    const { registerStruct, registerOptions, formErrorMessage } = this.state;
    return (
      <View style={styles.viewBody}>
        <Image
          source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
          containerStyle={styles.containerLogo}
          style={styles.logo}
          PlaceholderContent={<ActivityIndicator />}
          resizeMode="contain"
        />
        <Form
          ref="registerForm"
          type={registerStruct}
          options={registerOptions}
          value={this.state.formData}
          // => es una funcion de tipo Arror, la cual esta compuesta por un input(Lado izquierdo) y
          //un output (lado derecho)
          onChange={formValue => this.onChangeFormRegister(formValue)}
        />
        <Button
          buttonStyle={styles.buttonRegisterContainer}
          title="Unirse"
          onPress={() => this.register()}
        />
        <Text style={styles.formErrorMessage}>{formErrorMessage}</Text>
        <Toast //Creacion del Toast
          ref="toast"
          position="bottom"
          positionValue={250}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{ color: "#fff" }}
        />
      </View>
    );
  }
}

//Definicion de Estilos
const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    marginLeft: 40,
    marginRight: 40,
    justifyContent: "center"
  },
  buttonRegisterContainer: {
    backgroundColor: "#00A680",
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  formErrorMessage: {
    color: "#f00",
    textAlign: "center",
    marginTop: 30
  },
  containerLogo: {
    alignItems: "center",
    marginBottom: 30
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
  }
});

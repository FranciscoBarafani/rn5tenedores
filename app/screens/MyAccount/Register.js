//Pantalla de Registro
import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import t from "tcomb-form-native";
import { Button } from "react-native-elements";

//Instanciacion de Componente formulario
const Form = t.form.Form;
//Register struct es la estructura del formulario y RegisterOptions son las opciones del formulario
import { RegisterStruct, RegisterOptions } from "../../forms/Register";

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
      }
    };
  }
  //Funcion para registrar usuario
  register = () => {
    //Creo dos variables a las cuales le asigno los valores del state actual del form
    const { password, passwordConfirmation } = this.state.formData;
    if (password == passwordConfirmation) {
      const validate = this.refs.registerForm.getValue();
      if (validate) {
        console.log("Formulario Correcto");
      } else {
        console.log("Formulario Invalido");
      }
    } else {
      console.log("Las contraseñas no son iguales");
    }
    //Valida el Formulario
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
    const { registerStruct, registerOptions } = this.state;
    return (
      <View style={styles.viewBody}>
        <Form
          ref="registerForm"
          type={registerStruct}
          options={registerOptions}
          value={this.state.formData}
          // => es una funcion de tipo Arror, la cual esta compuesta por un input(Lado izquierdo) y
          //un output (lado derecho)
          onChange={formValue => this.onChangeFormRegister(formValue)}
        />
        <Button title="Unirse" onPress={() => this.register()} />
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
  }
});

import React from "react";
import t from "tcomb-form-native";
import formValidation from "../utils/Validation";
import inputTemplate from "./templates/Input";

//Estructura de los campos
export const LoginStruct = t.struct({
  //Posee los validadores
  email: formValidation.email,
  password: formValidation.password
});

//Configuracion de los campos
export const LoginOptions = {
  fields: {
    email: {
      template: inputTemplate,
      config: {
        placeholder: "Ingrese email",
        iconType: "material-community",
        iconName: "at"
      }
    },
    password: {
      template: inputTemplate,
      config: {
        placeholder: "Ingrese contraseña",
        iconType: "material-community",
        iconName: "lock-outline",
        secureTextEntry: true,
        password: true
      }
    }
  }
};

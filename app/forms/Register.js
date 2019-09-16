//Aqui se define el Form, su Estructura y sus Opciones

import React from "react";
import t from "tcomb-form-native";
import formValidation from "../utils/Validation";
import inputTemplate from "../forms/templates/input";

//Estructura de los campos
export const RegisterStruct = t.struct({
  name: t.String,
  email: formValidation.email,
  password: formValidation.password,
  passwordConfirmation: formValidation.password
});

//Configuracion de los campos (Los nombres tienen que ser iguales
//a los de arriba(Estructura))
export const RegisterOptions = {
  fields: {
    name: {
      template: inputTemplate,
      config: {
        placeholder: "Escribe tu nombre y apellido",
        iconName: "account-outline",
        iconType: "material-community"
      }
    },
    email: {
      template: inputTemplate,
      config: {
        placeholder: "Escribe tu E-mail",
        iconName: "at",
        iconType: "material-community"
      }
    },
    password: {
      template: inputTemplate,
      config: {
        placeholder: "Escribe tu contraseña",
        password: true,
        secureTextEntry: true,
        iconName: "lock-outline",
        iconType: "material-community"
      }
    },
    passwordConfirmation: {
      template: inputTemplate,
      config: {
        placeholder: "Repite tu contraseña",
        password: true,
        secureTextEntry: true,
        iconName: "lock-reset",
        iconType: "material-community"
      }
    }
  }
};

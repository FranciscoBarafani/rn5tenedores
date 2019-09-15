//Aqui se define el Form, su Estructura y sus Opciones

import React from "react";
import t from "tcomb-form-native";
import formValidation from "../utils/Validation";

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
      label: "Nombre(*)",
      placeholder: "Escribe tu nombre y appelido",
      error: "Nombre y/o Apellido invalido"
    },
    email: {
      label: "E-Mail (*)",
      placeholder: "Escribe tu e-mail",
      error: "E-mail invalido"
    },
    password: {
      label: "Contrasena",
      placeholder: "Escribe tu contrasena",
      error: "Contrasena invalida",
      password: true,
      secureTextEntry: true
    },
    passwordConfirmation: {
      label: "Repetir contrasena",
      placeholder: "Repite tu contrasena",
      error: "Contrasena incorrecta",
      password: true,
      secureTextEntry: true
    }
  }
};

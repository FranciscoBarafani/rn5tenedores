//Este componente posee el menu para actualizar la informacion del usuario
//Si hacemos click en cambiar nombre y apellidos traera un overlay que es otro componente
import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ListItem } from "react-native-elements";
import OverlayOneInput from "../../Elements/OverlayOneInput";
import OverlayTwoInputs from "../../Elements/OverlayTwoInputs";
import OverlayThreeInputs from "../../Elements/OverlayThreeInputs";
import Toast, { Duration } from "react-native-easy-toast";

export default class UpdateUserInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //Configuracion del Menu
      //El ...this.state asigna el estado actual que ya tiene mas
      //Lo que sigue a continuacion
      ...this.props,
      overlayComponent: null,
      menuItems: [
        {
          title: "Cambiar Nombre y Apellidos",
          iconType: "material-community",
          iconNameRight: "chevron-right",
          iconColorRight: "#ccc",
          iconNameLeft: "account-circle",
          iconColorLeft: "#ccc",
          onPress: () =>
            this.openOverlay(
              "Nombre y Apellido",
              this.updateUserDisplayName,
              props.userInfo.displayName
            )
        },
        {
          title: "Cambiar E-Mail",
          iconType: "material-community",
          iconNameRight: "chevron-right",
          iconColorRight: "#ccc",
          iconNameLeft: "at",
          iconColorLeft: "#ccc",
          onPress: () =>
            this.openOverlayTwoInputs(
              "Email",
              "Contraseña",
              props.userInfo.email,
              this.updateUserEmail
            )
        },
        {
          title: "Cambiar Contraseña",
          iconType: "material-community",
          iconNameRight: "chevron-right",
          iconColorRight: "#ccc",
          iconNameLeft: "lock-reset",
          iconColorLeft: "#ccc",
          onPress: () =>
            this.openOverlayThreeInputs(
              "Contraseña actual",
              "Nueva contraseña",
              "Repita nueva contraseña",
              this.updateUserPassword
            )
        }
      ]
    };
  }

  //Funcion que actualiza el display name
  updateUserDisplayName = async newDisplayName => {
    if (newDisplayName) {
      this.state.updateUserDisplayName(newDisplayName);
    } else {
      this.setState({
        overlayComponent: null
      });
    }
  };

  //Funcion que actualiza el email
  updateUserEmail = async (newEmail, password) => {
    const emailOld = this.props.userInfo.email;
    if (emailOld != newEmail && password) {
      //Esta funcion updateUserEmail viene en el prop que le fue pasado en UserInfo
      this.state.updateUserEmail(newEmail, password);
    }
    this.setState({
      overlayComponent: null
    });
  };
  //Funcion que abre overlay
  updateUserPassword = async (
    currentPassword,
    newPassword,
    repeatNewPassword
  ) => {
    if (currentPassword && newPassword && repeatNewPassword) {
      if (newPassword === repeatNewPassword) {
        if (newPassword === currentPassword) {
          this.refs.toast.show(
            "La nueva contraseña no puede ser igual a la actual"
          );
        } else {
          this.state.updateUserPassword(currentPassword, newPassword);
        }
      } else {
        this.refs.toast.show("Las contraseñas no coinciden");
      }
    } else {
      this.refs.toast.show("Tienes que completar todos los campos");
    }
    this.setState({
      overlayComponent: null
    });
  };

  //Metodo para abrir el Overlay pasandole un placeholder
  //y la funcion de actualizacion
  openOverlay = (placeholder, updateFunction, inputValue) => {
    this.setState({
      overlayComponent: (
        <OverlayOneInput
          isVisibleOverlay={true}
          placeholder={placeholder}
          updateFunction={updateFunction}
          inputValue={inputValue}
        />
      )
    });
  };

  //Funcion para abrir segundo overlay
  openOverlayTwoInputs = (
    placeholderOne,
    placeholderTwo,
    inputValueOne,
    updateFunction
  ) => {
    this.setState({
      overlayComponent: (
        <OverlayTwoInputs
          isVisibleOverlay={true}
          placeholderOne={placeholderOne}
          placeholderTwo={placeholderTwo}
          updateFunction={updateFunction}
          inputValueTwo=""
          inputValueOne={inputValueOne}
          isPassword={true}
        />
      )
    });
  };

  openOverlayThreeInputs = (
    placeholderOne,
    placeholderTwo,
    placeholderThree,
    updateFunction
  ) => {
    this.setState({
      overlayComponent: (
        <OverlayThreeInputs
          isVisibleOverlay={true}
          placeholderOne={placeholderOne}
          placeholderTwo={placeholderTwo}
          placeholderThree={placeholderThree}
          inputValueOne=""
          inputValueTwo=""
          inputValueThree=""
          isPassword={true}
          updateFunction={updateFunction}
        />
      )
    });
  };

  render() {
    const { menuItems, overlayComponent } = this.state;

    return (
      //Menu Items.map recorre el array con la configuracion de cada boton para el menu
      <View style={styles.viewUpdateUserInfo}>
        {menuItems.map((item, index) => (
          <ListItem
            key={index}
            title={item.title}
            //Icono de la iquierda (contactos)
            leftIcon={{
              type: item.iconType,
              name: item.iconNameLeft,
              color: item.iconColorLeft
            }}
            //Icono de la derecha, flechita para abrir
            rightIcon={{
              type: item.iconType,
              name: item.iconNameRight,
              color: item.iconColorRight
            }}
            onPress={item.onPress}
            containerStyle={styles.contentContainerStyle}
          />
        ))}
        {overlayComponent}
        <Toast
          ref="toast"
          position="center"
          positionValue={0}
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
  viewUpdateUserInfo: {},
  contentContainerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3"
  }
});

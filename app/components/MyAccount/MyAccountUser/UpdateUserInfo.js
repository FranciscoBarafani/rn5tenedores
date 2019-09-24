//Este componente posee el menu para actualizar la informacion del usuario
//Si hacemos click en cambiar nombre y apellidos traera un overlay que es otro componente
import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ListItem } from "react-native-elements";
import OverlayOneInput from "../../Elements/OverlayOneInput";
import { update } from "tcomb";

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
          onPress: () => console.log("Click en boton")
        },
        {
          title: "Cambiar Contraseña",
          iconType: "material-community",
          iconNameRight: "chevron-right",
          iconColorRight: "#ccc",
          iconNameLeft: "lock-reset",
          iconColorLeft: "#ccc",
          onPress: () => console.log("Click en boton")
        }
      ]
    };
  }

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

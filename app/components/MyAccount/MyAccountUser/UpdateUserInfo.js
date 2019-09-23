import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ListItem } from "react-native-elements";
import OverlayOneInput from "../../Elements/OverlayOneInput";

export default class UpdateUserInfo extends Component {
  constructor() {
    super();

    this.state = {
      //Configuracion del Menu
      menuItems: [
        {
          title: "Cambiar Nombre y Apellidos",
          iconType: "material-community",
          iconNameRight: "chevron-right",
          iconColorRight: "#ccc",
          iconNameLeft: "account-circle",
          iconColorLeft: "#ccc",
          onPress: () => console.log("Click en boton")
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
  render() {
    const { menuItems } = this.state;

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
        <OverlayOneInput />
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

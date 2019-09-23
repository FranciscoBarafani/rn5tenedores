//Componente interno para armar la pantalla(Componente) de MyAccount
import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import UpdateUserInfo from "./UpdateUserInfo";

import * as firebase from "firebase";

export default class UserInfo extends Component {
  constructor(state) {
    super(state);

    //Guardamos datos del usuario que trae firebase a traves de getUserInfo y la almacenamos en el
    //state del componente
    this.state = {
      userInfo: {}
    };
  }
  //Lo que este adentro se ejecuta al cargar el componente
  componentDidMount = async () => {
    await this.getUserInfo();
  };

  //Trae informacion del usuario logeado con firebase
  getUserInfo = () => {
    const user = firebase.auth().currentUser;
    user.providerData.forEach(userInfo => {
      this.setState({
        userInfo
      });
    });
  };

  checkUserAvatar = photoURL => {
    //Operador ternario, si photoURL existe "?" no hace nada, sino asigna la url ":"
    return photoURL
      ? photoURL
      : "https://api.adorable.io/avatars/285/abott@adorable.png";
  };

  render() {
    const { displayName, email, photoUrl } = this.state.userInfo;
    return (
      <View>
        <View style={styles.viewUserInfo}>
          <Avatar
            rounded
            size="large"
            source={{
              uri: this.checkUserAvatar(photoUrl)
            }}
            containerStyle={styles.userInfoAvatar}
          />
          <Text style={styles.displayName}>{displayName}</Text>
          <Text>{email}</Text>
        </View>
        <UpdateUserInfo />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewUserInfo: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingBottom: 30,
    backgroundColor: "#f2f2f2",
    paddingTop: 30
  },
  userInfoAvatar: {
    marginRight: 20
  },
  displayName: {
    fontWeight: "bold"
  }
});

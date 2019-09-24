//Componente que muestra la informacion del usuario dentro del Index
import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import UpdateUserInfo from "./UpdateUserInfo";

import * as firebase from "firebase";

export default class UserInfo extends Component {
  constructor(props) {
    super(props);

    //Guardamos datos del usuario que trae firebase a traves de getUserInfo y la almacenamos en el
    //state del componente
    this.state = {
      ...props,
      userInfo: {}
    };
  }
  //Lo que este adentro se ejecuta al cargar el componente
  componentDidMount = async () => {
    await this.getUserInfo();
  };

  //Funcion para actualizar el nombre que se muestra
  updateUserDisplayName = async newDisplayName => {
    const update = {
      displayName: newDisplayName
    };
    await firebase.auth().currentUser.updateProfile(update);
    this.getUserInfo();
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

  //Metodo que trae el valor de userInfo
  returnUpdateUserInfoComponent = userInfoData => {
    if (userInfoData.hasOwnProperty("uid")) {
      return (
        <UpdateUserInfo
          userInfo={this.state.userInfo}
          updateUserDisplayName={this.updateUserDisplayName}
        />
      );
    }
  };

  checkUserAvatar = photoURL => {
    //Operador ternario, si photoURL existe "?" no hace nada, sino asigna la url ":"
    return photoURL
      ? photoURL
      : "https://api.adorable.io/avatars/285/abott@adorable.png";
  };

  //Dentro del render se encuentra el componente Update User Info el cual es el menu
  //Para actualizar la informacion del usuario.
  //Tambien le pasamos los props al componente UpdateUserInfo
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
          <View>
            <Text style={styles.displayName}>{displayName}</Text>
            <Text>{email}</Text>
          </View>
        </View>
        {this.returnUpdateUserInfoComponent(this.state.userInfo)}
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

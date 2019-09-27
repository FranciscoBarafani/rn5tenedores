//Componente que muestra la informacion del usuario dentro del Index
import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar, Button } from "react-native-elements";
import UpdateUserInfo from "./UpdateUserInfo";
import Toast, { Duration } from "react-native-easy-toast";
//Importacion de Image Picker y permissions de Expo
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
//Importacion de Firebase
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

  //Funcion para actualizar el email del usuario
  updateUserEmail = async (newEmail, password) => {
    this.reauthenticate(password)
      .then(() => {
        const user = firebase.auth().currentUser;
        user
          .updateEmail(newEmail)
          .then(() => {
            this.refs.toast.show(
              "Email actualizado, vuelve a iniciar sesion",
              50,
              () => {
                firebase.auth().signOut();
              }
            );
          })
          .catch(err => {
            this.refs.toast.show(err, 1500);
          });
      })
      .catch(err => {
        this.refs.toast.show("Tu contraseña no es correcta", 1500);
      });
  };

  //Funcion que actualiza contraseña
  updateUserPassword = async (currentPassword, newPassword) => {
    this.reauthenticate(currentPassword)
      .then(() => {
        const user = firebase.auth().currentUser;
        user
          .updatePassword(newPassword)
          .then(() => {
            this.refs.toast.show(
              "Contraseña actualizada correctamente,inicia sesion nuevamente",
              50,
              () => {
                firebase.auth().signOut();
              }
            );
          })
          .catch(() =>
            this.refs.toast.show("Error del servidor, intente nuevamente", 1500)
          );
      })
      .catch(() => {
        this.refs.toast.show(
          "Tu contraseña actual introducida no es correcta",
          1500
        );
      });
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

  //Reautenticacion para poder cambiar el email ya que es necesario ingresar la contraseña
  //Nuevamente
  reauthenticate = currentPassword => {
    const user = firebase.auth().currentUser;
    const credentials = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(credentials);
  };

  //Metodo que trae el componente de userInfo pasandole los metodos
  returnUpdateUserInfoComponent = userInfoData => {
    if (userInfoData.hasOwnProperty("uid")) {
      return (
        <UpdateUserInfo
          userInfo={this.state.userInfo}
          updateUserDisplayName={this.updateUserDisplayName}
          updateUserEmail={this.updateUserEmail}
          updateUserPassword={this.updateUserPassword}
        />
      );
    }
  };

  //Revisa que el usuario tenga un avatar, sino le asigna uno predeterminado
  checkUserAvatar = photoURL => {
    //Operador ternario, si photoURL existe "?" no hace nada, sino asigna la url ":"
    return photoURL
      ? photoURL
      : "https://api.adorable.io/avatars/285/abott@adorable.png";
  };
  //Actualiza la imagen del Usuario
  updateUserPhotoUrl = async photoUri => {
    const update = {
      //photoURL es un prop del componente
      photoURL: photoUri
    };
    await firebase.auth().currentUser.updateProfile(update);
    this.getUserInfo();
  };

  //Funcion para cambiar la imagen del avatar
  changeAvatarUser = async () => {
    //Pregunta si le damos el permiso para acceder a la camara
    const resultPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    if (resultPermission.status === "denied") {
      this.refs.toast.show("Es necesario aceptar los permisos", 1500);
    } else {
      //Esta funcion trae como resultado la direccion de la imagen y un par de datos mas
      //Se utiliza el UID para que cada vez que subamos una imagen reemplaze la anterior
      //Sino subiria una nueva
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });
      if (result.cancelled) {
        this.refs.toast.show("Has cerrado la galeria de imagenes", 1500);
      } else {
        const { uid } = this.state.userInfo;

        this.uploadImage(result.uri, uid)
          .then(resolve => {
            //Esta funcion devuelve la URL de la imagen recientemente subida
            this.refs.toast.show("Avatar actualizado correctamente", 1500);
            firebase
              .storage()
              .ref("avatar/" + uid)
              .getDownloadURL()
              .then(resolve => {
                this.updateUserPhotoUrl(resolve);
              })
              .catch(error => {
                this.refs.toast.show(
                  "Error al recuperar el avatar del servidor"
                );
              });
          })
          .catch(error => {
            this.refs.toast.show("Error al actualizar Avatar", 1500);
          });
      }
    }
  };

  //Funcion que sube la imagen seleccionada a Firebase
  uploadImage = async (uri, nameImage) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    let ref = firebase
      .storage()
      .ref()
      .child("avatar/" + nameImage);
    return ref.put(blob);
  };

  //Dentro del render se encuentra el componente Update User Info el cual es el menu
  //Para actualizar la informacion del usuario.
  //Tambien le pasamos los props al componente UpdateUserInfo
  render() {
    const { displayName, email, photoURL } = this.state.userInfo;
    return (
      <View>
        <View style={styles.viewUserInfo}>
          <Avatar
            rounded
            size="large"
            source={{
              uri: this.checkUserAvatar(photoURL)
            }}
            containerStyle={styles.userInfoAvatar}
            showEditButton
            onEditPress={() => {
              this.changeAvatarUser();
            }}
          />
          <View>
            <Text style={styles.displayName}>{displayName}</Text>
            <Text>{email}</Text>
          </View>
        </View>
        {this.returnUpdateUserInfoComponent(this.state.userInfo)}
        <Button
          title="Cerrar Sesion"
          //SI NO PONEMOS EL () => La funcion se ejecuta sin siquiera tocar el boton
          onPress={() => firebase.auth().signOut()}
          buttonStyle={styles.btnCloseSession}
          titleStyle={styles.btnCloseSessionText}
        />
        <Toast
          ref="toast"
          position="bottom"
          positionValue={250}
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
  },
  btnCloseSession: {
    marginTop: 30,
    borderRadius: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
    borderBottomColor: "#e3e3e3",
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 10
  },
  btnCloseSessionText: {
    color: "#00a680"
  }
});

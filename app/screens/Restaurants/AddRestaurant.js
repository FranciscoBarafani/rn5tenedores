import React, { Component } from "react";
import { StyleSheet, View, ScrollView, ActivityIndicator } from "react-native";
import { Icon, Image, Button, Overlay } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Toast, { DURATION } from "react-native-easy-toast";
import { uploadImage } from "../../utils/UploadImage";

import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

import t from "tcomb-form-native";
const Form = t.form.Form;
import {
  AddRestaurantStruct,
  AddRestaurantOptions
} from "../../forms/AddRestaurant";

export default class AddRestaurant extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      imageUriRestaurant: "",
      formData: {
        name: "",
        city: "",
        address: "",
        description: ""
      }
    };
  }
  //Esta funcion revisa si ya hay imagen, si no hay coloca que falta
  isImageRestaurant = image => {
    if (image) {
      return (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      );
    } else {
      return (
        <Image
          source={require("../../../assets/img/no-image-icon-13.jpg")}
          style={{ width: 200, height: 200 }}
        />
      );
    }
  };
  //Funcion para subir una imagen
  uploadImage = async () => {
    const resultPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    if (resultPermission.status === "denied") {
      this.refs.toast.show(
        "Es necesario aceptar los permisos de la galeria",
        1500
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true
      });
      if (result.cancelled) {
        this.refs.toast.show("Has cerrado la galeria de imagenes", 1500);
      } else {
        this.setState({
          imageUriRestaurant: result.uri
        });
      }
    }
  };
  onChangeFormAddRestaurant = formValue => {
    this.setState({
      formData: formValue
    });
  };
  //Funcion para agregar restaurante en firestone database
  addRestaurant = () => {
    const { imageUriRestaurant } = this.state;
    const { name, city, address, description } = this.state.formData;
    if (imageUriRestaurant && name && city && address && description) {
      db.collection("restaurants")
        .add({ name, city, address, description, image: "" })
        .then(resolve => {
          const restaurantId = resolve.id;
          uploadImage(imageUriRestaurant, restaurantId, "restaurants")
            .then(resolve => {
              const restaurantRef = db
                .collection("restaurants")
                .doc(restaurantId);
              restaurantRef
                .update({ image: resolve })
                .then(() => {
                  this.refs.toast.show("Restaurante creado correctamente");
                })
                .catch(() => {
                  this.refs.toast.show("Error de servidor, intente mas tarde");
                });
            })
            .catch(() => {
              this.refs.toast.show("Error de servidor intentelo mas tarde");
            });
        })
        .catch(() => {
          this.refs.toast.show("Error de servidor intentelo mas tarde", 1500);
        });
    } else {
      this.refs.toast.show("Debes llenar todos los campos", 1500);
    }
  };

  render() {
    const { imageUriRestaurant, loading } = this.state;

    return (
      <ScrollView style={styles.viewBody}>
        <View style={styles.viewPhoto}>
          {this.isImageRestaurant(imageUriRestaurant)}
        </View>
        <View>
          <Form
            ref="addRestaurantForm"
            type={AddRestaurantStruct}
            options={AddRestaurantOptions}
            value={this.state.formData}
            onChange={formValue => this.onChangeFormAddRestaurant(formValue)}
          />
        </View>
        <View style={styles.viewIconUploadPhoto}>
          <Icon
            name="camera"
            type="material-community"
            color="#7A7A7A"
            iconStyle={styles.addPhotoIcon}
            onPress={() => this.uploadImage()}
          />
        </View>
        <View style={styles.viewButtonAddRestaurant}>
          <Button
            buttonStyle={styles.btnAddRestaurant}
            title="Crear Restaurante"
            onPress={() => this.addRestaurant()}
          />
        </View>
        <Overlay
          overlayStyle={styles.overlayLoading}
          isVisible={loading}
          width="auto"
          height="auto"
        >
          <View>
            <Text>Creando Restaurante</Text>
            <ActivityIndicator size="large" />
          </View>
        </Overlay>
        <Toast
          ref="toast"
          position="bottom"
          positionValue={320}
          fadeInDuration={1000}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{ color: "#fff" }}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  },
  viewPhoto: {
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    width: 200,
    marginBottom: 20
  },
  viewIconUploadPhoto: {
    flex: 1,
    alignItems: "flex-start",
    marginLeft: 12
  },
  addPhotoIcon: {
    backgroundColor: "#e3e3e3",
    padding: 17,
    paddingBottom: 14
  },
  viewButtonAddRestaurant: {
    flex: 1,
    justifyContent: "center"
  },
  btnAddRestaurant: {
    backgroundColor: "#00a680",
    margin: 20
  }
});

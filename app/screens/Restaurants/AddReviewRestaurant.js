import React, { Component } from "react";
import { StyleSheet, View, ScrollView, ActivityIndicator } from "react-native";
import { AirbnbRating, Button, Overlay, Text } from "react-native-elements";
import Toast, { DURATION } from "react-native-easy-toast";

//Importador de Form
import t from "tcomb-form-native";
const Form = t.form.Form;
import {
  AddReviewRestaurantStruct,
  AddReviewRestaurantOptions
} from "../../forms/AddReviewRestaurant";
//Importacion de firebase
import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
import { isFrontCameraAvailable } from "expo/build/AR";
const db = firebase.firestore(firebaseApp);

export default class AddReviewRestaurantScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  sendReview = () => {
    const ratingValue = this.refs.rating.state.position;
    this.setState({ loading: true });
    const user = firebase.auth().currentUser;
    if (ratingValue == 0) {
      this.refs.toast.show("Tienes que puntuar el restaurante", 1500);
      this.setState({ loading: false });
    } else {
      const validate = this.refs.addReviewRestaurantForm.getValue();
      if (!validate) {
        this.setState({ loading: false });
        this.refs.toast.show("Completa el formulario", 1500);
      } else {
        const user = firebase.auth().currentUser;
        const data = {
          idUser: user.uid,
          avatarUser: user.photoURL,
          idRestaurant: this.props.navigation.state.params.id,
          title: validate.title,
          review: validate.review,
          rating: ratingValue,
          createAt: new Date()
        };
        db.collection("reviews")
          .add(data)
          .then(() => {
            const restaurantRef = db
              .collection("restaurants")
              .doc(this.props.navigation.state.params.id);
            restaurantRef.get().then(response => {
              const restaurantData = response.data();
              const ratingTotal = restaurantData.ratingTotal + ratingValue;
              const quantityVoting = restaurantData.quantityVoting + 1;
              const rating = ratingTotal / quantityVoting;
              restaurantRef
                .update({ rating, ratingTotal, quantityVoting })
                .then(() => {
                  this.setState({ loading: false });
                  this.refs.toast.show(
                    "Review enviada correctamente",
                    50,
                    () => {
                      this.props.navigation.state.params.loadReview();
                      this.props.navigation.goBack();
                    }
                  );
                });
            });
          })
          .catch(() => {
            this.refs.toast.show(
              "Error al enviar la review,intentelo mas tarde",
              1500
            );
          });
      }
    }
  };

  render() {
    const { loading } = this.state;
    return (
      <ScrollView style={styles.viewBody}>
        <View style={styles.viewRating}>
          <AirbnbRating
            ref="rating"
            count={5}
            reviews={["Pesimo", "Malo", "Normal", "Muy Bueno", "Excelente"]}
            defaultRating={0}
            size={35}
          />
        </View>
        <View style={styles.formReview}>
          <Form
            ref="addReviewRestaurantForm"
            type={AddReviewRestaurantStruct}
            options={AddReviewRestaurantOptions}
          />
        </View>
        <View style={styles.sendReview}>
          <Button
            buttonStyle={styles.sendButtonReview}
            title="Enviar"
            onPress={() => this.sendReview()}
          />
        </View>
        <Overlay
          overlayStyle={styles.overlayLoading}
          isVisible={loading}
          width="auto"
          height="auto"
        >
          <View>
            <Text style={styles.overlayLoadingText}>Enviando Review</Text>
            <ActivityIndicator size="large" color="#00a680" />
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
  viewRating: {
    height: 100,
    backgroundColor: "#f2f2f2"
  },
  formReview: {
    margin: 10,
    marginTop: 40
  },
  sendReview: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 40,
    marginLeft: 20,
    marginRight: 20
  },
  sendButtonReview: {
    backgroundColor: "#00a680"
  },
  overlayLoading: {
    padding: 20,
    borderRadius: 10
  },
  overlayLoadingText: {
    color: "#00a680",
    marginBottom: 20,
    fontSize: 20
  }
});

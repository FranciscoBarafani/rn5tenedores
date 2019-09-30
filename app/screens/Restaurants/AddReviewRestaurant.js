import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { AirbnbRating, Button } from "react-native-elements";

import t from "tcomb-form-native";
const Form = t.form.Form;
import {
  AddReviewRestaurantStruct,
  AddReviewRestaurantOptions
} from "../../forms/AddReviewRestaurant";

export default class AddReviewRestaurantScreen extends Component {
  constructor(props) {
    super(props);
  }

  sendReview = () => {
    console.log("Enviar Form");
    const ratingValue = this.refs.rating.state.position;
  };

  render() {
    return (
      <View style={styles.viewBody}>
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
      </View>
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
  }
});

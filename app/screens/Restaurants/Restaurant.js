import React, { Component } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Image, Icon, ListItem, Button } from "react-native-elements";

export default class RestaurantScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      id,
      name,
      city,
      address,
      description,
      image
    } = this.props.navigation.state.params.restaurant.item.restaurant;

    const listExtraInfo = [
      {
        text: `${city}, ${address}`,
        iconName: "map-marker",
        iconType: "material-community",
        action: null
      }
    ];
    return (
      <View style={styles.viewBody}>
        <View style={styles.viewImage}>
          <Image
            source={{ uri: image }}
            PlaceholderContent={<ActivityIndicator />}
            style={styles.imageRestaurant}
          />
        </View>
        <View style={styles.viewRestaurantBasicInfo}>
          <Text style={styles.nameRestaurant}>{name}</Text>
          <Text style={styles.descriptionRestaurant}>{description}</Text>
        </View>
        <View style={styles.restaurantExtraInfo}>
          <Text style={styles.restaurantExtraInfoTitle}>
            Informacion sobre el Restaurante
          </Text>
          {listExtraInfo.map((item, index) => (
            <ListItem
              key={index}
              title={item.text}
              leftIcon={<Icon name={item.iconName} type={item.iconType} />}
            />
          ))}
        </View>
        <View style={styles.viewBtnAddReview}>
          <Button
            title="Añadir Comentario"
            onPress={() => {
              this.props.navigation.navigate("AddReviewRestaurant", {
                id,
                name
              });
            }}
            buttonStyle={styles.btnAddReview}
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
  viewImage: {
    width: "100%"
  },
  imageRestaurant: {
    width: "100%",
    height: 200,
    resizeMode: "cover"
  },
  viewRestaurantBasicInfo: {
    margin: 15
  },
  nameRestaurant: {
    fontSize: 20,
    fontWeight: "bold"
  },
  descriptionRestaurant: {
    marginTop: 5,
    color: "grey"
  },
  restaurantExtraInfo: {
    margin: 15,
    marginTop: 25
  },
  restaurantExtraInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  },
  viewBtnAddReview: {
    margin: 20
  },
  btnAddReview: {
    backgroundColor: "#00a680"
  }
});

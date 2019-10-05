import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";
import MapView from "react-native-maps";

export default class MapScreen extends Component {
  constructor() {
    super();
    this.state = {
      currentLatitude: 0,
      currentLongitude: 0
    };
  }

  componentDidMount() {}

  getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  render() {
    return (
      <View styles={styles.container}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          showsUserLocation={true}
          style={styles.map}
          showsMyLocationButton
          showsCompass
          showsScale
        />
        <Button
          title="Mi Ubicacion"
          onPress={() => console.log(this.state.longitude)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    width: "100%",
    height: 400
  }
});

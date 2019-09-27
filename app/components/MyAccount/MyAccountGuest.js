import React, { Component } from "react";
import { StyleSheet, View, Text, ActivityIndicator, Image } from "react-native";
import { Button } from "react-native-elements";

export default class MyAccountGuest extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { goToScreen } = this.props;
    return (
      <View style={styles.viewBody}>
        <Image
          source={require("../../../assets/img/image-my-account-guest-01.jpg")}
          style={styles.image}
          PlaceholderContent={<ActivityIndicator />}
          resizeMode="contain"
        />
        <Text style={styles.title}>Consulta tu perfil de 5 Tenedores</Text>
        <Text style={styles.description}>
          Como describirias tu mejor restaurante? Busca y visualiza los mejores
          restaurantes de una forma sencilla, vota cual te ha gustado mas y
          comenta como ha sido tu experiencia.
        </Text>
        <Button
          title="Ver tu Perfil"
          buttonStyle={styles.btnViewProfile}
          onPress={() => goToScreen("Login")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 30,
    paddingRight: 30
  },
  image: {
    height: 300,
    marginBottom: 40
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 10
  },
  description: {
    textAlign: "center",
    marginBottom: 20
  },
  btnViewProfile: {
    backgroundColor: "#00A680",
    width: "100%"
  }
});

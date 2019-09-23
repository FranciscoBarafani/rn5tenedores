import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Overlay, Input, Button } from "react-native-elements";

export default class OverlayOneInput extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Overlay
        isVisible={true}
        overlayBackgroundColor="transparent"
        overlayStyle={styles.overlayStyle}
      >
        <View style={styles.viewOverlay}>
          <Input
            containerStyle={styles.inputContainer}
            placeholder="Texto"
            onChangeText={value => console.log(value)}
            value=""
          />
          <Button title="Actualizar" buttonStyle={styles.buttonUpdate} />
        </View>
      </Overlay>
    );
  }
}

const styles = StyleSheet.create({
  overlayStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  viewOverlay: {
    width: "100%",
    padding: 20,
    backgroundColor: "#fff"
  },
  inputContainer: {
    marginBottom: 20
  },
  buttonUpdate: {
    backgroundColor: "#00A680"
  }
});

//Componente tipo Overlay reutilizable
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Overlay, Input, Button, Icon } from "react-native-elements";

export default class OverlayTwoInputs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props
    };
  }

  onChangeInputOne = inputData => {
    this.setState({
      inputValueOne: inputData
    });
  };

  onChangeInputTwo = inputData => {
    this.setState({
      inputValueTwo: inputData
    });
  };

  update = () => {
    const newValueOne = this.state.inputValueOne;
    const newValueTwo = this.state.inputValueTwo;
    this.state.updateFunction(newValueOne, newValueTwo);
    this.setState({
      isVisibleOverlay: false
    });
  };

  close = () => {
    this.setState({
      isVisibleOverlay: false
    });
    this.state.updateFunction(null);
  };

  render() {
    const {
      isVisibleOverlay,
      placeholderOne,
      placeholderTwo,
      inputValueOne,
      inputValueTwo,
      isPassword
    } = this.state;
    return (
      <Overlay
        isVisible={isVisibleOverlay}
        overlayBackgroundColor="transparent"
        overlayStyle={styles.overlayStyle}
      >
        <View style={styles.viewOverlay}>
          <Input
            label={placeholderOne}
            containerStyle={styles.inputContainer}
            placeholder={placeholderOne}
            onChangeText={value => this.onChangeInputOne(value)}
            value={inputValueOne}
          />
          <Input
            label={placeholderTwo}
            containerStyle={styles.inputContainer}
            placeholder={placeholderTwo}
            onChangeText={value => this.onChangeInputTwo(value)}
            value={inputValueTwo}
            secureTextEntry={isPassword}
          />
          <Button
            title="Actualizar"
            buttonStyle={styles.buttonUpdate}
            onPress={() => this.update()}
          />
          <Icon
            containerStyle={styles.containerIconClose}
            type="material-community"
            name="close-circle-outline"
            size={30}
            onPress={() => this.close()}
          />
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
    backgroundColor: "#fff",
    borderColor: "#00A680",
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderRadius: 10
  },
  inputContainer: {
    marginBottom: 20
  },
  buttonUpdate: {
    backgroundColor: "#00A680"
  },
  containerIconClose: {
    position: "absolute",
    left: 0,
    top: 0
  }
});

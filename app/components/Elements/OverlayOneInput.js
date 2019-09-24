//Componente tipo Overlay reutilizable
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Overlay, Input, Button, Icon } from "react-native-elements";

export default class OverlayOneInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //Trae isVisibleOverlay, placeholder y inputValue como props los cuales se pasan de la
      //siguiente manera dentro de Update User Info:
      //<OverlayOneInput
      //isVisibleOverlay={true}
      //placeholder={placeholder}
      //updateFunction={updateFunction}
      //inputValue={inputValue}
      ///>
      ...props
    };
  }

  onChangeInput = inputData => {
    this.setState({
      inputValue: inputData
    });
  };

  update = () => {
    const newValue = this.state.inputValue;
    this.state.updateFunction(newValue);
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
    const { isVisibleOverlay, placeholder, inputValue } = this.state;
    return (
      <Overlay
        isVisible={isVisibleOverlay}
        overlayBackgroundColor="transparent"
        overlayStyle={styles.overlayStyle}
      >
        <View style={styles.viewOverlay}>
          <Input
            containerStyle={styles.inputContainer}
            placeholder={placeholder}
            onChangeText={value => this.onChangeInput(value)}
            value={inputValue}
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
    borderTopWidth: 2
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

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import UserNavigation from "./app/navigations/User";

//Instalacion de Firebase
//Importar configuracion de firebase
import { firebaseApp } from "./app/utils/FireBase";

export default function App() {
  return (
    <View style={styles.container}>
      <UserNavigation></UserNavigation>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

//Screens
import HomeScreen from "../screens/Home";
import MyAccountScreen from "../screens/MyAccount";
import TopFiveScreen from "../screens/TopFive";
import SearchScreen from "../screens/Search";

const homeScreenStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({ title: "Home" })
  }
});

const myAccountScreenStack = createStackNavigator({
  MyAccount: {
    screen: MyAccountScreen,
    navigationOptions: ({ navigation }) => ({ title: "MyAccount" })
  }
});

const searchScreenStack = createStackNavigator({
  Search: {
    screen: SearchScreen,
    navigationOptions: ({ navigation }) => ({ title: "Search" })
  }
});

const topFiveScreenStack = createStackNavigator({
  Search: {
    screen: TopFiveScreen,
    navigationOptions: ({ navigation }) => ({ title: "TopFive" })
  }
});

const RootStack = createBottomTabNavigator({
  Home: {
    screen: homeScreenStack
  }
});

export default createAppContainer(RootStack);

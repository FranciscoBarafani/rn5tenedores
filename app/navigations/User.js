//Navegador Global
import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Icon } from "react-native-elements";

//Screens Principales
import TopFiveScreen from "../screens/TopFive";
import SearchScreen from "../screens/Search";
//Screens de MyAccount
import MyAccountScreen from "../screens/MyAccount/MyAccount";
import RegisterScreen from "../screens/MyAccount/Register";
import LoginScreen from "../screens/MyAccount/Login";
//Screens Restaurants
import RestaurantsScreen from "../screens/Restaurants/Restaurants";
import AddRestaurantScreen from "../screens/Restaurants/AddRestaurant";
import RestaurantScreen from "../screens/Restaurants/Restaurant";
import AddReviewRestaurantScreen from "../screens/Restaurants/AddReviewRestaurant";
//Map Screen
import MapScreen from "../screens/Map/Map";

//Rutas dentro de cada Screen
const restaurantsScreenStack = createStackNavigator({
  Resutaurants: {
    screen: RestaurantsScreen,
    navigationOptions: ({ navigation }) => ({ title: "Home" })
  },
  AddRestaurant: {
    screen: AddRestaurantScreen,
    navigationOptions: ({ navigation }) => ({ title: "Nuevo Restaurante" })
  },
  Restaurant: {
    screen: RestaurantScreen,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.restaurant.item.restaurant.name
    })
  },
  AddReviewRestaurant: {
    screen: AddReviewRestaurantScreen,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.name
    })
  }
});

const mapScreenStack = createStackNavigator({
  Map: {
    screen: MapScreen,
    navigationOptions: ({ navigation }) => ({ title: "Mapa" })
  }
});

const myAccountScreenStack = createStackNavigator({
  MyAccount: {
    screen: MyAccountScreen,
    navigationOptions: ({ navigation }) => ({ title: "MyAccount" })
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: ({ navigation }) => ({ title: "Register" })
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: ({ navigation }) => ({ title: "Login" })
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

//Rutas Global / Instanciacion del BottomTab
const RootStack = createBottomTabNavigator(
  {
    //Distintas Opciones del Bottom Tab
    Restaurants: {
      screen: restaurantsScreenStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="compass-outline"
            type="material-community"
            size={22}
            color={tintColor}
          />
        )
      })
    },
    TopFive: {
      screen: topFiveScreenStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "Top 5",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="star-outline"
            type="material-community"
            size={22}
            color={tintColor}
          />
        )
      })
    },
    Map: {
      screen: mapScreenStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "Mapa",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="map-outline"
            type="material-community"
            size={22}
            color={tintColor}
          />
        )
      })
    },
    Search: {
      screen: searchScreenStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "Buscar",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="magnify"
            type="material-community"
            size={22}
            color={tintColor}
          />
        )
      })
    },
    MyAccount: {
      screen: myAccountScreenStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "Mi Cuenta",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="home-outline"
            type="material-community"
            size={22}
            color={tintColor}
          />
        )
      })
    }
  },

  //Configuracion del Tab, Ruta inicial al abrir la aplicacion
  {
    initialRouteName: "Restaurants",
    tabBarOptions: {
      inactiveTintColor: "#646464",
      activeTintColor: "#00a680"
    }
  }
);

export default createAppContainer(RootStack);

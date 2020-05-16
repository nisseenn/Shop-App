import React from 'react'
import { View, Text, Button, Platform } from 'react-native'
import 'react-native-gesture-handler';

import HomeScreen from '../screens/HomeScreen'
import ProductDetailScreen from '../screens/ProductDetailScreen'
import OwnListingScreen from '../screens/OwnListingScreen'
import SettingsScreen from '../screens/SettingsScreen'
import EditListingsScreen from '../screens/EditListingsScreen'
import OrdersScreen from '../screens/OrdersScreen'
import NewListingsScreen from '../screens/NewListingsScreen'
import PlacedOrderScreen from '../screens/PlacedOrderScreen'
import AuthScreen from '../screens/AuthScreen'
import StartUpScreen from '../screens/StartUpScreen'

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

const ShopNavigator = createStackNavigator({
  Homescreen: {
    screen: HomeScreen,
  },
  ProductScreen: {
    screen: ProductDetailScreen,
  },
  Settings: {
    screen: SettingsScreen
  },
});

const ProfileNavigator = createStackNavigator({
  OwnListings:{
    screen: OwnListingScreen,
  },
  EditListings: {
    screen: EditListingsScreen
  },
  NewListing:{
    screen: NewListingsScreen
  }
})

const OrdersNavigator = createStackNavigator({
  Orders:{
    screen:OrdersScreen
  },
  Settings: {
    screen: SettingsScreen
  },
  PlacedOrders: {
    screen: PlacedOrderScreen
  }
})

const tabScreenConfig = {
    Market: {
      screen: ShopNavigator,
      navigationOptions:{
        tabBarIcon: () => {
            return <Ionicons name="ios-list" size={24}/>
          }
      }
    },
    Yours: {
      screen: ProfileNavigator,
      navigationOptions:{
        tabBarIcon: () => {
          return <Ionicons name="ios-person" size={24}/>
        },
      }
    },
    Cart:{
      screen: OrdersNavigator,
      navigationOptions:{
        tabBarIcon: () => {
          return <Ionicons name="ios-cart" size={24} />
        }
      }
    },
    // Settings:{
    //   screen: SettingsNavigator,
    //   navigationOptions:{
    //     tabBarIcon: () => {
    //       return <Ionicons name="ios-settings" size={24} />
    //     }
    //   }
    // }
  }

const BottomNavigator = createBottomTabNavigator(tabScreenConfig, {
  activeTintColor: '#8BE8CB',
  shifting: true,
});

const AuthNavigator = createStackNavigator({
  Auth: AuthScreen
})

const MainNavigator = createSwitchNavigator({
  StartUp: StartUpScreen,
  Auth: AuthNavigator,
  Shop: BottomNavigator
})

// const mainNavigator = createDrawerNavigator({
//   ActivityFavs: {
//     screen: bottomNavigator,
//     navigationOptions: {
//     drawerLabel: "Shop"
//     }
//   },
//   Settings:{
//     screen: SettingsNavigator,
//     navigationOptions:{
//       drawerLabel: "Settings"
//     }
//   }
// })

let Navigation = createAppContainer(MainNavigator);
export default () => <Navigation />

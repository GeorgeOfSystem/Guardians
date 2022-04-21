import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Screens
import HomeScreen from '../screens/HomeScreen';
import HomeDetailScreen from '../screens/HomeDetailScreen';
import ProfileScreen from '../screens/ProfileScreen';
import GuardiansDetailsScreen from '../screens/GuardiansDetailsScreen';
import MapScreen from '../screens/MapScreen';
import DetailListScreen from '../screens/DetailListScreen';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#a4bce2",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="HomeDetail" component={HomeDetailScreen} />
      <Stack.Screen name="Detail" component={DetailListScreen} />
    </Stack.Navigator>
  );
}

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="GuardiansDetails" component={GuardiansDetailsScreen} />
    </Stack.Navigator>
  );
}

const MapStackNavigator = () => {
    return(
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Map" component={MapScreen}/>
        </Stack.Navigator>
    );
}

export { HomeStackNavigator, ProfileStackNavigator, MapStackNavigator };
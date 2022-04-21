import React from "react";
import Icon  from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeStackNavigator, ProfileStackNavigator, MapStackNavigator } from "./StackNavigator";


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'home') {
                        (focused) ? iconName = 'home' : iconName = 'home-outline';
                    } else if (route.name === 'profile') {
                        (focused) ? iconName = 'paw' : iconName = 'paw-outline';
                    } else if (route.name === 'map') {
                        (focused) ? iconName = 'map' : iconName = 'map-outline';
                    }

                    // You can return any component that you like here!
                    //<Icon name="md-map" color={tintColor} size={30}/>
                    return <Icon name={iconName} size={size} color={color} />;
                },
                showLabel: false,
                tabBarActiveTintColor: '#7E97BF',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            })}
            initialRouteName= 'home'
            >
            <Tab.Screen name="map" component={MapStackNavigator} />
            <Tab.Screen name="home" component={HomeStackNavigator} />
            <Tab.Screen name="profile" component={ProfileStackNavigator} />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
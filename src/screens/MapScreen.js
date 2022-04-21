import React from "react";
import { SafeAreaView } from "react-navigation";
import { Text, StyleSheet } from "react-native";
import Icon  from "react-native-vector-icons/Ionicons";
import Map from "../components/Map";

const MapScreen = ({navigation}) => {
    return(
        <SafeAreaView forceInset={{ top:'always' }}>
           <Map/>
        </SafeAreaView>
    );
} 

MapScreen.navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
        <Icon name="md-map" color={tintColor} size={30}/>
    )
}

export default MapScreen
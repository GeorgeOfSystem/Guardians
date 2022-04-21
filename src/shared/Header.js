import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon  from "react-native-vector-icons/Ionicons";

export default function Header({navigation}) {
    const openMenu = () => {
       navigation.openDrawer()
    }

    return(
        <View style={style.header}>
            <Icon name='menu' size={30}
            style={style.icon}
            onPress={openMenu}/>
            <View>
                <Text style={style.headerText}>Header</Text>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    header: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#333',
        letterSpacing: 1
    },
    icon: {
        position: 'absolute',
        left: 16
    }
});
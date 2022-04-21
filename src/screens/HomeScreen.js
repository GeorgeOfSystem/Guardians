import React, {useState, useEffect} from "react";
import { SafeAreaView } from "react-navigation";
import { Text, StyleSheet, View, TouchableOpacity, FlatList, Image, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const numColumns = 4;
const WIDTH = Dimensions.get('window').width;
const response = [
    {
        id: '1',
        tittle: 'Agendar Cita',
        description: 'Programar cita con tu veterinario de preferencia',
        icon: 'calendar'
    }, {
        id: '2',
        tittle: 'SOS',
        description: 'En caso de emergencias, consulte aquí',
        icon: 'warning'
    }, {
        id: '3',
        tittle: 'Adopción',
        description: 'Encuentre a tu nuevo Guardian',
        icon: 'paw'
    }, {
        id: '4',
        tittle: '¿Qué Raza Soy?',
        description: 'Aquí te damos pautas para que sepas de que raza son tus Guardianes',
        icon: 'finger-print'
    }, {
        id: '5',
        tittle: 'Medicación',
        description: 'Que medicamentos pueden tomar',
        icon: 'bandage-outline'
    }
];

const HomeScreen = ({ navigation }) => {

    return (
        <FlatList
            style={style.container} forceInset={{ top: 'always' }}
            data={response}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity
                        style={style.item}
                        onPress={() => navigation.navigate('HomeDetail', { _id: item.id, _tittle: item.tittle })}>
                        <View style={{ flexDirection: 'row' , alignItems:'center'}}>
                            <Icon name={item.icon} color='white' size={30} style={{ margin: '10%'}} />
                            <View style={{flex:2}}>
                                <Text style={style.itemText}>{item.tittle}</Text>
                                <Text>{item.description}</Text>

                            </View>
                        </View>
                    </TouchableOpacity>
                );
            }}
        />
    );
}

HomeScreen.navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
        <Icon name="home" color={tintColor} size={30} />
    )
}

const style = StyleSheet.create({
    container: {
        margin: 4,
        padding: 30,
    },
    item: {
        backgroundColor: '#80873B',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
        height: WIDTH / numColumns,
        borderRadius: 100 / 4
    },
    itemText: {
        color: 'white',
        fontSize: 20
    },
    tinyLogo: {
        width: 100,
        height: 100,
        alignContent: 'center',
        margin: 10,
        borderRadius: 20
    },
})

export default HomeScreen
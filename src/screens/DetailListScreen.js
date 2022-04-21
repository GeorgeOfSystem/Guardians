import React from "react";
import { SafeAreaView } from "react-navigation";
import { Text, StyleSheet, View, ScrollView } from "react-native";

const DetailList = ({ route, navigation }) => {
    const { _itemSelected, _type } = route.params;
    console.log(_type);
    console.log(_itemSelected);
    switch (_type) {
        case 'Veterinary':
            return (
                <SafeAreaView>
                    <ScrollView>
                        <Text style={{ fontSize: 48, alignSelf: 'center', }}>{_itemSelected.name}</Text>
                        <Text style={{ alignSelf: 'flex-start', margin: '5%', fontSize: 20 }}> Historial de Citas: </Text>
                    </ScrollView>
                </SafeAreaView>
            );

        case 'Medication':
            return (
                <View style={style.mainPage}>
                    <Text style={{ fontSize: 48, alignSelf: 'center', }}>{_itemSelected.name}</Text>
                    <Text>image here</Text>
                    <Text style={{ alignSelf: 'flex-start', margin: '5%', fontSize: 20 }}> se puede usar en: </Text>
                    <Text>{_itemSelected.patient}</Text>
                    <Text style={style.description} >{_itemSelected.description}</Text>
                </View>
            );

        case 'IdentifyBreed':
            return (
                <SafeAreaView style={style.mainPage}>
                    <ScrollView>
                        <Text style={{ fontSize: 48, alignSelf: 'center', }}>{_itemSelected.name}</Text>
                        <Text>image here</Text>
                        <Text style={{ alignSelf: 'flex-start', margin: '5%', fontSize: 20 }}> Características: </Text>
                        <Text style={{ alignSelf: 'flex-start', marginHorizontal: '5%', fontSize: 20 }}>{_itemSelected.description}</Text>
                    </ScrollView>
                </SafeAreaView>
            );

        case 'SOS':
            return (
                <SafeAreaView>
                    <ScrollView>
                        <Text style={{ fontSize: 48, alignSelf: 'center', }}>{_itemSelected.name}</Text>
                        <Text style={{ alignSelf: 'flex-start', margin: '5%', fontSize: 20 }}> Síntomas: </Text>
                        <Text style={{ alignSelf: 'flex-start', marginHorizontal: '5%', fontSize: 20 }}>{_itemSelected.symptom}</Text>
                        <Text style={{ alignSelf: 'flex-start', margin: '5%', fontSize: 20 }}> ¿Qué Hacer?: </Text>
                        <Text style={{ alignSelf: 'flex-start', marginHorizontal: '5%', fontSize: 20 }}>{_itemSelected.description}</Text>
                    </ScrollView>
                </SafeAreaView>
            );
        default:
            break;
    }
}

const style = StyleSheet.create({
    mainPage: {
        alignItems: 'center',
    },
    description: {
        margin: '5%',
        fontSize: 20
    }
});

export default DetailList
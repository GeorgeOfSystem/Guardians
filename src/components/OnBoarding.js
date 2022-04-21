import React, { useState, useRef } from "react";
import { Dimensions, StyleSheet, View, Text, FlatList, Animated, Button, SafeAreaView } from "react-native";

import Paginator from './Paginator';

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width
const slides = [
    {
        id: '1',
        tittle: 'Facil y Rápido',
        description: 'Cuida de tus Mascotas',
        //image: require(''),
    },
    {
        id: '2',
        tittle: 'Facil y Rápido 2',
        description: 'Cuida de tus Mascotas',
        //image: require(''),
    }, {
        id: '3',
        tittle: 'Facil y Rápido 3',
        description: 'Cuida de tus Mascotas',
        //image: require(''),
    }, {
        id: '4',
        tittle: 'Facil y Rápido 4',
        description: 'Cuida de tus Mascotas',
        //image: require(''),
    }
];

const OnBoarding = ({ navigation }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [finish, setFinish] = useState(false);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slideRef = useRef(null);

    const viewbleItemChange = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index);

    }).current

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    return (
        <SafeAreaView>
            <View styles={styles.container}>
                <View style={{ flex: 3 }}>
                    <Text>Ejemplo</Text>
                </View>
                <Paginator data={slides} scrollX={scrollX} />
                <Button
                    title="Skip"
                    styles={{ alignItems: 'flex-end' }}
                    onPress={() => navigation.push('DrawerHome')}
                />
                {
                    currentIndex === slides.length - 1 &&
                    <Button
                        title="Entendido!!"
                        onPress={() => navigation.push('DrawerHome')}
                    />
                }
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tittle: {
        fontSize: 28,
        marginBottom: 10,
        color: '#493d8a',
        fontWeight: '800',
        textAlign: 'center'
    },
    description: {
        color: '#62656b',
        fontWeight: '300',
        textAlign: 'center',
        paddingHorizontal: 64,
    }
});

export default OnBoarding
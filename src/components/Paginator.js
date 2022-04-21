import React from "react";
import { View, Text, StyleSheet, Animated, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const Paginator = ({ data, scrollX }) => {
    return (
        <View style={{ flexDirection: 'row', height: 64, alignSelf: 'center' }}>
            {data.map((_, i) => {
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [10, 20, 10],
                    //extrapolate: 'clamp',
                });
                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.3, 1, 0.3],
                    //extrapolate: 'clamp'
                });
                return (<Animated.View style={[styles.dot, { width: dotWidth, opacity }]} key={i.toString()} >
                    <Icon name="paw" color={'#a4bce2'} size={30} style={{ transform: [{ rotateY: '90deg' }] }} />
                </Animated.View>);
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    dot: {
        height: 10,
        borderRadius: 5,
        marginHorizontal: 8,
        backgroundColor: "#493d8a",
    }
});

export default Paginator
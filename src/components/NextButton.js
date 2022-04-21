import React from "react";
import { View, Text, StyleSheet, Animated, Dimensions } from "react-native";
import Svg, { G, Circle } from "react-native-svg";

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const NextButton = ({ data, scrollX }) => {
    const size = 128;
    const strokeWidth = 2;
    const center = size / 2;
    const radius = size / 2 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;
    return (
        <View style={{ flexDirection: 'row', height: 64, alignSelf: 'center' }}>
            <Svg width={size} height={size}>
                <G rotation='90' origin={center}>
                    <Circle/>
                    <Circle
                        r={radius}
                        cy={center}
                        cx={center}
                        stroke='#E6E7E8'
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference - (circumference * 25) / 100} />
                </G>
            </Svg>
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

export default NextButton
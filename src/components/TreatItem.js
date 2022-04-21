import React from "react";
import { View, Text } from "react-native";

const TreatItem = ({item}) => {
    return(
        <View>
            <Text>{item.tittle}</Text>
        </View>
    )
}

export default TreatItem
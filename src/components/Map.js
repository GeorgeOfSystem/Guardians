import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import MapView from "react-native-maps";

const height = Dimensions.get('window').height
const Map = () => {
    return (
        <MapView
            style={styles.map}
            loadingEnabled={true}
            region={{
                latitude: 37.78,
                longitude: -122.4324,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121
            }}>
            <MapView.Marker
                coordinate={{
                    latitude: 37.78,
                    longitude: -122.4324
                }} 
                title={"Title 1"}
                description={"description 1"}
                />
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        height
    }
});

export default Map
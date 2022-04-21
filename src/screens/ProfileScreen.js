import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-navigation";
import { Text, StyleSheet, View, TouchableOpacity, FlatList, Image, Dimensions, ActivityIndicator, TextInput } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Ionicons";
import firebase from "../database/firebase";
//Components
import UserProfile from "../components/UserProfile";
import VetProfile from "../components/VetProfile";

const drawer = createDrawerNavigator()
const numColumns = 3;
const WIDTH = Dimensions.get('window').width;
const HEIGTH = Dimensions.get('window').height;

const ProfileScreen = ({ navigation }) => {
    const [user, setUser] = useState(firebase.auth.currentUser);
    const [userType, setUserType] = useState(0);


    useEffect(async () => {
        if (userType === 0) {
            await firebase.db.collection('Guardians').onSnapshot(querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                    if (user.email === doc.id) {
                        setUserType(1);
                        return;
                    }
                })
            });
            if (userType === 0) {
                await firebase.db.collection('Veterinary').onSnapshot(querySnapshot => {
                    querySnapshot.docs.forEach(doc => {
                        if (user.email === doc.id) {
                            setUserType(2);
                            return;
                        }
                    })
                });
            }
        }
    }, []);

    if (userType === 1) {
        return (
            <UserProfile navigation={navigation} />
        );
    } else if (userType === 2) {
        return (
            <VetProfile navigation={navigation} />
        );
    } else {
        return (
            <SafeAreaView>
                <ActivityIndicator style={{ marginTop: '35%' }} size='large' color='#3D8836' />
            </SafeAreaView>
        );
    }
}

ProfileScreen.navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
        <Icon name="settings" color={tintColor} size={30} />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 25,
        width: '80%'
    },
    tinyLogo: {
        width: 100,
        height: 100,
        alignContent: 'center',
        margin: 10,
        borderRadius: 100 / 1
    },
    item: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        flex: 1,
        margin: 1,
        height: WIDTH / numColumns,
        borderRadius: 100 / 4
    },
    itemText: {
        color: '#fff',
        fontSize: 30
    },
    itemInvisible: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        flex: 1,
        margin: 1,
        height: WIDTH / numColumns
    },
    rowContainer: {
        flexDirection: 'row'
    },
    addButtonLocator: {
        position: 'absolute',
        top: HEIGTH - 200,
        right: 30,
    },
    addButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 950,
        borderRadius: 30,
        height: 60,
        width: 60
    },
    addButtonText: {
        color: 'white',
        fontSize: 25
    },
    addButtonLocator: {
        position: 'absolute',
        top: HEIGTH - 200,
        right: 30,
    },
    addButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 950,
        borderRadius: 30,
        height: 60,
        width: 60
    },
    addButtonText: {
        color: 'white',
        fontSize: 25
    },
    input: {
        backgroundColor: '#dedede',
        borderRadius: 10,
        padding: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
    },
    button: {
        alignSelf: 'flex-start',
        borderRadius: 10,
        padding: 10
    },
    acceptButton: {
        backgroundColor: 'green',
    },
    cancelButton: {
        backgroundColor: 'red',
        marginLeft: 5
    }
});

export default ProfileScreen
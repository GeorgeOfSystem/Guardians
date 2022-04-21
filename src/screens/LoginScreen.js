import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { View, KeyboardAvoidingView, Text, TextInput, StyleSheet, TouchableOpacity, Alert, } from "react-native";
import OnBoarding from "../components/OnBoarding";
import DrawerNavigator from "../navigation/DrawerNavigator";
import firebase from '../database/firebase';

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [isLogged, setIsLogged] = useState(false);

    const handleLogin = () => {
        firebase.auth
            .signInWithEmailAndPassword(email, pwd)
            .then(userCredentials => {
                const user = userCredentials.user;
                navigation.navigate('DrawerHome');
            }).catch(error => alert(error.message))
    }

    const handleSingUp = () => {
        firebase.auth
            .createUserWithEmailAndPassword(email, pwd)
            .then(userCredentials => {
                const user = userCredentials.user;
                firebase.db.collection('Guardians').doc(email.toLowerCase()).set({
                    Guardians: [],
                    Treatments: [],
                }).then(
                    navigation.navigate('OnBoarding')
                );
            }).catch(error => alert(error.message))
    }

    useEffect( async () => {
        const unsubscribe = firebase.auth.onAuthStateChanged(user => {
            if (user) {
                navigation.navigate('DrawerHome');
            }
        });
        return unsubscribe
    });

    getFirebaseData = async (collection) => {
        firebase.db.collection(collection).onSnapshot(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                console.log(doc.id);
            })
            /*const inAdoption = []
            querySnapshot.docs.forEach(doc => {
                const { name, place, photoUrl, description,symptom,patient } = doc.data()
                inAdoption.push({
                    id: doc.id,
                    name,
                    place,
                    photoUrl,
                    description,
                    symptom,
                    patient
                })
            })
            setList(inAdoption);
            setIsLoad(true);*/
        });
    }

    return (
        <KeyboardAvoidingView
            style={style.container}
            behavior='padding'
        >
            <View style={style.inputContainer}>
                <TextInput
                    style={style.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    style={style.input}
                    placeholder="Password"
                    value={pwd}
                    onChangeText={text => setPwd(text)}
                    secureTextEntry
                />
            </View>
            <View style={style.buttonContainer}>
                <TouchableOpacity
                    style={style.button}
                    onPress={handleLogin}
                >
                    <Text style={style.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[style.button, style.buttonOutLine]}
                    onPress={handleSingUp}
                >
                    <Text style={style.buttonTextOutline}>Regsiter</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    input: {
        backgroundColor: '#f8f4e3',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5
    },
    inputContainer: {
        width: '80%'
    },
    button: {
        backgroundColor: '#c1d5a8',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    buttonOutLine: {
        backgroundColor: '#f2e8cc',
        marginTop: 5,
        borderColor: '#d6eef6',
        borderWidth: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
    buttonTextOutline: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16
    }
})

export default LoginScreen
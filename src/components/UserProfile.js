import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View, Text, SafeAreaView, Image, ActivityIndicator, TouchableOpacity, TextInput, FlatList } from "react-native";
import firebase from "../database/firebase";

const numColumns = 3;
const WIDTH = Dimensions.get('window').width;
const HEIGTH = Dimensions.get('window').height;

const VetProfile = ({navigation}) => {
    const [guardian, setGuardian] = useState('');
    const [isLoad, setIsLoad] = useState(false);
    const [state, setState] = useState([]);
    const [treatment, setTreatment] = useState([]);
    const [addNew, setAddNew] = useState(false);
    const [user, setUser] = useState(firebase.auth.currentUser);

    useEffect(async () => {
        firebase.db.collection('Guardians').doc(firebase.auth.currentUser?.email).onSnapshot(documentSnapshot => {
            const guardians = [];
            const treatments = [];
            const data = documentSnapshot.data();
            if (typeof (data) !== 'undefined') {
                data.Guardians.forEach(doc => {
                    guardians.push(doc);
                });
                data.Treatments.forEach(doc => {
                    treatments.push(doc);
                });
            }
            setState(guardians);
            setTreatment(treatments);
            setIsLoad(true);
        });
    }, []);

    getTreatments = (guardianName) => {
        const arr = [];
        treatment.forEach(doc => {
            if (doc.guardian === guardianName) {
                arr.push(doc);
            }
        });
        return arr;
    }

    _renderItem = ({ item }) => {
        if (item.empty) {
            return <View style={styles.itemInvisible} />
        }
        return (
            <TouchableOpacity style={{
                backgroundColor: item.backgroundColor,
                alignItems: 'center',
                justifyContent: 'center',
                height: 100,
                flex: 1,
                margin: 1,
                height: WIDTH / numColumns,
                borderRadius: 100 / 4
            }}
                onPress={() => navigation.navigate('GuardiansDetails', { _guardianSelected: item, _treatment: this.getTreatments(item.tittle) })}>
                <View>
                    <Text style={styles.itemText}>{item.tittle}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    formatData = (dataList, numColumns) => {
        const totalRows = Math.floor(dataList.length / numColumns);
        let totalLastRow = dataList.length - (totalRows * numColumns)
        while (totalLastRow !== 0 && totalLastRow !== numColumns) {
            dataList.push({ title: 'blank', empty: true, backgroundColor: 'transparent' })
            totalLastRow++;
        }
        return dataList;
    }

    const saveNewGuardian = async () => {
        // Check is not Empty
        if (guardian === '') {
            alert('Por Favor Añada el nombre del Guardian')
        } else {
            //Add to Firebase
            try {
                await firebase.db.collection('Guardians').doc(firebase.auth.currentUser?.email).update({
                    Guardians: firebase.fieldValue.arrayUnion({
                        tittle: guardian
                    })
                });
                //navigation.navigate('Profile')
            } catch (error) {
                console.log(error)
            }
            // Clean the Input
            setGuardian('');
            //Quit from Input
            setAddNew(false);
        }
    }

    return (
        <SafeAreaView forceInset={{ top: 'always' }} style={styles.container} >
            <View style={styles.rowContainer}>
                <Image style={styles.tinyLogo} source={require('../assets/Img/test.jpg')} />
                <Text style={styles.title}>{user?.email}</Text>
            </View>
            <View>
                <Text style={{ fontSize: 50 }} >Guardians</Text>
                {/* Input Container */}
                {
                    addNew &&
                    <View>
                        <TextInput
                            onChangeText={setGuardian}
                            placeholder="Guardian Name"
                            style={styles.input}
                            value={guardian}
                        />
                        <View style={{ marginVertical: 10, flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={[styles.button, styles.acceptButton]}
                                onPress={saveNewGuardian}
                            >
                                <Text style={styles.buttonText}>Add New Guardian</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.cancelButton]}
                                onPress={() => setAddNew(false)}
                            >
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
                {
                    isLoad && state.length === 0 &&
                    <View>
                        <Image style={styles.tinyLogo} source={require('../assets/Img/test.jpg')} />
                        <Text> Todavia no tiene Ningun Guardian </Text>
                    </View>
                }
                {
                    isLoad && state.length !== 0 &&
                    <FlatList
                        data={this.formatData(state, numColumns)}
                        keyExtractor={(item, pos) => pos}
                        renderItem={this._renderItem}
                        numColumns={numColumns}
                    />
                }
                {
                    !isLoad &&
                    <ActivityIndicator style={{ marginTop: '35%' }} size='large' color='#3D8836' />
                }
            </View>
             {/* Button for Add Guardian */}
             <View style={styles.addButtonLocator}>
                <TouchableOpacity style={styles.addButton}>
                    <Text
                        style={styles.addButtonText}
                        onPress={() => setAddNew(true)}
                    >+</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
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

export default VetProfile
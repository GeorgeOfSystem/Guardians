import React, { useState, useEffect } from "react";
import { Text, StyleSheet, Dimensions, View, FlatList, Alert, TouchableOpacity, TextInput, Image, ActivityIndicator } from "react-native";
import firebase from "../database/firebase";

//var numColumns = 3;
const WIDTH = Dimensions.get('window').width;
const HEIGTH = Dimensions.get('window').height;

const HomeDetailScreen = ({ route, navigation }) => {
    const { _id, _tittle } = route.params;

    const [pageSettings, setPageSettings] = useState({
        db: "",
        isLoad: false,
    });
    const [isLoad, setIsLoad] = useState(false);

    const [adoption, setAdoption] = useState({
        name: "",
        place: "",
        photoUrl: "",
        description: "",
    });
    const handlerChangeAdoptionText = (name, value) => {
        setAdoption({ ...adoption, [name]: value })
    }

    const [list, setList] = useState([]);


    const [state, setState] = useState([]);
    const [treatment, setTreatment] = useState([]);
    const [addNew, setAddNew] = useState(false);
    const [guardian, setGuardian] = useState('');


    useEffect(async () => {
        switch (_id) {
            case '1':
                pageSettings.db = 'Veterinary';
                break;
            case '2':
                pageSettings.db = 'SOS';
                break;
            case '3':
                pageSettings.db = 'Adoption';
                break;
            case '4':
                pageSettings.db = 'IdentifyBreed';
                break;
            case '5':
                pageSettings.db = 'Medication';
                break;
            default:
                console.log(_id)
                break;
        }
        await this.getFirebaseData(pageSettings.db);
    }, []);

    getFirebaseData = async (collection) => {
        firebase.db.collection(collection).onSnapshot(querySnapshot => {
            const inAdoption = []
            querySnapshot.docs.forEach(doc => {
                const { name, place, photoUrl, description, symptom, patient, appointment } = doc.data()
                inAdoption.push({
                    id: doc.id,
                    name,
                    place,
                    photoUrl,
                    description,
                    symptom,
                    patient,
                    appointment
                })
            })
            setList(inAdoption);
            setIsLoad(true);
        });
    }

    _renderItem = ({ item }) => {
        if (item.empty) {
            return <View style={[style.itemInvisible, { height: WIDTH }]} />
        }
        return (
            <TouchableOpacity
                style={style.listItemContainer}
                onPress={() => navigation.navigate('Detail', { _itemSelected: item, _type: pageSettings.db })}
            >
                <View >
                    <Text style={[style.listItemText]} >{item.name}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    _render3Item = ({ item }) => {
        if (item.empty) {
            return <View style={[style.itemInvisible, { height: WIDTH / 3 }]} />
        }
        return (
            <TouchableOpacity style={{
                backgroundColor: 'blue',
                alignItems: 'center',
                justifyContent: 'center',
                height: 100,
                flex: 1,
                margin: 1,
                height: WIDTH / 3,
                borderRadius: 100 / 4
            }}
                onPress={() => navigation.navigate('GuardiansDetails', { _guardianSelected: item, _treatment: this.getTreatments(item.tittle) })}>
                <View>
                    <Image style={{ with: 80, height: 75 }} resizeMode='cover' source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Cat_November_2010-1a.jpg' }} />
                    <Text style={style.itemText}>{item.name}</Text>
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

    const saveNewAdoption = async () => {
        // Check is not Empty
        if (adoption.name === '') {
            alert('Por Favor Añada el nombre del Guardian')
        } else {
            //Add to Firebase
            try {
                await firebase.db.collection('Adoption').add({
                    name: adoption.name,
                    place: adoption.place,
                    photoUrl: adoption.photoUrl,
                    description: adoption.description,
                });
                alert('Guardado')
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
        <View>
            <Text style={{ fontSize: 48, alignSelf: 'center', }}>{_tittle}</Text>
            {/* Input Container */}
            {
                addNew &&
                <View>
                    <TextInput
                        onChangeText={(value) => handlerChangeAdoptionText('name', value)}
                        placeholder="Guardian Name"
                        style={style.input}
                    />
                    <View style={{ marginVertical: 10, flexDirection: 'row' }}>
                        <TouchableOpacity
                            style={[style.button, style.acceptButton]}
                            onPress={saveNewAdoption}
                        >
                            <Text style={style.buttonText}>Add New Guardian</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[style.button, style.cancelButton]}
                            onPress={() => setAddNew(false)}
                        >
                            <Text style={style.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }

            {/* List Container */}
            <View>
                {
                    !isLoad &&
                    <ActivityIndicator style={{ marginTop: '35%' }} size='large' color='#3D8836' />
                }
                {
                    isLoad &&
                    <FlatList
                        //forceInset={{ top: 'always' }}
                        data={this.formatData(list, (_id === '3') ? 3 : 1)}
                        keyExtractor={item => item.id}
                        renderItem={(_id === '3') ? this._render3Item : this._renderItem}
                        numColumns={(_id === '3') ? 3 : 1}
                    />
                }
            </View>

            {/* Button for Add Adopted */}
            {
                _id === '3' &&
                <View style={style.addButtonLocator}>
                    <TouchableOpacity style={style.addButton}>
                        <Text
                            style={style.addButtonText}
                            onPress={() => setAddNew(true)}
                        >+</Text>
                    </TouchableOpacity>
                </View>
            }

        </View>
    )

}

const style = StyleSheet.create({
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
        //height: WIDTH / numColumns,
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
    },
    listItemContainer: {
        backgroundColor: '#C3CBCB',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        borderRadius: 30,
        padding: 5,
        flex: 1,
    },
    listItemButton: {
        alignItems: 'flex-end',
        margin: 10
    },
    listItemText: {
        color: 'white',
        marginLeft: 10,
        fontSize: 20,
        flex: 3,
    }
});

export default HomeDetailScreen
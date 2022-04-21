import React, { useState, useEffect } from "react";
import { Text, StyleSheet, Dimensions, View, TextInput, Button, TouchableOpacity, Image } from "react-native";
import { DateTimePicker } from "@react-native-community/datetimepicker";
import { FlatList } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import firebase from "../database/firebase";


const HEIGTH = Dimensions.get('window').height

const GuardiansDetailsScreen = ({ route, navigation }) => {
    const { _guardianSelected, _treatment } = route.params;

    const [isEditingTreat, setIsEditingTreat] = useState(false);
    const [editedTreat, setEditedTreat] = useState('');
    const [state, setState] = useState({ name: '' });
    const [addDate, setAddDate] = useState(false);
    const [addNew, setAddNew] = useState(false);
    const [treat, setTreat] = useState('');

    const treatments = _treatment

    const handleChangeText = (name, value) => {
        setState({ ...state, name: value })
    }

    const getCurrentDate = () => {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        //format: dd-mm-yyyy;
        return date + '-' + month + '-' + year;
    }

    const addTreatment = async () => {
        const newTreat = {
            date: getCurrentDate(),
            guardian: _guardianSelected.tittle,
            tittle: treat
        };

        if (treat === '') {
            alert('Por Favor Añada el nombre del Guardian')
        } else {
            try {
                //Add to Firebase
                await firebase.db.collection('Guardians').doc('nicolangles2000@gmail.com').update({
                    Treatments: firebase.fieldValue.arrayUnion(newTreat)
                });
                //Add treat to array
                if (isEditingTreat) {
                    setIsEditingTreat(false);
                    setEditedTreat('');
                    await deleteTreatment(editedTreat);
                }
                treatments.push(newTreat);
                //Clean the treat array
                setTreat('');
                //quit from input
                setAddNew(false);
            } catch (error) {
                console.log(error)
            }
        }

    }

    const deleteTreatment = async (treatToDelete) => {
        try {
            //Add to Firebase
            await firebase.db.collection('Guardians').doc('nicolangles2000@gmail.com').update({
                Treatments: firebase.fieldValue.arrayRemove(treatToDelete)
            });
            //Delete treat to array
            const indexOf = treatments.indexOf(treatToDelete);
            treatments.splice(indexOf, 1);
            navigation.navigate('GuardiansDetails', { _guardianSelected: _guardianSelected, _treatment: treatments })
        } catch (error) {
            console.log(error)
        }
    }

    const editTreatment = (treatment) => {
        setIsEditingTreat(true);
        setEditedTreat(treatment);
        setTreat(treatment.tittle);
        setAddNew(true);
    }

    _renderItem = ({ item }) => {
        return (
            <View style={style.listItemContainer}>
                <Text style={[style.listItemText]} >{item.tittle}</Text>
                <TouchableOpacity
                    style={style.listItemButton}
                    onPress={() => editTreatment(item)}
                >
                    <Icon name="create-outline" size={30} color='#90AB6E' />
                </TouchableOpacity>
                <TouchableOpacity
                    style={style.listItemButton}
                    onPress={() => deleteTreatment(item)}
                >
                    <Icon name="trash-outline" size={30} color='#d84652' />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View>
            {/* Date Model */}
            {
                addDate &&
                <DateTimePicker
                    testID='dateTimePicker'
                    mode={'date'}
                    is24Hour={true}
                    display='default'

                />
            }

            {/* Input Container */}
            {
                addNew &&
                <View>
                    <TextInput
                        onChangeText={setTreat}
                        placeholder="Producto"
                        style={style.input}
                        value={treat}
                    />
                    <Button title="Fecha de Aplicacion" />
                    <Button title="Proxima Aplicacion" />
                    <View style={{ marginVertical: 10, flexDirection: 'row' }}>
                        <TouchableOpacity
                            style={[style.button, style.acceptButton]}
                            onPress={addTreatment}
                        >
                            <Text style={style.buttonText}>Confirm</Text>
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

            <Image style={[style.tinyLogo,{alignSelf:'center'}]} source={require('../assets/Img/bailey.jpeg')} />
            <Text style={{ fontSize: 48, alignSelf:'center' }}>{_guardianSelected.tittle}</Text>
            <Text style={{ fontSize: 20 }}>Treatments: </Text>
            <View>
                <FlatList
                    data={treatments}
                    keyExtractor={(item) => item}
                    renderItem={this._renderItem}
                />
            </View>


            {/* Button for Add treatment */}
            <View style={style.addButtonLocator}>
                <TouchableOpacity style={style.addButton} >
                    <Icon
                        name="bandage-outline"
                        style={style.addButtonText}
                        onPress={() => setAddNew(true)} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
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
        backgroundColor: '#c1d5a8',
    },
    cancelButton: {
        backgroundColor: '#f4bcc5',
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
    }, tinyLogo: {
        width: 100,
        height: 100,
        alignContent: 'center',
        margin: 10,
        borderRadius: 100 / 1
    },
})

export default GuardiansDetailsScreen

import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Agenda } from 'react-native-calendars';
import { Card, Avatar } from 'react-native-paper';
import firebase from "../database/firebase";
//import Typography from '../components/Typography';

const height = Dimensions.get('window').height

const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
};

const VetProfile = () => {
    let td = new Date();
    let today =td.getFullYear() + '-' + (td.getMonth() + 1) + '-' + td.getDate();
    console.log(today);
    const [items, setItems] = useState({});
    const [appointment, setAppointment] = useState([]);

    useEffect(async () => {
        firebase.db.collection('Veterinary').doc(firebase.auth.currentUser?.email).onSnapshot(documentSnapshot => {
            /*const elements = [];
            const data = documentSnapshot.data();
            if (typeof (data) !== 'undefined') {
                data.appointment.forEach(doc => {
                    elements.push(doc);
                });
            }
            setAppointment(elements);
            console.log('appoint', appointment);*/
        });
    }, []);

    const loadItems = (day) => {
        console.log('day', day);

        setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = timeToString(time);
                if (!items[strTime]) {
                    items[strTime] = [];
                    const numItems = Math.floor(Math.random() * 3 + 1);
                    for (let j = 0; j < numItems; j++) {
                        items[strTime].push({
                            name: 'Item for ' + strTime + ' #' + j,
                            height: Math.max(50, Math.floor(Math.random() * 150)),
                        });
                    }
                }
            }
            const newItems = {};
            Object.keys(items).forEach((key) => {
                newItems[key] = items[key];
            });
            setItems(newItems);
        }, 1000);
    };

    const renderItem = (item) => {
        return (
            <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
                <Card>
                    <Card.Content>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                            <Text>{item.user}</Text>
                            <Text>{item.date}</Text>
                            <Avatar.Text label="J" />
                        </View>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <Agenda
                items={items}
                loadItemsForMonth={loadItems}
                selected={'2022-04-16'}
                renderItem={renderItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    map: {
        height
    }
});

export default VetProfile
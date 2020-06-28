import moment from 'moment';
import { API_URL } from 'react-native-dotenv'
import React, { useState, useEffect } from 'react';
import { AxiosHttpRequest } from '../../utils/axios';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { AsyncStorage, StyleSheet, SafeAreaView, Button, TextInput, Image, TouchableOpacity, View, Text, ScrollView, ImageBackground} from 'react-native';

// components
import EventCard from '../../cards/EventCard';

const Details = ({date, setShowModal}: any) => {
    const [ events, setEvents ] = useState([]);
    useEffect(() => {
        const getEvents = async() => {
            const data = (await AxiosHttpRequest('GET', `${API_URL}/event/my_events`))?.data.filter((event: any) => moment(event.startTime).format('YYYY-MM-DD') === date);
            setEvents(data);
        };
        getEvents();
    }, []);
    return (
        <SafeAreaView>
            <TouchableOpacity style={ styles.button } onPress={ () => setShowModal(false) }>
                <Text style={ styles.done } >Done</Text>
            </TouchableOpacity>
            <View style={ styles.container }>
                <Text style={ styles.date} >{date}</Text>
            </View>
            <ScrollView contentContainerStyle={ styles.events} >
                {
                    events.map((event: object, index: number) => <EventCard key={ index } event={ event } /> )
                }
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    done: {
        fontSize: 20,
        color: 'teal',
        fontWeight: '500',
    },
    button: {
        alignItems: 'flex-end',
        marginRight: 10,
    },
    container: {
        alignItems: 'center',
        backgroundColor: 'lightseagreen',
    }, 
    date: {
        fontSize: 30,
        color: 'white',
    },
    events: {
        alignItems: 'center',
    },
});

export default Details;
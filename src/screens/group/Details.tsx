import moment from 'moment';
import { API_URL } from '../../secrets'
import React, { useState, useEffect } from 'react';
import { AxiosHttpRequest } from '../../utils/axios';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { AsyncStorage, StyleSheet, SafeAreaView, Button, TextInput, Image, TouchableOpacity, View, Text, ScrollView, ImageBackground, Dimensions } from 'react-native';

// components
import EventCard from '../../cards/EventCard';

const Details = ({ date, setShowModal, group, user }: any) => {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        const route = group ? `group_events/${group.id}` : `my_events`
        const getEvents = async () => {
            const data = (await AxiosHttpRequest('GET', `${API_URL}/event/${route}`))?.data.filter((event: any) => moment(event.startTime).format('YYYY-MM-DD') === date);
            setEvents(data);
        };
        getEvents();
    }, []);
    return (
        <SafeAreaView style={{ backgroundColor: 'black', height: Dimensions.get('window').height / 1 }}>
            <View style={{ backgroundColor: 'white', height: Dimensions.get('window').height / 1 }}>
                <TouchableOpacity style={styles.container} onPress={() => setShowModal(false)}>
                    <Text style={styles.date} >{group ? `${group.name.split('#')[0]}'s` : 'Your'} {date}</Text>
                </TouchableOpacity>
                <ScrollView contentContainerStyle={styles.events}>
                    {
                        events.map((event: object, index: number) => <EventCard key={index} event={event} />)
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'flex-end',
        marginRight: 10,
    },
    container: {
        alignItems: 'center',
        backgroundColor: 'lightseagreen',
    },
    date: {
        fontSize: 26,
        color: 'white',
    },
    events: {
        alignItems: 'center',
        // height: Dimensions.get('window').height / 1,
        paddingTop: 30,
        backgroundColor: 'white'
    },
});

export default Details;
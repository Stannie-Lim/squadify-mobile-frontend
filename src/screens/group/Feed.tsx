import moment from 'moment';
import * as Location from 'expo-location';
import { API_URL } from '../../secrets';
import * as Permissions from 'expo-permissions';
import React, { useState, useEffect } from 'react';
import { AxiosHttpRequest } from '../../utils/axios';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button, AsyncStorage, ScrollView, RefreshControl, Modal, Dimensions } from 'react-native';

// components
import EventCard from '../../cards/EventCard'
import RadiusMap from './RadiusMap';

const Feed = ({ route, navigation }: any) => {
    const [events, setEvents] = useState([]);
    const [radius, setFeedRadius] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        findEvents();
    }, []);

    const refresh = async () => {
        setRefreshing(true);
        findEvents();
        setRefreshing(false);
    };

    const findEvents = async () => {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            alert('too bad');
        } else {
            try {
                const location = await Location.getCurrentPositionAsync();
                const foundEvents = (await AxiosHttpRequest('GET', `${API_URL}/event/searcharea/${radius * 1.62}/${location.coords.latitude}/${location.coords.longitude}`))?.data
                    .filter((event: any) => {
                        const now = moment(new Date()).format('YYYY-MM-DD')
                        console.log('now', now)
                        const startTime = moment(event.startTime).format('YYYY-MM-DD')
                        console.log('startTime', startTime)
                        const isBefore = moment(startTime).isBefore(now)
                        console.log('isBefore', isBefore)
                        const inAMonth = moment(new Date()).add(1, 'months').format('YYYY-MM-DD')
                        console.log('IN A MONTH', inAMonth)
                        const isAfterDays = moment(startTime).isBefore(inAMonth)
                        console.log('isAfterDays', isAfterDays)
                        return !isBefore && isAfterDays
                    });
                console.log('FOUND EVENTS', foundEvents)
                setEvents(foundEvents);
            } catch (err) {
                console.log(err);
            }
        }
    };

    const changeRadius = async () => setModalVisible(true);

    return (

        <ScrollView
            style={{ flex: 1 }}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={refresh} />
            }
            contentContainerStyle={styles.center}
        >
            <Text>Radius: {radius} miles</Text>
            <Button onPress={changeRadius} title="Change radius" />
            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <RadiusMap setFeedRadius={setFeedRadius} setModalVisible={setModalVisible} />
            </Modal>
            {
                events.length !== 0 ?
                    events.map((event, index) => <EventCard key={index} event={event} navigation={navigation} />) :
                    <Text>No events in your area! Try searching for events</Text>
            }
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    inputField: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
    },
    center: {
        alignItems: 'center',
        paddingTop: Dimensions.get('screen').height / 70
    },
});

export default Feed;
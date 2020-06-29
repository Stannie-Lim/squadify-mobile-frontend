import moment from 'moment';
import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding';
import { API_URL } from 'react-native-dotenv';
import * as Permissions from 'expo-permissions';
import React, { useState, useEffect } from 'react';
import { AxiosHttpRequest } from '../../utils/axios';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button, AsyncStorage, ScrollView, RefreshControl, Modal } from 'react-native';

// components
import EventCard from '../../cards/EventCard'
import RadiusMap from './RadiusMap';

const Feed = ({ route, navigation }: any) => {
    const [mapRegion, setMapRegion] = useState({
        latitude: 0,
        longitude: 0
    });

    const [events, setEvents] = useState([]);
    const [radius, setFeedRadius] = useState(1);
    const [latitude, setLatitude] = useState(0.0);
    const [longitude, setLongitude] = useState(0.0);
    const [refreshing, setRefreshing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    console.log(latitude)
    console.log(longitude)

    useEffect(() => {
        getCurrentLocation();
        findEvents();
    }, [latitude, longitude]);

    const refresh = async () => {
        setRefreshing(true);
        findEvents();
        setRefreshing(false);
    };

    const findEvents = async () => {
        const foundEvents = (await AxiosHttpRequest('GET', `${API_URL}/event/searcharea/${radius}/${latitude}/${longitude}`))?.data.filter((event: any) => moment(event.startTime).format('YYYY-MM-DD') === moment(new Date()).format('YYYY-MM-DD'));
        console.log(foundEvents)
        setEvents(foundEvents);
    };

    const changeRadius = async () => {
        setModalVisible(true);
    };

    const getCurrentLocation = async () => {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            alert('too bad');
        } else {
            try {
                const location = await Location.getCurrentPositionAsync();
                setLatitude(location.coords.latitude);
                setLongitude(location.coords.longitude);
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        
        <ScrollView
            style={{flex: 1}}
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
                events.length !== 0 && events.map((event, index) => <EventCard key={index} event={event} navigation={navigation} />)
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
        paddingTop: 100
    },
});

export default Feed;
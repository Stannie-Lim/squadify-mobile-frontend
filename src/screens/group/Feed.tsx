import axios from 'axios';
import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding';
import { API_URL } from 'react-native-dotenv';
import * as Permissions from 'expo-permissions';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button, AsyncStorage } from 'react-native';

const Feed = () => {
    const [ mapRegion, setMapRegion ] = useState({
        latitude: 0,
        longitude: 0
    });
    
    const [ events, setEvents ] = useState([]);

    useEffect(() => {
        const getCurrentLocation = async() => {
            const { status } = await Permissions.askAsync(Permissions.LOCATION);
            if(status !== 'granted') {
                alert('too bad');
            } else {
                try {
                    const location = await Location.getCurrentPositionAsync();
                    const token = await AsyncStorage.getItem('token');
                    const { latitude, longitude } = location.coords;
                    const findEvents = (await axios.get(`${API_URL}/event/searcharea/1000/${latitude}/${longitude}`, { headers: { Authorization: token }} )).data;
                    setEvents(findEvents);
                } catch(err) {
                    console.log(err);
                }
            }   
        };
        getCurrentLocation();
    }, []);
    return (
        <SafeAreaView>
            <Text>Feed</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    inputField: {
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
    },
});

export default Feed;
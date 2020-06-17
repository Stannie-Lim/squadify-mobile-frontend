import axios from 'axios';
import { API_URL } from 'react-native-dotenv';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, AsyncStorage } from 'react-native';

// components
import EventCard from '../../cards/EventCard';

const Today = ({ route, group, navigation }: any) => {
    const today = new Date();
    const [ events, setEvents ] = useState([]);
    useEffect(() => {
        const getTodaysEvents = async() => {
            const token = await AsyncStorage.getItem('token');
            const data = (await axios.get(`${API_URL}/event/${group.id}`, { headers: { Authorization: token }})).data;
            setEvents(data);
        };  
        getTodaysEvents();
    }, [events.length]);
    return (
        <View>
            <View style={ styles.top }>
                <Text style={{ fontSize: 30 }}>Today's Events</Text>
                <Text style={{ fontSize: 20 }}>{today.toDateString()}</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                <ScrollView style={{ height: Dimensions.get('window').height / 3.5, }}>
                    {
                        events.map((event, index) => <EventCard key={ index } event={ event } navigation={ navigation } /> )
                    }
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    top: {
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'grey',
    }
});

export default Today;
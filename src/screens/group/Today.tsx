import axios from 'axios';
import { API_URL } from 'react-native-dotenv';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, AsyncStorage } from 'react-native';

// components
import EventCard from '../../cards/EventCard';

const Today = ({ route, group, navigation }: any) => {
    const today = new Date();
    const [ events, setEvents ] = useState([]);

    const getTodaysEvents = async() => {
        const token = await AsyncStorage.getItem('token');
        try { 
            const data = (await axios.get(`${API_URL}/event/${group.id}`, { headers: { Authorization: token }})).data;
            setEvents(data);
        } catch(err) {
            console.log(err);
        }
    };  

    // console.log(route);
    // console.log('hello');

    useEffect(() => {
        console.log('hello');
        getTodaysEvents();
        return () => setEvents([]);
    }, [group.id]);
    return (
        <View>
            <View style={ styles.top }>
                <Text style={{ fontSize: 30 }}>Today's Events</Text>
                <Text style={{ fontSize: 20 }}>{today.toDateString()}</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                {
                    events.length === 0 ? <Text>You don't have any events for the day!</Text> :
                    <ScrollView style={{ height: Dimensions.get('window').height / 3.5, }}>
                        {
                            events.map((event, index) => <EventCard key={ index } event={ event } navigation={ navigation } /> )
                        }
                    </ScrollView>
                }
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
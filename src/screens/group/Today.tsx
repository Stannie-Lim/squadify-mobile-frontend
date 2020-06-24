import { API_URL } from 'react-native-dotenv';
import React, {useState, useEffect} from 'react';
import { AxiosHttpRequest } from '../../utils/axios';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, AsyncStorage, RefreshControl } from 'react-native';

// components
import EventCard from '../../cards/EventCard';

const Today = ({ route, group, navigation }: any) => {
    const today = new Date();
    const [ events, setEvents ] = useState([]);
    const [ refreshing, setRefreshing ] = useState(false);

    const getTodaysEvents = async() => {
        const token = await AsyncStorage.getItem('token');
        try { 
            const data = (await AxiosHttpRequest('GET', `${API_URL}/event/group_events/${group.id}`))?.data;
            setEvents(data);
        } catch(err) {
            console.log(err);
        }
    };  

    const refresh = async () => {
        setRefreshing(true);
        getTodaysEvents();
        setRefreshing(false);
    };

    useEffect(() => {
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
                    <ScrollView 
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={refresh} 
                            />
                        }
                        style={{ height: Dimensions.get('window').height / 3.5, }}
                    >
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
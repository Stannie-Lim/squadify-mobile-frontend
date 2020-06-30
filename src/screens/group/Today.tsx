import moment from 'moment';
import { API_URL } from '../../secrets';
import React, { useState, useEffect } from 'react';
import { AxiosHttpRequest } from '../../utils/axios';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, AsyncStorage, RefreshControl, TouchableOpacity } from 'react-native';

// components
import EventCard from '../../cards/EventCard';
import { TouchableHighlight } from 'react-native-gesture-handler';

const Today = ({ route, group, navigation, setShowTodayModal, showTodayModal }: any) => {
    const today = new Date();
    const [events, setEvents] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const getTodaysEvents = async () => {
        try {
            const data = (await AxiosHttpRequest('GET', `${API_URL}/event/group_events/${group.id}`))?.data.filter((event: any) => moment(event.startTime).format('YYYY-MM-DD') === moment(new Date()).format('YYYY-MM-DD'));
            setEvents(data);
        } catch (err) {
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
    }, [group.id]);

    return (
        <View style={{ backgroundColor: 'black' }}>
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 2,
                paddingBottom: 2,
                backgroundColor: 'lightseagreen',
                marginTop: showTodayModal ? Dimensions.get('window').height / 19 : 0,
            }}>
                <TouchableOpacity onPress={() => showTodayModal ? setShowTodayModal(false) : setShowTodayModal(true)}>
                    <Text style={{ fontSize: 25, color: 'white', textAlign: 'center' }}>{`${group.name.split('#')[0]}`}'s Events for today</Text>
                    <Text style={{ fontSize: 15, color: 'white', textAlign: 'center' }}>{today.toDateString()}</Text>
                </TouchableOpacity>
            </View>
            <View style={{ paddingTop: 20, alignItems: 'center', backgroundColor: 'white', height: Dimensions.get('window').height / 1 }}>
                {
                    events.length === 0 ?
                        <ScrollView
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={refresh}
                                />
                            }
                            style={{ height: Dimensions.get('window').height / 2.6, }}
                        >
                            <Text>You don't have any events for the day!</Text>

                        </ScrollView> :
                        <ScrollView
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={refresh}
                                />
                            }
                            style={{ height: showTodayModal ? Dimensions.get('window').height / 1.1 : Dimensions.get('window').height / 2.6, }}
                        >
                            {
                                events.map((event, index) => <EventCard key={index} event={event} navigation={navigation} />)
                            }
                        </ScrollView>
                }
            </View>
        </View >
    );
};

const styles = StyleSheet.create({

});

export default Today;
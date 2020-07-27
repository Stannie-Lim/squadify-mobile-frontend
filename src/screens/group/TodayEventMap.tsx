import moment from 'moment';
import * as Location from 'expo-location';
import { API_URL } from '../../../secrets';
import * as Permissions from 'expo-permissions';
import React, { useState, useEffect } from 'react';
import MapView, { AnimatedRegion, Marker } from 'react-native-maps';
import { StyleSheet, Text, SafeAreaView, View, Dimensions, Button } from 'react-native';
import { AxiosHttpRequest } from '../../utils/axios';

const TodayEventMap = ({ group, setModalVisible, date }: any) => {
    const [mapRegion, setMapRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
    });

    const [events, setEvents] = useState([] as any);
    const [eventGeolocation, setEventGeolocation]: any = useState([]);

    useEffect(() => {
        getCurrentLocation();
        getTodaysEvents();
    }, [mapRegion.latitude, mapRegion.longitude]);

    const getCurrentLocation = async () => {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            alert('too bad');
        } else {
            const location = await Location.getCurrentPositionAsync();
            setMapRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05
            });
        }
    };

    const getTodaysEvents = async () => {
        try {
            const todayevents = (await AxiosHttpRequest('GET', `${API_URL}/event/group_events/${group.id}`))?.data.filter((todayevent: any) => todayevent.startTime.startsWith(date));
            setEvents(todayevents);

            const geolocations = [];
            for (let i = 0; i < todayevents.length; i++) {
                geolocations.push((await AxiosHttpRequest('GET', `${API_URL}/geolocation/event/${todayevents[i].id}`))?.data);
            }
            setEventGeolocation(geolocations);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <SafeAreaView>
            <MapView
                style={styles.mapStyle}
                zoomEnabled={true}
                region={mapRegion}
                showsUserLocation={true}
            >
                <View style={styles.done}>
                    <Text>{date}</Text>
                    <Button onPress={() => setModalVisible(false)} title="Done" />
                </View>
                {
                    eventGeolocation.map((geo: any, index: number) =>
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: geo.latitude * 1,
                                longitude: geo.longitude * 1
                            }}
                            title={events[index].name ? `${events[index].name} starts at ${moment(events[index].startTime).format('LT')}` : ''}
                            description={geo.localized_address}
                        />
                    )
                }
            </MapView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    center: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    text: {
        fontSize: 30,
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    done: {
        flexDirection: 'column',
        backgroundColor: 'white',
    },
});

export default TodayEventMap;
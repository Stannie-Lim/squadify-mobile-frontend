import moment from 'moment';
import React, { useState, useEffect } from 'react';
import MapView, { AnimatedRegion } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, Button } from 'react-native';

const PlannerMap = ({ route, navigation }: any) => {
    const [ address, setAddress ] = useState('');
    const [ event, setEvent ] = useState({});
    const [ mapRegion, setMapRegion ] = useState({
        latitude: 40.705127,
        longitude: -74.009150,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    });

    const { date } = route.params;
    useEffect(() => {
        if(route.params.mapRegion) {
            // console.log(route.params.mapRegion);
            setMapRegion(route.params.mapRegion);
            setAddress(route.params.address);
            setEvent(route.params.event);
        }
    }, [address]);

    return (
        <SafeAreaView>
            <View style={ styles.center }>
                <Button title='Back' onPress={ () => navigation.navigate('PlannerCalendar') } />
                <Text style={ styles.text }>Your map for { date }</Text>
            </View>
            <MapView 
                style={styles.mapStyle}
                zoomEnabled={true}
                region={mapRegion}
                showsUserLocation={true}
            >
                <MapView.Marker
                    coordinate={mapRegion}
                    title={ event.name ? `${event.name} starts at ${moment(event.startTime).format('LT')}` : '' }
                    description={address}
                />                
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
});

export default PlannerMap;
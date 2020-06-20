import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding';
import { API_KEY } from 'react-native-dotenv';
import * as Permissions from 'expo-permissions';
import React, {useState, useEffect} from 'react';
import MapView, { AnimatedRegion } from 'react-native-maps';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Dimensions, Button } from 'react-native';

const SetLocation = ({ navigation }: any) => {
    const [ mapRegion, setMapRegion ] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    });
    const [ pinnedLocation, setPinnedLocation ] = useState({ 
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    });
    const [ address, setAddress ] = useState('');
    
    useEffect(() => {
        const getCurrentLocation = async() => {
            const { status } = await Permissions.askAsync(Permissions.LOCATION);
            if(status !== 'granted') {
                alert('too bad');
            } else {
                const location = await Location.getCurrentPositionAsync();
                setMapRegion({ 
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude, 
                    latitudeDelta: 0.01, 
                    longitudeDelta: 0.01 
                });
            }   
        };
        getCurrentLocation();
    }, []);

    const pin = async ({ nativeEvent }: any) => {
        const latitude = nativeEvent.coordinate.latitude;
        const longitude = nativeEvent.coordinate.longitude;
        setPinnedLocation({
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
        });
        Geocoder.init(API_KEY);
        const foundAddress = (await Geocoder.from(latitude, longitude)).results[0].formatted_address;
        setAddress(foundAddress);
    };

    return (
        <SafeAreaView>
            <MapView 
                style={styles.mapStyle}
                zoomEnabled={true}
                region={mapRegion}
                showsUserLocation={true}
                onPress={pin}
            >
                <MapView.Marker
                    coordinate={pinnedLocation}
                    title="Event Location"
                    description={address ? address : 'Loading...'}
                />
            </MapView>
            <Button title='Submit' style={ styles.button } onPress={ () => {
                navigation.navigate('Add Event', { address, pinnedLocation });
            }} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    inputField: {
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 1.25,
    },
    button: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
    },
    submit: {
        backgroundColor: "white",
        position: 'absolute',
        borderColor: 'lightseagreen',
        borderWidth: 2,
        width: Dimensions.get('window').width / 1.5,
        textAlign: 'center',
        fontSize: 30,
        padding: 10,
        borderRadius: 10,
    }
});

export default SetLocation;
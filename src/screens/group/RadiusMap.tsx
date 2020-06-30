import * as Location from 'expo-location';
import { Slider } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import React, {useState, useEffect} from 'react';
import { AxiosHttpRequest } from '../../utils/axios';
import MapView, { AnimatedRegion } from 'react-native-maps';
import { TouchableOpacity, StyleSheet, Text, View, SafeAreaView, TextInput, Button, Dimensions } from 'react-native';

const RadiusMap = ({ setFeedRadius, setModalVisible }: any) => {
    const [ mapRegion, setMapRegion ] = useState({
        latitude: 0.0,
        longitude: 0.0,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    });
    const [ sliderValue, setSliderValue ] = useState(0);
    const [ radius, setRadius ] = useState(0);

    useEffect(() => {
        getCurrentLocation();
    }, [mapRegion.latitude, mapRegion.longitude]);
    
    const getCurrentLocation = async() => {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if(status !== 'granted') {
            alert('too bad');
        } else {
            try {
                const location = await Location.getCurrentPositionAsync();
                setMapRegion({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.07, 
                    longitudeDelta: 0.07,
                });
            } catch(err) {
                console.log(err);
            }
        }   
    };

    const changeRadius = () => {
        setFeedRadius(Math.round(sliderValue));
        setModalVisible(false);
    };

    return (
        <SafeAreaView>
            <View style={ styles.sliderparent }>
                    <View style={ styles.slidercontainer }>
                        <Text>{ sliderValue.toFixed(2) } miles</Text>
                    </View>
                    <View style={ styles.slidercontainer }>
                        <Text>0 miles</Text>
                        <Slider 
                            style={ styles.slider } 
                            value={ sliderValue }
                            minimumValue={ 0 }
                            maximumValue={ 25 }
                            onValueChange={ value => {
                                const miles = 1609.34 * value;
                                setRadius(miles);
                                setSliderValue(value); 
                            }}
                        />
                        <Text>25 miles</Text>
                    </View>
                </View>
            <MapView
                style={styles.mapStyle}
                zoomEnabled={true}
                region={mapRegion}
                showsUserLocation={true}
            >
                <MapView.Circle
                    center={ {latitude: mapRegion.latitude, longitude: mapRegion.longitude} }
                    radius={ radius }
                    strokeWidth={3}
                    strokeColor='#3399ff'
                />

            </MapView>

            <View style={ styles.buttoncontainer }>
                <TouchableOpacity onPress={ changeRadius }>
                    <Text style={ styles.submit }>Submit</Text>
                </TouchableOpacity>
            </View>
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
    slidercontainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    slider: {
        width: Dimensions.get('window').width / 1.5
    },
    sliderparent: {
        flexDirection: 'column',
        backgroundColor: 'white',
        alignItems: 'center',
    },
    submit: {
        fontSize: 20,
        padding: 30,
        width: Dimensions.get('window').width,
        textAlign: 'center',
        backgroundColor: 'lightseagreen',
        color: 'white',
    },
    buttoncontainer: {
        alignItems: 'center',
    },
});

export default RadiusMap;
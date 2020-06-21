import moment from 'moment';
import { API_URL } from 'react-native-dotenv';
import React, {useState, useEffect} from 'react';
import { AxiosHttpRequest } from '../utils/axios';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, AsyncStorage } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const EventCard = ({ event, navigation }: any) => {
    const [ mapRegion, setGeolocation ] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    });
    const [ address, setAddress ] = useState('');

    useEffect(() => {
        const getGeolocation = async() => {
            const token = await AsyncStorage.getItem('token');
            try { 
                const region = (await AxiosHttpRequest('GET', `${API_URL}/event/${event.id}/geolocation`))?.data;
                setGeolocation({ 
                    latitude: region.latitude * 1,
                    longitude: region.longitude * 1,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                });
                setAddress(region.localized_address);
            } catch(err) {
                console.log(err);
            }
        };
        getGeolocation();
    }, [address]);

    return (
        <TouchableOpacity onPress={ () => navigation.navigate('PlannerMap', { date: moment(event.startTime).format('YYYY-mm-DD'), mapRegion, address, event })  }>
            <View style={ event.isPrivate ? styles.privateEvent : styles.publicEvent }>
                <Text style={{ fontSize: 30 }}>{ event.name }</Text>
                <Text>{ event.description }</Text>
                <Text>{ new Date(event.startTime).toDateString() }</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    privateEvent: {
        alignItems: 'center',
        marginTop: 10,
        borderColor: 'tomato',
        borderWidth: 3,
        width: Dimensions.get('window').width - 30,
        height: Dimensions.get('window').height / 3.7,
        borderRadius: 20,
        marginBottom: 50
    },
    publicEvent: {
        alignItems: 'center',
        marginTop: 10,
        borderColor: 'lightseagreen',
        borderWidth: 3,
        width: Dimensions.get('window').width - 30,
        height: Dimensions.get('window').height / 3.7,
        borderRadius: 20,
        marginBottom: 50
    }
});

export default EventCard;
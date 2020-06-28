import moment from 'moment';
import { API_URL } from 'react-native-dotenv';
import React, {useState, useEffect} from 'react';
import { AxiosHttpRequest } from '../utils/axios';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, AsyncStorage, Modal } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

//components 
import SingleEventMap from '../screens/group/SingleEventMap';

const EventCard = ({ event, navigation }: any) => {
    const [ mapRegion, setGeolocation ] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    });
    const [ address, setAddress ] = useState('');
    const [ modalVisible, setModalVisible ] = useState(false);

    useEffect(() => {
        const getGeolocation = async() => {
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
        <TouchableOpacity style={ styles.card } onPress={ () => setModalVisible(true) }>
            <View style={ event.isPrivate ? styles.privateEvent : styles.publicEvent }>
                <View style={ styles.information }>
                    <Text>{address}</Text>
                    <Text style={{ fontSize: 30 }}>{ event.name }</Text>
                    <Text>{ event.description }</Text>
                    <Text>{ moment(event.startTime).format('MMMM Do YYYY, hh:m A') }</Text>
                </View>
            </View>
                <Modal
                    animationType="slide"
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(false);
                    }}
                >  
                    <SingleEventMap event={ event } address={ address } mapRegion={ mapRegion } setModalVisible={ setModalVisible } />
                </Modal>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    privateEvent: {
        alignItems: 'center',
        borderColor: 'tomato',
        borderLeftWidth: 10,
        width: Dimensions.get('window').width - 30,
        height: Dimensions.get('window').height / 3.7,
        borderRadius: 5,
        marginBottom: 30,
        backgroundColor: '#ffd0c7'
    },
    publicEvent: {
        alignItems: 'center',
        borderColor: 'lightseagreen',
        borderLeftWidth: 10,
        width: Dimensions.get('window').width - 30,
        height: Dimensions.get('window').height / 3.7,
        borderRadius: 5,
        marginBottom: 30,
        backgroundColor: '#bce7e5'
    },
    information: {
        paddingTop: 20,
        width: Dimensions.get('window').width - 80,
    },
    card: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,
        elevation: 18,
    }
});

export default EventCard;
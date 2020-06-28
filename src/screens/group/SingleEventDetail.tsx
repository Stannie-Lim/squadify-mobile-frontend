import moment from 'moment';
import { API_URL } from 'react-native-dotenv';
import React, { useState, useEffect } from 'react';
import { AxiosHttpRequest, getUser } from '../../utils/axios';
import { Dimensions, View, StyleSheet, Text, SafeAreaView, Modal, TouchableOpacity, Image } from 'react-native';

// components 
import SingleEventMap from './SingleEventMap';

const SingleEventDetail = ({ event, mapRegion, address, setModalVisible }: any) => {
    const [ users, setUsers ] = useState([]);
    const [ mapModal, setMapModal ] = useState(false);
    const [ me, setUser ]: any = useState({});

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async() => {
        await getUser(setUser);
        const data = (await AxiosHttpRequest('GET', `${API_URL}/event/${event.id}/users`))?.data;
        setUsers(data);
    };

    const attend = async() => {
        let attending = Boolean(users.find((user: any) => user.user.id === me.id));
        if(attending) {
            alert("You are already attending");

        } else {
            await AxiosHttpRequest('POST', `${API_URL}/event/assign_self`, { eventId: event.id });
            setModalVisible(false);
        }
    };  

    return (
        <SafeAreaView>
            <TouchableOpacity style={ styles.button } onPress={() => setModalVisible(false)}>
                <Text style={ styles.done } >Done</Text>
            </TouchableOpacity>

            <View style={ styles.details }>
                <Text style={ styles.title }>{event.name}</Text>
                <Text>Starts at { moment(event.startTime).format('MMMM Do YYYY, hh:m A') }</Text>

                <TouchableOpacity onPress={() => setMapModal(true)}>
                    <Text style={ styles.location }>See Location</Text>
                </TouchableOpacity>

                <Text style={ styles.description }>{event.description}</Text>

                <Text>Attendees</Text>
                <View style={ styles.listOfUsers }>
                {
                    users.map((user: object, index: number) => 
                        <View style={ styles.user } key={ index }>
                            <Image source={{ uri: user.user.avatarUrl }} style={styles.avatar} /> 
                            <Text>{`${user.user.firstName.substring(0, user.user.firstName.indexOf('#'))} ${user.user.lastName.substring(0, user.user.firstName.indexOf('#'))}`}</Text>
                        </View>
                    )
                }
                </View>

                <TouchableOpacity onPress={attend}>
                    <Text style={ styles.attendtext }>I'm going!</Text>
                </TouchableOpacity>

            </View>

            <Modal
                animationType="slide"
                visible={mapModal}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <SingleEventMap event={event} address={address} mapRegion={mapRegion} setModalVisible={setMapModal} />
            </Modal>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    done: {
        fontSize: 20,
        color: 'teal',
        fontWeight: '500',
    },
    button: {
        alignItems: 'flex-end',
        marginRight: 10,
    },
    avatar: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },
    listOfUsers: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    user: {
        alignItems: 'center',
    },
    details: {
        alignItems: 'center',
    },
    title: {
        fontSize: 50,
    },
    description: {
        fontSize: 20,
        flexWrap: 'wrap',
    },
    location: {
        fontSize: 30,
        color: 'teal',
    },
    attendtext: {
        color: 'teal',
        fontSize: 20,
        backgroundColor: 'white',
        borderRadius: 25,
        borderColor: 'black',
        borderWidth: 1,
        width: Dimensions.get('window').width / 1.5,
        padding: 15,
        textAlign: 'center',
    },
});

export default SingleEventDetail;
import moment from 'moment';
import { API_URL } from '../../secrets';
import React, { useState, useEffect } from 'react';
import { AxiosHttpRequest, getUser } from '../../utils/axios';
import { Dimensions, View, StyleSheet, Text, SafeAreaView, Modal, TouchableOpacity, Image, ScrollView } from 'react-native';

// components 
import SingleEventMap from './SingleEventMap';

const SingleEventDetail = ({ event, mapRegion, address, setModalVisible }: any) => {
    const [users, setUsers] = useState([]);
    const [mapModal, setMapModal] = useState(false);
    const [me, setUser]: any = useState({});

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        await getUser(setUser);
        const data = (await AxiosHttpRequest('GET', `${API_URL}/event/${event.id}/users`))?.data;
        setUsers(data);
    };

    const attend = async () => {
        let attending = Boolean(users.find((user: any) => user.user.id === me.id));
        if (attending) {
            alert("You are already attending");

        } else {
            await AxiosHttpRequest('POST', `${API_URL}/event/assign_self`, { eventId: event.id });
            setModalVisible(false);
        }
    };

    return (
        <SafeAreaView>
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                <Text style={styles.done} >Done</Text>
            </TouchableOpacity>

            <View style={styles.details}>
                <Text style={styles.title}>{event.name}</Text>
                <Text style={styles.date}>Starts at {moment(event.startTime).format('MMMM Do YYYY, hh:m A')}</Text>

                <TouchableOpacity onPress={() => setMapModal(true)}>
                    <Text style={styles.location}>See Location</Text>
                </TouchableOpacity>

                <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>{event.description}</Text>
                </View>

                <Text style={{ fontSize: 20 }}>Attendees</Text>
                <ScrollView style={styles.listOfUsers}>
                    {
                        users.map((user: any, index: number) => {
                            const imageUri = user.user.avatarUrl !== null ? user.user.avatarUrl : ""
                            return <View style={styles.user} key={index}>
                                <Image source={imageUri.length !== 0 ? { uri: user.user.avatarUrl }: null} style={styles.avatar} />
                                <Text>{`${user.user.firstName.substring(0, user.user.firstName.indexOf('#'))} ${user.user.lastName.substring(0, user.user.firstName.indexOf('#'))}`}</Text>
                            </View>
                        })
                    }
                </ScrollView>

                <TouchableOpacity onPress={attend} style={styles.attendButton}>
                    <Text style={styles.attendtext}>I'm going!</Text>
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
    date: {
        fontSize: 20,
        marginBottom: 10
    },
    avatar: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },
    listOfUsers: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: Dimensions.get('window').width / 1.6
    },
    user: {
        alignItems: 'center',
    },
    details: {
        alignItems: 'center',
    },
    title: {
        fontSize: 50,
        marginBottom: 20
    },
    descriptionContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 5,
        padding: 8,
        height: Dimensions.get('window').width / 1.7,
        width: Dimensions.get('window').width / 1.2,
        marginTop: 30,
        marginBottom: 20,
    },
    description: {
        fontSize: 20,
        flexWrap: 'wrap',
        // textAlign: 'center'
    },
    location: {
        fontSize: 30,
        color: 'teal',
        marginBottom: 10
    },
    attendtext: {
        color: 'teal',
        fontSize: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        width: Dimensions.get('window').width / 1.5,
        padding: 15,
        textAlign: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
    },
    attendButton: {
        borderRadius: 10
    }
});

export default SingleEventDetail;
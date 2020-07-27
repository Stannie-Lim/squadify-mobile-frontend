import { API_URL } from '../../../secrets'
import React, { useState, useEffect } from 'react';
import { AxiosHttpRequest } from '../../utils/axios';
import { StyleSheet, Text, View, ScrollView, AsyncStorage, Button, SafeAreaView, TouchableOpacity } from 'react-native';

const FriendRequests = ({ getFriends, refresh, outgoingFriendRequests, setOutgoingFriendRequests, incomingFriendRequests, setIncomingFriendRequests }: any) => {

    useEffect(() => {
        const getRequests = async () => {
            const data = (await AxiosHttpRequest('GET', `${API_URL}/user/friendrequests`))?.data;
            setIncomingFriendRequests(data.incomingRequests);
        };
        getRequests();
    }, []);

    const answer = async ({ id }: any, accepted: boolean) => {
        accepted ? await AxiosHttpRequest('POST', `${API_URL}/user/acceptfriend`, { otherUserId: id })
            : await AxiosHttpRequest('POST', `${API_URL}/user/rejectfriend`, { otherUserId: id });

        const afterAnswering = [...incomingFriendRequests].filter(request => request.id !== id);
        setIncomingFriendRequests(afterAnswering);
        getFriends();
    };

    const cancelRequest = async ({ id }: any) => {
        await AxiosHttpRequest('POST', `${API_URL}/user/cancelrequest`, { otherUserId: id });

        const afterAnswering = [...outgoingFriendRequests].filter(request => request.id !== id);
        setOutgoingFriendRequests(afterAnswering);
        getFriends();
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Friend Requests</Text>
            <SafeAreaView style={styles.subcontainer}>
                <Text style={styles.subtitle}>Received Requests</Text>
                {
                    !!incomingFriendRequests.length && incomingFriendRequests.map((request: any) => {
                        if (request) {
                            return (
                                <SafeAreaView key={request.id} style={styles.cardContainer}>
                                    <Text style={styles.friendRequestBox}>{request.firstName.split('#')[0]} {request.lastName.split('#')[0]} {"\n"}
                                    has sent you a friend request </Text>
                                    <TouchableOpacity style={styles.acceptButtonContainer} onPress={() => answer(request, true)}>
                                        <Text style={styles.acceptButtonText}>Accept</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.rejectButtonContainer} onPress={() => answer(request, false)}>
                                        <Text style={styles.cancelButtonText}>Reject</Text>
                                    </TouchableOpacity>
                                </SafeAreaView>
                            )
                        }
                    })
                }
            </SafeAreaView>
            <SafeAreaView style={styles.subcontainer}>
                <Text style={styles.subtitle}>Pending Requests</Text>
                {
                    !!outgoingFriendRequests.length && outgoingFriendRequests.map((request: any) => {
                        if (request) {
                            return (
                                <SafeAreaView key={request.id} style={styles.cardContainer}>
                                    <Text style={styles.friendRequestBox}>You have sent {request.firstName.split('#')[0]} {request.lastName.split('#')[0]} {"\n"} a friend request</Text>
                                    <TouchableOpacity style={styles.cancelButtonContainer} onPress={() => cancelRequest(request)}>
                                        <Text style={styles.cancelButtonText}>Cancel</Text>
                                    </TouchableOpacity>
                                </SafeAreaView>
                            )
                        }
                    })
                }
            </SafeAreaView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
    },
    title: {
        fontSize: 40,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 20,
        textAlign: "center",
    },
    subcontainer: {
        marginTop: 10,
    },
    cardContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        textAlign: 'center',
        backgroundColor: '#bdbdbd',
        margin: 5,
        borderRadius: 10
    },
    acceptButtonText: {
        color: 'white'

    },
    rejectButtonText: {
        color: 'white'
    },
    cancelButtonText: {
        color: 'white'
    },
    acceptButtonContainer: {
        borderColor: "#a1a1a1",
        borderRadius: 5,
        borderStyle: 'solid',
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#33891f'
    },
    cancelButtonContainer: {
        borderColor: "#a1a1a1",
        borderRadius: 5,
        borderStyle: 'solid',
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#63a4c5'
    },
    rejectButtonContainer: {
        borderColor: "#a1a1a1",
        borderRadius: 5,
        borderStyle: 'solid',
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#963131'
    },
    friendRequestBox: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        margin: 10,
        textAlign: 'center',
    }
})

export default FriendRequests;
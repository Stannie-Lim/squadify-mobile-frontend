import { API_URL } from '../../secrets'
import React, { useState, useEffect } from 'react';
import { AxiosHttpRequest } from '../../utils/axios';
import { StyleSheet, Text, View, ScrollView, AsyncStorage, Button, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const FriendRequests = ({ getFriends, refresh, outgoingFriendRequests, setOutgoingFriendRequests }: any) => {
    const [incomingFriendRequests, setIncomingFriendRequests]: any = useState([]);

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
            <Text style={styles.title}>Friend requests</Text>
            <SafeAreaView style={styles.subcontainer}>
                <Text style={styles.subtitle}>Received</Text>
                {
                    !!incomingFriendRequests.length && incomingFriendRequests.map((request: any) => {
                        if (request) {
                            return (
                                <SafeAreaView key={request.id} style={styles.cardContainer}>
                                    <Text>{request.firstName.split('#')[0]} {request.lastName.split('#')[0]} #{request.lastName.split('#')[1]}</Text>
                                    <TouchableOpacity style={styles.acceptButtonContainer} onPress={() => answer(request, true)}>
                                        <Text style={styles.acceptButtonText}>Accept</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.cancelButtonContainer} onPress={() => answer(request, false)}>
                                        <Text style={styles.cancelButtonText}>Reject</Text>
                                    </TouchableOpacity>
                                </SafeAreaView>
                            )
                        }
                    })
                }
            </SafeAreaView>
            <SafeAreaView style={styles.subcontainer}>
                <Text style={styles.subtitle}>Sent</Text>
                {
                    !!outgoingFriendRequests.length && outgoingFriendRequests.map((request: any) => {
                        if (request) {
                            return (
                                <SafeAreaView key={request.id} style={styles.cardContainer}>
                                    <Text>{request.firstName.split('#')[0]} {request.lastName.split('#')[0]} #{request.lastName.split('#')[1]}</Text>
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
        marginTop: 30
    },
    title: {
        fontSize: 40,
        textAlign: "center"
    },
    subtitle: {
        fontSize: 27,
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
        margin: 10
    },
    acceptButtonText: {
        color: '#1aff1a'
    },
    cancelButtonText: {
        color: '#ff0000'
    },
    acceptButtonContainer: {
        borderColor: "#1aff1a",
        borderRadius: 5,
        borderStyle: 'solid',
        borderWidth: 1,
        padding: 10
    },
    cancelButtonContainer: {
        borderColor: "#ff0000",
        borderRadius: 5,
        borderStyle: 'solid',
        borderWidth: 1,
        padding: 10
    }
})

export default FriendRequests;
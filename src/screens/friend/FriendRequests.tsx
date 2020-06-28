import { API_URL } from 'react-native-dotenv'
import React, { useState, useEffect } from 'react';
import { AxiosHttpRequest } from '../../utils/axios';
import { StyleSheet, Text, View, ScrollView, AsyncStorage, Button, SafeAreaView } from 'react-native';

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
        <ScrollView>
            <Text style={{ fontSize: 30, }}>Sent requests</Text>
            {
                !!incomingFriendRequests.length && incomingFriendRequests.map(request => {
                    if (request) {
                        return (
                            <SafeAreaView key={request.id}>
                                <Text>{request.firstName.split('#')[0]} {request.lastName.split('#')[0]} #{request.lastName.split('#')[1]}</Text>
                                <Button onPress={() => answer(request, true)} title='Accept friend' />
                                <Button onPress={() => answer(request, false)} title='Decline friend' />
                            </SafeAreaView>
                        )
                    }
                })
            }
            <Text style={{ fontSize: 30, }}>Received requests</Text>
            {
                !!outgoingFriendRequests.length && outgoingFriendRequests.map(request => {
                    if (request) {
                        return (
                            <SafeAreaView key={request.id}>
                                <Text>{request.firstName.split('#')[0]} {request.lastName.split('#')[0]} #{request.lastName.split('#')[1]}</Text>
                                <Button onPress={() => cancelRequest(request)}
                                    title='Cancel friend request' />
                            </SafeAreaView>
                        )
                    }
                })
            }
        </ScrollView>
    );
};

export default FriendRequests;
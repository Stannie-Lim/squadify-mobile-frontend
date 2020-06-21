import { API_URL } from 'react-native-dotenv'
import React, { useState, useEffect } from 'react';
import { AxiosHttpRequest } from '../../utils/axios';
import { StyleSheet, Text, View, ScrollView, AsyncStorage, Button, SafeAreaView } from 'react-native';

const FriendRequests = ({ getFriends }: any) => {
    const [ incomingFriendRequests, setIncomingFriendRequests ] = useState([]);
    const [ outgoingFriendRequests, setOutgoingFriendRequests ] = useState([]);
    
    const allFriendRequests = async () => {
        try {
            const requests = (await AxiosHttpRequest('GET', `${API_URL}/user/friendrequests`))?.data;
            setIncomingFriendRequests(requests.incomingRequests);
            setOutgoingFriendRequests(requests.sentRequests);
        } catch(err) {
            console.log(err);
        }
    };

    useEffect(() => {
        allFriendRequests();
    }, [outgoingFriendRequests.length]);

    const answer = async ({ id }: any, accepted: boolean) => {
        accepted ? await AxiosHttpRequest('POST', `${API_URL}/user/acceptfriend`, { otherUserId: id })
        : await AxiosHttpRequest('POST', `${API_URL}/user/rejectfriend`, { otherUserId: id });

        const afterAnswering = [...outgoingFriendRequests].filter(request => request.id !== id);
        setIncomingFriendRequests(afterAnswering);
        getFriends();
    };

    return (
        <ScrollView>
            <Text style={{ fontSize: 30, }}>Friend requests</Text>
            {
                !!incomingFriendRequests.length && incomingFriendRequests.map(request => {
                    if(request) {
                        return (
                            <SafeAreaView key={request.id}>
                                <Text>{ request.firstName } { request.lastName }</Text>
                                <Button onPress={ () => answer(request, true) } title='Accept friend' />
                                <Button onPress={ () => answer(request, false) } title='Decline friend' />
                            </SafeAreaView>
                        )
                    }
                })
            }
            <Text style={{ fontSize: 30, }}>Outgoing friend requests</Text>
            {
                !!outgoingFriendRequests.length && outgoingFriendRequests.map(request => {
                    if(request) {
                        return (
                            <SafeAreaView key={request.id}>
                                <Text>{ request.firstName } { request.lastName }</Text>
                            </SafeAreaView>
                        )
                    }
                })
            }
        </ScrollView>
    );
};

export default FriendRequests;
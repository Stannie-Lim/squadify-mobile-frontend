import axios from 'axios';
import { API_URL } from 'react-native-dotenv'
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, AsyncStorage, Button, SafeAreaView } from 'react-native';

const FriendRequests = ({ getFriends }: any) => {
    const [ incomingFriendRequests, setIncomingFriendRequests ] = useState([]);
    const [ outgoingFriendRequests, setOutgoingFriendRequests ] = useState([]);
    useEffect(() => {
        const allFriendRequests = async () => {
            try {
                const id = await AsyncStorage.getItem('id');
                const token = await AsyncStorage.getItem('token');
                const requests = (await axios.get(`${API_URL}/user/${id}/friendrequests`, { headers: { Authorization: token}})).data;
                setIncomingFriendRequests(requests.incomingRequests);
                setOutgoingFriendRequests(requests.sentRequests);
            } catch(err) {
                console.log(err);
            }
        };
        allFriendRequests();
    }, [outgoingFriendRequests.length]);

    const answer = async ({ id }: any, accepted: boolean) => {
        const myId = await AsyncStorage.getItem('id');
        const token = await AsyncStorage.getItem('token');
        if(accepted) {
           await axios.post(`${API_URL}/user/${myId}/acceptfriend`, { otherUserId: id }, { headers: { Authorization: token }});
            // your id: bf3adc17-9f5b-48b4-b9e1-d73e81393382
            // friend id: 6b6377bc-0413-4244-b4dc-9e3f06e5f499
        } else {
            await axios.post(`${API_URL}/user/${myId}/rejectfriend`, { otherUserId: id }, { headers: { Authorization: token }});
        }
        const afterAnswering = outgoingFriendRequests.filter(request => request.id !== id);
        setIncomingFriendRequests(afterAnswering);
        // setIncomingFriendRequests(
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
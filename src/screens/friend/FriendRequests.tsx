import axios from 'axios';
import { API_URL } from 'react-native-dotenv'
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, AsyncStorage, Button, SafeAreaView } from 'react-native';

const FriendRequests = () => {
    const [ incomingFriendRequests, setIncomingFriendRequests ] = useState([]);
    const [ outgoingFriendRequests, setOutgoingFriendRequests ] = useState([]);
    useEffect(() => {
        const allFriendRequests = async () => {
            const id = await AsyncStorage.getItem('id');
            const token = await AsyncStorage.getItem('token');
            const requests = (await axios.get(`${API_URL}/user/${id}/friendrequests`, { headers: { Authorization: token}})).data;
            setIncomingFriendRequests(requests.incomingRequests);
            console.log(requests);
            setOutgoingFriendRequests(requests.sentRequests);
        };
        allFriendRequests();
    }, []);

    const accept = async ({ id }: any) => {
        const myId = await AsyncStorage.getItem('id');
        const token = await AsyncStorage.getItem('token');
        await axios.post(`${API_URL}/user/${id}/acceptfriend`, { otherUserId: id }, { headers: { Authorization: token }});
        const afterAnswering = outgoingFriendRequests.filter(request => request.id !== id);
        setOutgoingFriendRequests(afterAnswering);
    };

    const decline = async ({ id }: any) => {
        
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
                                <Button onPress={ () => accept(request) } title='Accept friend' />
                                <Button onPress={ () => decline(request) } title='Decline friend' />
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
import axios from 'axios';
import { API_URL } from 'react-native-dotenv';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, AsyncStorage } from 'react-native';

//components 
import FriendRequests from './FriendRequests';

const Friends = ({ navigation }: any) => {
    const [ friends, setFriends ] = useState([]);
    useEffect(() => {
        const getFriends = async() => {
            const token = await AsyncStorage.getItem('token');
            const id = await AsyncStorage.getItem('id');
            try {
                const friendsData = (await axios.get(`${API_URL}/user/${id}/friends`, { headers: { Authorization: token }})).data;
                setFriends(friendsData);
            } catch(err) {
                console.log(err);
            }
        };
        getFriends();
    }, [friends.length]);

    return (
        <ScrollView>
            <Text style={{ fontSize: 30, }}>My Friends</Text>
            {
                friends && friends.map((friend: any) => <Text key={friend.id}>{friend.firstName} {friend.lastName}</Text>)
            }
            <FriendRequests setFriends={ setFriends } />
        </ScrollView>
    );
};

export default Friends;
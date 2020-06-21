import { API_URL } from 'react-native-dotenv';
import React, { useState, useEffect } from 'react';
import { AxiosHttpRequest } from '../../utils/axios';
import { StyleSheet, Text, View, ScrollView, AsyncStorage, Alert } from 'react-native';

//components 
import FriendRequests from './FriendRequests';
import RemoveFriendCard from '../../cards/RemoveFriendCard';

const Friends = ({ navigation }: any) => {
    const [ friends, setFriends ] = useState([]);

    const getFriends = async() => {
        try {
            const friendsData = (await AxiosHttpRequest('GET', `${API_URL}/user/friends`))?.data;
            setFriends(friendsData);
        } catch(err) {
            console.log(err);
        }
    };

    const deleteFriend = async(fullName: string, email: string, friendId: string) => {
        Alert.alert(
            'Delete Friend',
            `Are you sure you want to delete ${fullName} (${email})?`,
            [
                {
                  text: "Cancel",
                  onPress: () => { return },
                  style: "cancel"
                },
                { text: "OK", onPress: async() => {
                    const token = await AsyncStorage.getItem('token');
                    const id = await AsyncStorage.getItem('id');
                    try {
                        await AxiosHttpRequest('DELETE', `${API_URL}/user/friends/${friendId}`);
                        getFriends();
                    } catch(err) {
                        console.log(err);   
                    }
                }}
            ],
            { cancelable: true }
        );
        
    };

    useEffect(() => {
        getFriends();
    }, [friends.length]);

    return (
        <ScrollView>
            <Text style={{ fontSize: 30, }}>My Friends</Text>
            {
                friends && friends.map((friend: any) => (
                    <RemoveFriendCard deleteFriend={ deleteFriend } friend={ friend } key={ friend.id } />
                ))
            }
            <FriendRequests getFriends={ getFriends } />
        </ScrollView>
    );
};

export default Friends;
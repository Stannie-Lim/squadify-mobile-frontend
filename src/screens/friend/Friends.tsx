import { API_URL } from 'react-native-dotenv';
import React, { useState, useEffect } from 'react';
import { AxiosHttpRequest } from '../../utils/axios';
import { StyleSheet, Text, View, ScrollView, AsyncStorage, Alert, RefreshControl } from 'react-native';

//components 
import FriendRequests from './FriendRequests';
import RemoveFriendCard from '../../cards/RemoveFriendCard';

const Friends = ({ navigation, route }: any) => {
    const [ friends, setFriends ] = useState([]);
    const [ refreshing, setRefreshing ] = useState(false);
    const [ outgoingFriendRequests, setOutgoingFriendRequests ]: any = useState([]);

    const allFriendRequests = async () => {
        try {
            const requests = (await AxiosHttpRequest('GET', `${API_URL}/user/friendrequests`))?.data;
            setOutgoingFriendRequests(requests.sentRequests);
        } catch(err) {
            console.log(err);
        }
    };

    const getFriends = async() => {
        try {
            const friendsData = (await AxiosHttpRequest('GET', `${API_URL}/user/friends`))?.data;
            setFriends(friendsData);
        } catch(err) {
            console.log(err);
        }
    };

    const refresh = async () => {
        setRefreshing(true);
        allFriendRequests();
        setRefreshing(false);
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
        allFriendRequests();
    }, [friends.length]);

    return (
        <ScrollView
            refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refresh} />
            }>
            <Text style={{ fontSize: 30, }}>My Friends</Text>
            {
                friends && friends.map((friend: any) => (
                    <RemoveFriendCard deleteFriend={ deleteFriend } friend={ friend } key={ friend.id } />
                ))
            }
            <FriendRequests getFriends={ getFriends } refresh={ refresh } outgoingFriendRequests={ outgoingFriendRequests } setOutgoingFriendRequests={ setOutgoingFriendRequests } />
        </ScrollView>
    );
};

export default Friends;
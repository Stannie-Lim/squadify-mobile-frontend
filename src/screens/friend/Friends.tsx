import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

//components 
import FriendRequests from './FriendRequests';

const Friends = ({ navigation, friends }: any) => {
    // console.log(friends);
    return (
        <ScrollView>
            <Text>My Friends</Text>
            {
                friends && friends.map((friend: any) => <Text key={friend.id}>{friend.firstName} {friend.lastName}</Text>)
            }
            <FriendRequests />
        </ScrollView>
    );
};

export default Friends;
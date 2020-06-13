import axios from 'axios';
import React, { useState } from 'react';
import { API_URL } from 'react-native-dotenv'
import { StyleSheet, Text, View, ScrollView, TextInput, Button, AsyncStorage } from 'react-native';

const AddFriend = () => {
    const [ friendEmail, setFriendEmail ] = useState('');

    const addFriend = async () => {
        const token = await AsyncStorage.getItem('token');
        const id = await AsyncStorage.getItem('id');

        const friendId = (await axios.get(`${API_URL}/user/${friendEmail}`, { headers: { Authorization: token} })).data.id;

        const friendrequest = (await axios.post(`${API_URL}/user/${id}/addfriend`, { otherUserId: friendId }, {headers: { Authorization: token }} )).data;

        console.log(friendrequest);
    };

    return (
        <ScrollView>
            <TextInput 
                style={ styles.inputField }
                placeholder='Email'
                value={ friendEmail }
                onChangeText={ text => setFriendEmail(text) }
            />
            <Button onPress={ addFriend } title='Add friend' />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    inputField: {
        height: 40, 
        borderBottomWidth: 2,
        borderColor: 'lightseagreen', 
        fontSize: 20,
        marginBottom: 30,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    }
});

export default AddFriend;
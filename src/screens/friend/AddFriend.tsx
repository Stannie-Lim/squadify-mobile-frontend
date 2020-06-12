import axios from 'axios';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, AsyncStorage } from 'react-native';

const AddFriend = () => {
    const [ friendEmail, setFriendEmail ] = useState('');

    const addFriend = async () => {
        const token = await AsyncStorage.getItem('token');
        const id = await AsyncStorage.getItem('id');

        const friendId = (await axios.get(`http://localhost:3000/user/${friendEmail}`, { headers: { Authorization: `Bearer ${token}`} })).data.id;

        const friendrequest = (await axios.post(`http://localhost:3000/user/${id}/addfriend`, { otherUserId: friendId }, {headers: { Authorization: `Bearer ${token}` }} )).data;
        
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
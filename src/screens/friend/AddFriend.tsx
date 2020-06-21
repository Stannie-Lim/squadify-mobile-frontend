import React, { useState } from 'react';
import { API_URL } from 'react-native-dotenv'
import { AxiosHttpRequest } from '../../utils/axios';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, AsyncStorage } from 'react-native';

const AddFriend = () => {
    const [ friendEmail, setFriendEmail ] = useState('');

    const addFriend = async () => {
        try {
            const friendId = (await AxiosHttpRequest('GET', `${API_URL}/user/findfriend/${friendEmail}`))?.data.id;

            const friendrequest = (await AxiosHttpRequest('POST', `${API_URL}/user/addfriend`, { otherUserId: friendId }))?.data;

            console.log(friendrequest);
        } catch(err) {
            console.log(err);
        }
    };

    return (
        <ScrollView>
            <TextInput 
                autoCapitalize="none"
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
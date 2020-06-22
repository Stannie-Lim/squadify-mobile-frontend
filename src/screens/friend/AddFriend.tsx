import React, { useState, useEffect } from 'react';
import { API_URL } from 'react-native-dotenv'
import { AxiosHttpRequest, getUser } from '../../utils/axios';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, AsyncStorage } from 'react-native';

const AddFriend = ({ navigation }: any) => {
    const [ friendEmail, setFriendEmail ] = useState('');
    const [ me, setMe ] = useState({ id: 0 });

    useEffect(() => {
        const getMe = async() => await getUser(setMe);
        getMe();
    });

    const addFriend = async () => {
        try {
            const friendId = (await AxiosHttpRequest('GET', `${API_URL}/user/findfriend/${friendEmail}`))?.data.id;

            const friendrequest = (await AxiosHttpRequest('POST', `${API_URL}/user/addfriend`, { otherUserId: friendId }))?.data;

            const allfriends = (await AxiosHttpRequest('GET', `${API_URL}/user/friends`))?.data;

            let isCurrentFriend = false;

            allfriends.forEach((friend: any) => friend.id === friendId ? isCurrentFriend = true : '')

            if(me.id === friendId) {
                alert('You cannot add yourself a friend');
                return;
            } else if(isCurrentFriend) {
                alert('You are already friends');
                return;
            }

            navigation.navigate('Friends');
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
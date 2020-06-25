import React, { useState, useEffect } from 'react';
import { API_URL } from 'react-native-dotenv'
import { AxiosHttpRequest, getUser } from '../../utils/axios';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, AsyncStorage, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';

//components
import FriendCard from '../../cards/FriendCard';

const AddFriend = ({ navigation }: any) => {
    const [ friendEmail, setFriendEmail ] = useState('');
    const [ me, setMe ] = useState({ id: 0 });
    const [ foundUser, setFoundUser ] = useState({});
    const [ chosen, setChosen ] = useState([]);

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

            navigation.navigate('Pending');
        } catch(err) {
            console.log(err);
        }
    };

    const search = async() => {
        const found = (await AxiosHttpRequest('GET', `${API_URL}/user/findfriend/${friendEmail}`))?.data;
        setFoundUser(found);
    };  

    return (
        <SafeAreaView>
            <View style={ styles.container }>
                <TextInput 
                    autoCapitalize="none"
                    style={ styles.inputField }
                    placeholder='Email'
                    value={ friendEmail }
                    onChangeText={ text => setFriendEmail(text) }
                />
                <Button title="Search" onPress={ search } />
                {
                    foundUser.id ? <View><FriendCard friend={ foundUser } chosenFriends={ chosen } setChosenFriends={ setChosen } /><Text>Tap on friend to verify</Text></View> : <Text></Text>
                }
            </View>
            <View style={ styles.buttoncontainer} >
                <TouchableOpacity style={ styles.kickmember } onPress={ addFriend }>
                    <Text style={ styles.kicktext }>Add friend</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
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
        height: Dimensions.get('window').height / 4,
    },
    kickmember: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderRadius: 50,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('window').width / 1.2,
    },
    kicktext: {
        padding: 10,
        fontSize: 25
    },
    buttoncontainer: {
        alignItems: 'center',
        paddingTop: Dimensions.get('window').width / 0.9,
    },
});

export default AddFriend;
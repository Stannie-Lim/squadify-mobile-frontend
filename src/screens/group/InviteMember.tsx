import { API_URL } from '../../../secrets'
import React, { useState, useEffect } from 'react';
import { AxiosHttpRequest } from '../../utils/axios';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, AsyncStorage, TextInput, Button, TouchableOpacity } from 'react-native';

//components
import FriendCard from '../../cards/FriendCard';

const InviteMember = ({ route, navigation }: any) => {
    const { group, user } = route.params;

    const [chosen, setChosen] = useState([]);
    const [friends, setFriends] = useState([])

    useEffect(() => {
        const getFriends = async () => {
            const data = (await AxiosHttpRequest('GET', `${API_URL}/user/friends`))?.data;
            setFriends(data);
        };
        getFriends();
    }, []);

    const addMember = async () => {
        try {
            chosen.forEach(async friend => {
                await AxiosHttpRequest('POST', `${API_URL}/groups/invitations/${group.id}/send`, { inviteeId: friend });
            });
            navigation.navigate('Group');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <ScrollView style={styles.scroll}>
                    {
                        friends.length !== 0 ? friends.map((friend: any) => <FriendCard key={friend.id} friend={friend} chosenFriends={chosen} setChosenFriends={setChosen} />) : <Text></Text>
                    }
                </ScrollView>
            </View>
            <View style={styles.buttoncontainer} >
                <TouchableOpacity style={styles.kickmember} onPress={addMember}>
                    <Text style={styles.kicktext}>Invite</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    scroll: {

    },
    inputField: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
    },
    container: {
        height: Dimensions.get('window').height / 1.25,
        borderColor: 'black',
        borderWidth: 1,
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
        marginTop: 5
    },
});

export default InviteMember;
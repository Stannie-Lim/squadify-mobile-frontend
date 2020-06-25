import { API_URL } from 'react-native-dotenv';
import React, { useState, useEffect } from 'react';
import { AxiosHttpRequest } from '../../utils/axios';
import { AsyncStorage, StyleSheet, SafeAreaView, Button, TextInput, Image, TouchableOpacity, Modal, Dimensions, ScrollView, Alert, Text, View } from 'react-native';

// components
import FriendCard from '../../cards/FriendCard';

const Members = ({ route }: any) => {
    const { group, user } = route.params;
    const [ members, setMembers ] = useState([]);
    const [ chosen, setChosen ] = useState([]);

    useEffect( () => {
        const getUserInfo = async () => {
            await getMembers();
        };
        getUserInfo();
    }, []);

    const getMembers = async() => {
        const { id } = group;
        const data = (await AxiosHttpRequest('GET', `${API_URL}/groups/${id}/users`))?.data.filter((member: any) => member.id !== user.id);
        setMembers(data);
    };
    const kickMembers = async() => {
        console.log(chosen);
        Alert.alert(
        'Remove members',
        `Are you sure you want to remove the selected members?`,
        [
            {
                text: "Cancel",
                onPress: () => { return },
                style: "cancel"
            },
            { text: "OK", onPress: async() => {
                try {
                    chosen.forEach(async (member: any) => {
                        const data = (await AxiosHttpRequest('DELETE', `${API_URL}/groups/removeuser/${group.id}`, { removerId: user.id, userId: member }))?.data;
                        console.log(data);
                    });
                    setMembers(members.filter((member: any) => !chosen.includes(member.id)));
                } catch(err) {
                    console.log('123123123123');
                }
            }}
        ],
        { cancelable: true }
        );
    };


    return (
        <SafeAreaView>
            <ScrollView style={ styles.container }>
                {
                    members.length !== 0 && members.map((member, index): any => <FriendCard key={index} friend={ member } chosenFriends={ chosen } setChosenFriends={ setChosen } /> )
                }
            </ScrollView>
            <View style={ styles.buttoncontainer} >
                <TouchableOpacity style={ styles.kickmember } onPress={ kickMembers }>
                    <Text style={ styles.kicktext }>Remove member</Text>
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
        height: Dimensions.get('window').height / 1.3,
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
    },
  });   

export default Members;
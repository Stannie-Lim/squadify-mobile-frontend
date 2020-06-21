import React, { useState } from 'react';
import { API_URL } from 'react-native-dotenv';
import { AxiosHttpRequest, setJwt } from '../../utils/axios';
import { AsyncStorage, StyleSheet, Text, View, SafeAreaView, Button, TextInput } from 'react-native';

const Login = ({ navigation, route }: any) => {
    const [ email, setEmail ] = useState('user1@gmail.com');
    const [ password, setPassword ] = useState('password');
    const [ friends, setFriends ] = useState([]);
    const [ groups, setGroups ] = useState([]);

    const login = async () => {
        try {
            const { token } = (await AxiosHttpRequest('POST', `${API_URL}/auth/login`, { email, password }))?.data;
            setJwt(token);

            // const { id } = (await AxiosHttpRequest('GET', `${API_URL}/user/${email}`))?.data;
            // await AsyncStorage.setItem("id", id);

            const friendsData = (await AxiosHttpRequest('GET', `${API_URL}/user/friends`))?.data;

            const groupsData = (await AxiosHttpRequest('GET', `${API_URL}/user/groups`))?.data;

            setFriends(friendsData);
            setGroups(groupsData);

            if(groupsData.length !== 0) {
                navigation.replace('Group', { group: groupsData[0], groups: groupsData, friends: friendsData });
            } else {
                navigation.replace('Your Account', { groups, friends });
            }
        } catch(err) {
            console.log(err);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <TextInput 
                autoCapitalize="none"
                style={styles.inputField}
                onChangeText={text => setEmail(text)}
                value={email} 
                placeholder='Email'
            />
            <TextInput 
                autoCapitalize="none"
                style={styles.inputField}
                onChangeText={text => setPassword(text)}
                value={password} 
                placeholder='Password'
            />
            <Button title='Login' onPress={ login } />
            <Button title="Don't have an account? Register here!" onPress={ () => navigation.navigate('Register') } />
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
        flex: 1,
        justifyContent: 'center',
    }
});

export default Login;
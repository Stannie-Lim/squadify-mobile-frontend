import axios from 'axios';
import React, { useState } from 'react';
import { API_URL } from 'react-native-dotenv'
import { AsyncStorage, StyleSheet, Text, View, SafeAreaView, Button, TextInput } from 'react-native';

const Login = ({ navigation }: any) => {
    const [ email, setEmail ] = useState('user1@gmail.com');
    const [ password, setPassword ] = useState('password');

    const login = async () => {
        try {
            const token = `Bearer ${(await axios.post(`${API_URL}/auth/login`, { email, password })).data.token}`;

            const { id } = (await axios.get(`${API_URL}/user/${email}`, { headers: { Authorization: token }})).data;
            
            const friends = (await axios.get(`${API_URL}/user/${id}/friends`, { headers: { Authorization: token }})).data;

            const groups = ['Group 1', 'Group 2', 'Group 3'];
            await AsyncStorage.setItem("token", token);
            await AsyncStorage.setItem("id", id);
            navigation.replace('Group', { group: groups[0], groups, friends });
        } catch(err) {
            console.log(err);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <TextInput 
                style={styles.inputField}
                onChangeText={text => setEmail(text)}
                value={email} 
                placeholder='Email'
            />
            <TextInput 
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
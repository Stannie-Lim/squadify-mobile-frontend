import React, { useState } from 'react';
import axios from 'axios';
import { AsyncStorage, StyleSheet, Text, View, SafeAreaView, Button, TextInput } from 'react-native';

const Login = ({ navigation }: any) => {
    const [ email, setEmail ] = useState('Stannie@gmail.com');
    const [ password, setPassword ] = useState('Stannie123');

    const login = async () => {
        try {
            // const token = (await axios.post('http://localhost:3000/auth/login', { email, password })).data.token;
            
            const groups = ['Group 1', 'Group 2', 'Group 3'];
            // await AsyncStorage.setItem("token", token);
            navigation.replace('Group', { group: groups[0], groups });
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
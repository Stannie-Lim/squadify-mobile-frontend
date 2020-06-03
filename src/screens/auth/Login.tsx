import React, { useState } from 'react';
import { AsyncStorage, StyleSheet, Text, View, SafeAreaView, Button, TextInput } from 'react-native';

const Login = ({ navigation }: any) => {
    const [ email, setEmail ] = useState('hello@gmail.com');
    const [ password, setPassword ] = useState('password123');

    const login = async () => {
        try {
            await AsyncStorage.setItem("token", "token");
            navigation.navigate('Group');
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
                placeholder='Email'
            />
            <Button title='Login' onPress={ login } disabled={ !email || !password ? 'disabled' : '' } />
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
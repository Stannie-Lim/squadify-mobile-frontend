import React, { useState } from 'react';
import { API_URL } from '../../secrets';
import { AxiosHttpRequest, setJwt } from '../../utils/axios';
import { AsyncStorage, StyleSheet, Text, View, SafeAreaView, Button, TextInput, ImageBackground, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';

// styles
const image = require('../../../assets/images/login.jpg');

// icons
import { AntDesign, Feather } from '@expo/vector-icons';

const Login = ({ navigation, route }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [friends, setFriends] = useState([]);
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false)

    const login = async () => {
        try {
            setLoading(true)
            const { token } = (await AxiosHttpRequest('POST', `${API_URL}/auth/login`, { email, password }))?.data;
            setJwt(token);

            const friendsData = (await AxiosHttpRequest('GET', `${API_URL}/user/friends`))?.data;

            const groupsData = (await AxiosHttpRequest('GET', `${API_URL}/user/groups`))?.data;

            setFriends(friendsData);
            setGroups(groupsData);

            if (groupsData.length !== 0) {
                navigation.replace('Group', { group: groupsData[0], groups: groupsData, friends: friendsData });
            } else {
                navigation.replace('Groups', { groups, friends });
            }
            setLoading(false)
        } catch (err) {
            setLoading(false)
            alert("Incorrect information or backend not running right now :)");
        }
    };

    return (
        <ImageBackground source={image} style={styles.image}>
            <SafeAreaView style={styles.container}>
                <View style={styles.inputsContainer}>
                    <View style={styles.inputs}>
                        <AntDesign name="user" size={24} color="white" />
                        <TextInput
                            autoCapitalize="none"
                            style={styles.inputField}
                            onChangeText={text => setEmail(text)}
                            value={email}
                            placeholder='Email'
                            placeholderTextColor='white'
                        />
                    </View>
                    <View style={styles.inputs}>
                        <Feather name="lock" size={24} color="white" />
                        <TextInput
                            autoCapitalize="none"
                            style={styles.inputField}
                            onChangeText={text => setPassword(text)}
                            value={password}
                            placeholder='Password'
                            secureTextEntry={true}
                            placeholderTextColor='white'
                        />
                    </View>
                </View>
                <View style={styles.buttongroup}>
                    <TouchableOpacity onPress={login} style={styles.signin} >
                        <Text style={styles.text}>Sign In</Text>
                    </TouchableOpacity>
                </View>
                {loading &&
                    <View style={styles.loading}>
                        <ActivityIndicator size='large' color='white' />
                    </View>
                }
                <View style={styles.buttongroup}>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.registertext}>Don't have an account? Register here!</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    inputsContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        shadowColor: "#000",
        shadowOffset: {
            width: 10,
            height: 9,
        },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,
        padding: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 35
    },
    inputs: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    inputField: {
        height: 40,
        borderBottomWidth: 1,
        borderColor: 'white',
        fontSize: 20,
        marginBottom: 30,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
        width: Dimensions.get('window').width / 1.5,
        color: 'white',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        opacity: 1,
        marginTop: Dimensions.get('screen').height / 6.5
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        opacity: 1
    },
    signin: {
        alignItems: 'center',
        width: Dimensions.get('window').width / 1.5,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 50,
        borderColor: 'white',
        borderWidth: 2,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        shadowColor: "#000",
        shadowOffset: {
            width: 10,
            height: 9,
        },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,
    },
    buttongroup: {
        alignItems: 'center',
        marginTop: 20,
    },
    text: {
        color: 'white',
        fontSize: 20
    },
    registertext: {
        backgroundColor: 'lightseagreen',
        width: Dimensions.get('window').width,
        textAlign: 'center',
        padding: 20,
        color: 'white',
        fontSize: 20
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Login;
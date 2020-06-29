import React, { useState, useEffect } from 'react';
import { API_URL } from '../../secrets'
import { AxiosHttpRequest, getUser } from '../../utils/axios';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, AsyncStorage, TouchableOpacity, Dimensions, SafeAreaView, Switch, FlatList } from 'react-native';

//components
import FriendCard from '../../cards/FriendCard';

const AddFriend = ({ navigation }: any) => {
    const [friends, setFriends] = useState([])
    const [incomingFriendRequests, setIncomingFriendRequests]: any = useState([]);
    const [sentFriendRequests, setSentFriendRequests]: any = useState([]);

    const [friendEmail, setFriendEmail] = useState('');
    const [me, setMe] = useState({ id: '' });
    const [foundUsers, setFoundUsers] = useState({} as any);
    const [chosen, setChosen] = useState([]);
    const [searchType, setSearchType] = useState(false)

    useEffect(() => {
        const getMe = async () => await getUser(setMe);
        const getFriends = async () => {
            const allfriends = (await AxiosHttpRequest('GET', `${API_URL}/user/friends`))?.data;
            setFriends(allfriends)
        }
        const getRequests = async () => {
            const data = (await AxiosHttpRequest('GET', `${API_URL}/user/friendrequests`))?.data;
            setSentFriendRequests(data.sentRequests);
            setIncomingFriendRequests(data.incomingRequests);
        }
        getMe();
        getFriends()
    }, []);

    const addFriends = async () => {
        try {
            chosen.forEach(async (id: string) => {
                await AxiosHttpRequest('POST', `${API_URL}/user/addfriend`, { otherUserId: id })

                if (me.id === id) {
                    alert('You cannot add yourself a friend');
                    return;
                }

                setFoundUsers((previousState: any) => previousState.filter((_user: any) => id !== _user.id))
            })
            navigation.navigate('Friends');
        } catch (err) {
            console.log(err);
        }
    };

    const toggleSearchType = () => setSearchType(!searchType)

    const search = async () => {
        let found = (await AxiosHttpRequest('GET', `${API_URL}/user/search/${searchType ? 'hash' : 'email'}/${friendEmail}`))?.data;
        found = found.filter((user: any) => {
            return !friends.find((friend: any) => friend.id === user.id) && !sentFriendRequests.find((friend: any) => friend.id === user.id) && !incomingFriendRequests.find((friend: any) => friend.id === user.id) && user.id !== me.id
        })
        setFoundUsers(found);
    };

    return (
        <SafeAreaView style={{ marginTop: 100, display: 'flex', flexDirection: 'column' }}>
            <View style={styles.searchContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        autoCapitalize="none"
                        style={styles.inputField}
                        placeholder={searchType ? 'Name/hash' : 'Email'}
                        value={friendEmail}
                        onChangeText={text => setFriendEmail(text)}
                    />
                    <Button title="Search" onPress={search} />
                </View>
                <SafeAreaView style={styles.switchContainer}>
                    <Switch
                        style={styles.switch}
                        value={searchType}
                        onValueChange={toggleSearchType}
                    ></Switch>
                    <Text>Search by {searchType ? 'hash' : 'email'}</Text>
                </SafeAreaView>
            </View>
            <View style={styles.flatListContainer}>
                {
                    foundUsers && foundUsers.length ?
                        <FlatList
                            style={styles.flatList}
                            data={foundUsers}
                            renderItem={({ item }: any) => <FriendCard
                                friend={item}
                                chosenFriends={chosen}
                                setChosenFriends={setChosen}
                            />}
                        /> : <Text />
                }
            </View>
            <View style={styles.buttoncontainer} >
                <Text>Tap on friend to verify</Text>
                <TouchableOpacity style={styles.addFriendButton} onPress={addFriends}>
                    <Text style={styles.addFriendText}>Add selected friends</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    inputField: {
        backgroundColor: 'white',
        height: 40,
        borderRadius: 5,
        borderColor: 'lightgray',
        borderWidth: 1,
        width: 300,
        padding: 8,
        marginTop: 6
    },
    searchContainer: {
        display: 'flex',
        flexDirection: 'column'
    },
    inputContainer: {
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: 10
    },
    switchContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    switch: {

    },
    addFriendButton: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderRadius: 50,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 350,
    },
    addFriendText: {
        padding: 10,
        fontSize: 25
    },
    buttoncontainer: {
        alignItems: 'center',
        marginBottom: 0
    },
    flatList: {

    },
    flatListContainer: {
        height: Dimensions.get('window').height / 1.55
    }
});

export default AddFriend;
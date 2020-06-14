import axios from 'axios';
import { API_URL } from 'react-native-dotenv';
import React, {useState, useEffect} from 'react';
import { CheckBox } from 'react-native-elements';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button, AsyncStorage, ScrollView, Dimensions } from 'react-native';

//cards 
import FriendCard from '../../cards/FriendCard';

const CreateGroup = ({ navigation, route }: any) => {
    const [ name, setName ] = useState('');
    const [ isPrivate, setPrivate ] = useState(false);
    const [ chosenFriends, setChosenFriends ] = useState([]);
    const [ avatarUrl, setAvatarUrl ] = useState('https://66.media.tumblr.com/79a1ac638d6e50f1fa5d760be1d8a51a/tumblr_inline_ojk654MOr11qzet7p_250.png');

    // used for 
    const [ myFriends, setFriends ] = useState([]);
    useEffect(() => {
        setFriends(route.params.friends);
    }, []);

    const createGroup = async () => {
        const { groups } = route.params;
        const token = await AsyncStorage.getItem('token');
        const id = await AsyncStorage.getItem('id');
        const newGroup = (await axios.post(`${API_URL}/groups`, { name, isPrivate, creatorId: id, friendIds: chosenFriends, avatarUrl }, { headers: { Authorization: token }} )).data;
        const setGroups = [...groups, newGroup.group.raw[0]];
        navigation.replace('Your Account', { groups: setGroups, navigation, route });
    };

    return (
        <SafeAreaView>
            <TextInput 
                style={ styles.inputField }
                onChangeText={text => setName(text)}
                value={name} 
                placeholder='Name of Group'
            />
            <CheckBox 
                title='Private'
                checked={isPrivate}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                onPress={ () => setPrivate(!isPrivate) }
            />
            <Text>Choose image</Text>
            <Text style={{ fontSize: 30 }}>Add friends</Text>
            <ScrollView style={ styles.listOfFriends }>
                {
                myFriends && myFriends.map(friend => <FriendCard key={friend.id} friend={ friend } setChosenFriends={setChosenFriends} chosenFriends={chosenFriends}/> )
                }
            </ScrollView>
            <Button 
                onPress={ createGroup }
                title='Create Group'
            />
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
    listOfFriends: {
        height: Dimensions.get('window').height / 1.7,
        borderTopColor: 'black',
        borderBottomColor: 'black',
        borderTopWidth: 1,
        borderBottomWidth: 1,
    }
});

export default CreateGroup;
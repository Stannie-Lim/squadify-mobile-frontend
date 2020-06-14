import axios from 'axios';
import { API_URL } from 'react-native-dotenv';
import React, {useState, useEffect} from 'react';
import { CheckBox } from 'react-native-elements';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button, AsyncStorage, ScrollView, Dimensions } from 'react-native';

//cards 
import FriendCard from '../../cards/FriendCard';

const CreateGroup = ({ route }: any) => {
    const [ name, setName ] = useState('');
    const [ isPrivate, setPrivate ] = useState(false);
    const [ myFriends, setFriends ] = useState([]);
    useEffect(() => {
        setFriends(route.params.friends);
    }, []);
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
            <ScrollView style={ styles.listOfFriends }>
            {
                myFriends && myFriends.map(friend => <FriendCard key={friend.id} friend={ friend } /> )
            }
            </ScrollView>
            <Button 
                onPress={ () => console.log(name, isPrivate) }
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
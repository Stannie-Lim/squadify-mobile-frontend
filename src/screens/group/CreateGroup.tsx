import { RNS3 } from 'react-native-aws3';
import React, {useState, useEffect} from 'react';
import { CheckBox } from 'react-native-elements';
import { AxiosHttpRequest } from '../../utils/axios';
import { API_URL, REGION, ACCESS_KEY_ID, SECRET_ACCESS_KEY } from 'react-native-dotenv'
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button, AsyncStorage, ScrollView, Dimensions } from 'react-native';

//cards 
import FriendCard from '../../cards/FriendCard';

//components 
import ChooseImage from '../auth/ChooseImage';

const CreateGroup = ({ navigation, route }: any) => {
    const [ name, setName ] = useState('');
    const [ isPublic, setPublic ] = useState(false);
    const [ chosenFriends, setChosenFriends ] = useState([]);
    const [ avatarUrl, setImage ] = useState('');

    // not used in api calls
    const [ myFriends, setFriends ] = useState([]);

    useEffect(() => {
        setFriends(route.params.friends);
    }, []);

    const createGroup = async () => {
        const { groups } = route.params;
        try {
            const file = {
                uri: avatarUrl,
                name: `${name}_group_avatar`, 
                type: 'image/jpg',
              };
              const config = {
                  keyPrefix: 'groups//',
                  bucket: 'squadify-avatars',
                  region: REGION,
                  accessKey: ACCESS_KEY_ID,
                  secretKey: SECRET_ACCESS_KEY
              };

            const url = (await RNS3.put(file, config)).body.postResponse.location;

            const newGroup = (await AxiosHttpRequest('POST', `${API_URL}/groups/create`, { name, isPublic, friendIds: chosenFriends, avatarUrl: url }))?.data;
            const setGroups = [...groups, newGroup.group];
            navigation.replace('Your Account', { groups: setGroups, navigation, route });
        } catch(err) {
            console.log(err);
        }
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
                title='Public'
                checked={isPublic}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                onPress={ () => setPublic(!isPublic) }
            />
            <ChooseImage setImage={setImage} />
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
        height: Dimensions.get('window').height / 2,
        borderTopColor: 'black',
        borderBottomColor: 'black',
        borderTopWidth: 1,
        borderBottomWidth: 1,
    }
});

export default CreateGroup;
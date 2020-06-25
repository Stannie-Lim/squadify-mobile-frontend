import { API_URL } from 'react-native-dotenv';
import React, {useState, useEffect} from 'react';
import { AxiosHttpRequest } from '../../utils/axios';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, AsyncStorage, RefreshControl } from 'react-native';

const GroupInvitations = () => {
    const [ sent, setSent ] = useState([]);
    const [ received, setReceived ] = useState([]);

    useEffect( () => {
        getInvites();
    }, []);

    const getInvites = async() => {
        const data = (await AxiosHttpRequest('GET', `${API_URL}/user/invitations`))?.data;
        setSent(data.sentInvitations);
        setReceived(data.receivedInvitations);
        console.log(data);
    };

    return (
        <ScrollView style={ styles.list }>
            <Text style={ styles.title }>Sent invites</Text>
            <View>
            {
                sent.length !== 0 && sent.map((user, index): any => 
                    <View key={ index }>
                        <Text>{user.group.name}</Text>
                        <Text>{user.inviter.email}</Text>
                    </View>
                )
            }
            </View>
            <Text style={ styles.title }>Received invites</Text>
            <View>
            {
                received.length !== 0 && received.map((user, index): any => 
                    <View key={ index }>
                        <Text>{ user.group.name }</Text>
                        <Text>{ user.inviter.email }</Text>
                    </View>
                )
            }
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    list: {
        height: Dimensions.get('window').height,
    },
    title: {
        fontSize: 30
    },
});

export default GroupInvitations;
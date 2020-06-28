import { API_URL } from 'react-native-dotenv';
import React, {useState, useEffect} from 'react';
import { AxiosHttpRequest } from '../../utils/axios';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, AsyncStorage, RefreshControl, Button } from 'react-native';

const GroupInvitations = () => {
    const [ sent, setSent ] = useState([]);
    const [ received, setReceived ] = useState([]);
    const [ refreshing, setRefreshing ] = useState(false);

    useEffect( () => {
        getInvites();
    }, []);

    const getInvites = async() => {
        const data = (await AxiosHttpRequest('GET', `${API_URL}/user/invitations`))?.data;
        setSent(data.sentInvitations);
        setReceived(data.receivedInvitations);
        console.log(data.receivedInvitations[0].inviter, '123123');
    };

    const respond = async(groupId: string, acceptordeny: boolean) => {
        acceptordeny ? 
          await AxiosHttpRequest('PUT', `${API_URL}/groups/invitations/${groupId}/accept`)
        : await AxiosHttpRequest('DELETE', `${API_URL}/groups/invitations/${groupId}/reject`);
        const temp = received.filter(group => group.group.id !== groupId);
        setReceived(temp);
    };

    const refresh = () => {
        setRefreshing(true);
        getInvites();
        setRefreshing(false);
      };
    
    return (
        <ScrollView 
            style={ styles.list }
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={refresh} 
                />
            }
        >
            <Text style={ styles.title }>Sent invites</Text>
            <View>
            {
                sent.length !== 0 && sent.map((user, index): any => 
                    <View key={ index }>
                        <Text>{user.group.name}</Text>
                        <Text>{user.user.email}</Text>
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
                        <Text>{ user.inviter ? user.inviter.email : '' }</Text>
                        <Button title="Accept invite" onPress={ () => respond(user.group.id, true) } />
                        <Button title="Decline invite" onPress={ () => respond(user.group.id, false) } />
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
        marginTop: 100
    },
    title: {
        fontSize: 30
    },
});

export default GroupInvitations;
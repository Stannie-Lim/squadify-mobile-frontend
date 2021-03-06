import { API_URL } from '../../secrets';
import React, { useState, useEffect } from 'react';
import { AxiosHttpRequest } from '../../utils/axios';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, AsyncStorage, RefreshControl, Button } from 'react-native';

const GroupInvitations = () => {
    const [sent, setSent] = useState([]);
    const [received, setReceived] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        getInvites();
    }, []);

    const getInvites = async () => {
        const data = (await AxiosHttpRequest('GET', `${API_URL}/user/invitations`))?.data;
        setSent(data.sentInvitations);
        setReceived(data.receivedInvitations);
    };

    const respond = async (groupId: string, acceptordeny: boolean) => {
        acceptordeny ?
            await AxiosHttpRequest('PUT', `${API_URL}/groups/invitations/${groupId}/accept`)
            : await AxiosHttpRequest('DELETE', `${API_URL}/groups/invitations/${groupId}/reject`);
        const temp = received.filter((group: any) => group.group.id !== groupId);
        setReceived(temp);
    };

    const refresh = () => {
        setRefreshing(true);
        getInvites();
        setRefreshing(false);
    };

    return (
        <ScrollView
            style={styles.list}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={refresh}
                />
            }
        >
            <Text style={styles.title}>Sent invites</Text>
            <View>
                {
                    sent.length !== 0 && sent.map((user: any, index: number) =>
                        <View key={index}>
                            <Text>{user.group.name}</Text>
                            <Text>{user.user.email}</Text>
                        </View>
                    )
                }
            </View>
            <Text style={styles.title}>Received invites</Text>
            <View>
                {
                    received.length !== 0 && received.map((user: any, index: number) =>
                        <View key={index}>
                            <Text>{user.group.name}</Text>
                            <Text>{user.inviter ? user.inviter.email : ''}</Text>
                            <Button title="Accept invite" onPress={() => respond(user.group.id, true)} />
                            <Button title="Decline invite" onPress={() => respond(user.group.id, false)} />
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
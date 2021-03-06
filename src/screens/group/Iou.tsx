import { API_URL } from '../../secrets'
import React, { useState, useEffect } from 'react';
import { MenuProvider } from 'react-native-popup-menu';
import { AxiosHttpRequest, getUser } from '../../utils/axios';
import { Button, StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, AsyncStorage, Modal, TextInput, RefreshControl } from 'react-native';

// components
import IouCard from '../../cards/IouCard';
import MeIouCard from '../../cards/MeIouCard';
import ChooseIouCard from '../../cards/ChooseIouCard';

const Iou = ({ group, user }: any) => {
    const [ious, setIous]: any = useState([]);
    const [chosen, setChosen] = useState([]);
    const [groupMembers, setGroupMembers] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [filterModal, setFilterModal] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    //inputs 
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

    const refresh = async () => {
        setRefreshing(true);
        await getIous();
        setRefreshing(false);
    };

    useEffect(() => {
        getIous();
        getGroupMembers();
    }, []);

    const getIous = async () => {
        try {
            const data = (await AxiosHttpRequest('GET', `${API_URL}/iou/group/${group.id}`))?.data;
            setIous(data);
        } catch (err) {
            console.log(err);
        }
    };

    const getGroupMembers = async () => {
        try {
            const data = (await AxiosHttpRequest('GET', `${API_URL}/groups/${group.id}/users`))?.data.filter((groupmember: any) => groupmember.id !== user.id);
            setGroupMembers(data);
        } catch (err) {
            console.log(err);
        }
    };

    const createIou = async () => {
        try {
            const data = (await AxiosHttpRequest('POST', `${API_URL}/iou/create/${group.id}`, { amount, payeeIds: chosen, description }))?.data;
            setChosen([]);
            setAmount('');
            setDescription('');
            setIous([...ious, data]);
            setModalVisible(false)
        } catch (err) {
            console.log(err);
        }
    };

    const colors = ['seagreen', 'purple', 'red', 'blue', 'tomato', 'dodgerblue', 'yellow'];
    return (
        <SafeAreaView>
            {
                user && <MeIouCard user={user} setModalVisible={setModalVisible} setFilterModal={setFilterModal} />
            }
            <ScrollView refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={refresh} />
            } style={{ height: Dimensions.get('window').height / 1.6 }}>
                {
                    ious.length ? ious.map((debt: any, index: number) => <IouCard key={index} color={colors[index]} debt={debt} />) : <Text style={{ textAlign: 'center', marginTop: 50, fontSize: 20 }}> No IOUs! Get Paying!</Text>
                }
            </ScrollView>
            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <SafeAreaView>
                    <Button onPress={() => {
                        setModalVisible(false)
                        setChosen([]);
                    }}
                        title="Cancel" />
                    <ScrollView style={styles.groupmates}>
                        {
                            groupMembers && groupMembers.map((member: any) => <ChooseIouCard key={member.id} friend={member} setChosenFriends={setChosen} chosenFriends={chosen} />)
                        }
                    </ScrollView>
                    <View>
                        <TextInput
                            keyboardType='numeric'
                            style={styles.numberInput}
                            onChangeText={text => setAmount(text)}
                            value={amount}
                            placeholder='Amount'
                        />
                        <TextInput
                            style={styles.numberInput}
                            onChangeText={text => setDescription(text)}
                            value={description}
                            placeholder='Description'
                            multiline={true}
                        />
                        <Button title="Create IOU" onPress={createIou} />
                    </View>
                </SafeAreaView>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    groupmates: {
        height: Dimensions.get('window').height / 3,
        borderWidth: 1,
        borderColor: "black",
    },
    inputField: {
        height: 40,
        borderBottomWidth: 2,
        borderColor: 'lightseagreen',
        fontSize: 20,
        marginBottom: 30,
    },
    numberInput: {
        textAlign: 'center',
        height: 40,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#009688',
        marginBottom: 10
    },
    filtermodal: {
        height: Dimensions.get('window').height / 3,
        borderColor: 'black',
        borderWidth: 2,
    }
});

export default Iou;
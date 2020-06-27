import { API_URL } from 'react-native-dotenv'
import React, { useState, useEffect } from 'react';
import { AxiosHttpRequest, getUser } from '../../utils/axios';
import { Button, StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, AsyncStorage, Modal, TextInput } from 'react-native';

// components
import IouCard from '../../cards/IouCard';
import ChooseIouCard from '../../cards/ChooseIouCard';

const Iou = ({ group }: any) => {
    const [ user, setUser ] = useState({});
    const [ ious, setIous ]: any = useState([]);
    const [ chosen, setChosen ] = useState([]);
    const [ description, setDescription ] = useState('');
    const [ groupMembers, setGroupMembers ] = useState([]);
    const [ modalVisible, setModalVisible ] = useState(false);

    //inputs 
    const [ amount, setAmount ] = useState(0);

    useEffect(() => {
        getUserFromDb();
        getIous();
        getGroupMembers();
    }, []);

    const getUserFromDb = async() => {
        try { 
            await getUser(setUser);
        } catch(err) {
            console.log(err);
        }
    }

    const getIous = async() => {
        try {
            const data = (await AxiosHttpRequest('GET', `${API_URL}/iou/group/${group.id}`))?.data;
            setIous(data);
        } catch(err) {
            console.log(err);
        }
    };

    const getGroupMembers = async() => {
        try {
            const data = (await AxiosHttpRequest('GET', `${API_URL}/groups/${group.id}/users`))?.data;
            setGroupMembers(data);
        } catch(err) {
            console.log(err);
        }
    };

    const createIou = async() => {
        try {
            const data = (await AxiosHttpRequest('POST', `${API_URL}/iou/create/${group.id}`, { amount, payeeIds: chosen, description }))?.data;
            setIous([...ious, data.iou.raw[0]]);
        } catch(err) {
            console.log(err);
        }
    };

    const you = {
        payer: {...user},
        me: true,
    };
    const colors = ['seagreen', 'purple', 'red', 'blue', 'tomato', 'dodgerblue', 'yellow'];
    return (
        <SafeAreaView>
            {
                you && <IouCard user={ you } setModalVisible={ setModalVisible } />
            } 
            <ScrollView style={{ height: Dimensions.get('window').height / 1.8, }}>  
                {
                    ious && ious.map((user, index) => <IouCard key={ index } color={ colors[index] } user={ user } /> )
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
                    <Button onPress={ () => {
                        setModalVisible(false) 
                        setChosen([]);
                    }} 
                    title="Cancel"/> 
                    <ScrollView style={ styles.groupmates }>
                    {
                        groupMembers.map( member => <ChooseIouCard key={ member.id } friend={ member } setChosenFriends={ setChosen } chosenFriends={ chosen } /> )
                    }
                    </ScrollView>
                    <View>
                        <TextInput 
                            keyboardType='numeric'
                            style={styles.numberInput}
                            onChangeText={text => setAmount(Number(text))}
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
                        <Button title="Create IOU" onPress={ createIou } />
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
    }  
}); 

export default Iou;
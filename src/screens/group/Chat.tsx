import io from 'socket.io-client'
import { API_URL } from '../../secrets'
import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat'
import { AxiosHttpRequest } from '../../utils/axios';
import { Dimensions, ScrollView, StyleSheet, Text, View, SafeAreaView, TextInput, Button } from 'react-native';


const Chat = ({ navigation, route }: any) => {
    const [value, setValue] = useState('');
    const [messages, setMessages] = useState([])

    const { group, user } = route.params
    const getMessages = async () => {
        let messages = (await AxiosHttpRequest('GET', `${API_URL}/groups/chat/${group.id}/messages`))?.data
        if (messages) {
            messages = messages.map((message: any) => {
                return {
                    _id: message.id,
                    text: message.text,
                    createdAt: message.createdAt,
                    user: {
                        _id: message.user.id,
                        name: message.user.firstName.split('#')[0],
                        avatar: message.user.avatarUrl
                    }
                }
            })
            setMessages(messages)
        }
    }
    useEffect(() => {
        getMessages()
        const socket = io(API_URL)
        socket.on('message', (response: any) => {
            if (response.groupId === group.id && response.user.id !== user.id) {
                const message: any = [{
                    _id: response.message.id,
                    text: response.message.text,
                    createdAt: response.message.createdAt,
                    user: {
                        _id: response.user.id,
                        name: response.user.firstName.split('#')[0],
                        avatar: response.user.avatarUrl
                    }
                }]
                setMessages(previousMessages => GiftedChat.append(previousMessages, message))
            }
        })
    }, [])
    const onSend = useCallback((messages = []) => {
        messages.forEach(async (message: any) => {
            await AxiosHttpRequest('POST', `${API_URL}/groups/chat/${group.id}`, { text: message.text })
        })
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: user.id
            }}
        />
    );
};

const styles = StyleSheet.create({
    inputField: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
    },
    messages: {
        height: Dimensions.get('window').height / 1.3,
        borderColor: 'gray',
        borderWidth: 1,
    }
});

export default Chat;
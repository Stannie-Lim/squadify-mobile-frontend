import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput } from 'react-native';

const Chat = () => {
    const [ value, setValue ] = useState('');
    return (
        <SafeAreaView>
            <TextInput 
            style={ styles.inputField }
            onChangeText={text => setValue(text)}
            value={value} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    inputField: {
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
    },
});

export default Chat;
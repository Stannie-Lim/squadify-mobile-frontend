import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button } from 'react-native';

const ChooseImage = () => {
    return (
        <SafeAreaView>
            <Text>Choose image</Text>
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

export default ChooseImage;
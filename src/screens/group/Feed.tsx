import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button } from 'react-native';

const Feed = () => {
    return (
        <SafeAreaView>
            <Text>Feed</Text>
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

export default Feed;
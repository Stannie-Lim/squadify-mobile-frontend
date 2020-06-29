import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, Image, TouchableOpacity } from 'react-native';

const FriendCard = ({ friend, chosenFriends, setChosenFriends }: any) => {
    const [selected, setSelected] = useState(false);

    const select = () => {
        selected ? setSelected(false) : setSelected(true);
        if (!chosenFriends.includes(friend.id)) {
            setChosenFriends([...chosenFriends, friend.id])
        } else {
            const filterFriends = chosenFriends.filter((chosen: any) => chosen !== friend.id);
            setChosenFriends(filterFriends);
        }
    };

    const imageUri = friend.avatarUrl !=null ? friend.avatarUrl : ""

    return (
        <TouchableOpacity onPress={select} style={selected ? styles.selected : styles.container}>
            <Image source={imageUri.length !== 0 ? { uri: friend.avatarUrl } : null} style={styles.avatar} />
            <Text>{friend.firstName.split('#')[0]} {friend.lastName}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 10,
        borderColor: 'black',
        borderWidth: 1,
        height: Dimensions.get('window').height / 15,
        borderRadius: 10,
        marginBottom: 10,
        padding: 15
    },
    avatar: {
        height: 50,
        width: 50,
        borderRadius: 50,
    },
    selected: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 10,
        borderColor: 'black',
        borderWidth: 1,
        height: Dimensions.get('window').height / 15,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: 'tomato',
        padding: 4
    }
});

export default FriendCard;
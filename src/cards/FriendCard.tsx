import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, Image, TouchableOpacity } from 'react-native';

const FriendCard = ({ friend }: any) => {
    const [ selected, setSelected ] = useState(false);

    const select = () => {
        selected ? setSelected(false) : setSelected(true);
    };

    return (
        <TouchableOpacity onPress={ select } style={ selected ? styles.selected : styles.container }>
            <Image source={{ uri: friend.avatarUrl }} style={ styles.avatar } />
            <Text>{friend.firstName}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        margin: 10,
        borderColor: 'black',
        borderWidth: 1,
        height: Dimensions.get('window').height / 15,
        borderRadius: 10,
        marginBottom: 50
    },
    avatar: {
        height: 50,
        width: 50,
        borderRadius: 50,
    }, 
    selected: {
        alignItems: 'center',
        flexDirection: 'row',
        margin: 10,
        borderColor: 'black',
        borderWidth: 1,
        height: Dimensions.get('window').height / 15,
        borderRadius: 10,
        marginBottom: 50,
        backgroundColor: 'tomato',
    }
});

export default FriendCard;
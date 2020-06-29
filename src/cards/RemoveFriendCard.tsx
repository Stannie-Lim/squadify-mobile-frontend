import React from 'react';
import Swipeout from 'react-native-swipeout';
import { Text, Image, StyleSheet, Dimensions, View } from 'react-native';

const RemoveFriendCard = ({ friend, deleteFriend }: any) => {

    let swipeBtns = [{
        text: 'Remove',
        backgroundColor: 'red',
        onPress: () => deleteFriend(`${friend.firstName} ${friend.lastName}`, friend.email, friend.id)
    }];

    const imageUri = friend.avatarUrl !== null ? friend.avatarUrl : ""

    return (
        <Swipeout
            right={swipeBtns}
            backgroundColor='transparent'>
            <View style={styles.container}>
                <Image source={imageUri.length !== 0 ? { uri: friend.avatarUrl } : null } style={styles.avatar} />
                <Text style={{ fontSize: 20 }} key={friend.id}>{friend.firstName.split('#')[0]} {friend.lastName.split('#')[0]} #{friend.lastName.split('#')[1]}</Text>
            </View>
        </Swipeout>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        height: Dimensions.get('window').height / 15,
        borderStyle: 'solid',
        borderTopColor: 'lightgray',
        borderTopWidth: 1
    },
    avatar: {
        height: 50,
        width: 50,
        borderRadius: 50,
        marginLeft: 10,
        marginRight: 10
    },
});

export default RemoveFriendCard;
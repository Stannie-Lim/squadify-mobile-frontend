import React from 'react';
import Swipeout from 'react-native-swipeout';
import { Text, Image, StyleSheet, Dimensions, View } from 'react-native';

const RemoveFriendCard = ({ friend, deleteFriend }: any) => {

    let swipeBtns = [{
        text: 'Remove',
        backgroundColor: 'red',
        onPress: () => deleteFriend(`${friend.firstName} ${friend.lastName}`, friend.email, friend.id)
    }];

    return (
        <Swipeout
            right={swipeBtns}
            backgroundColor= 'transparent'>
                <View
                    style={ styles.container }    
                >
                    <Image source={{ uri: friend.avatarUrl }} style={ styles.avatar } />
                    <Text style={{ fontSize: 20 }} key={friend.id}>{friend.firstName} {friend.lastName}</Text>
                </View>
        </Swipeout>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: 'black',
        borderWidth: 1,
        height: Dimensions.get('window').height / 15,
        borderRadius: 10,
    },
    avatar: {
        height: 50,
        width: 50,
        borderRadius: 50,
    }, 
});

export default RemoveFriendCard;
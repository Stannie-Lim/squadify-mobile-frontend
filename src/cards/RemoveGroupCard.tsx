import React from 'react';
import Swipeout from 'react-native-swipeout';
import { StyleSheet, TouchableOpacity, Image, Text } from 'react-native';


const RemoveGroupCard = ({ group, navigation, deleteGroup }: any) => {
    let swipeBtns = [{
        text: 'Remove',
        backgroundColor: 'red',
        onPress: () => deleteGroup(group.id)
    }];

    const imageUri = group.avatarUrl !== null ? group.avatarUrl : ""

    return (
        <Swipeout
            right={swipeBtns}
            backgroundColor='transparent'>
            <TouchableOpacity
                style={styles.container}
                onPress={() => navigation.navigate('Group', { group })}
            >
            <Image source={imageUri.length !== 0 ?{ uri: group.avatarUrl } : null } style={styles.avatar} />
            <Text style={group.isPrivate ? styles.private : styles.public}>{group.name}</Text>
            </TouchableOpacity>
        </Swipeout>
    );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      padding: 20,
    },
    private: {
      color: "tomato",
      fontSize: 30,
    },
    public: {
      color: 'dodgerblue',
      fontSize: 30,
    },
    avatar: {
      height: 100,
      width: 100,
      borderRadius: 50,
    },
});

export default RemoveGroupCard;
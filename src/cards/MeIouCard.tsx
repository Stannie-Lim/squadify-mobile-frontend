import React from 'react';
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';

const MeIouCard = ({ user, setModalVisible, setFilterModal }: any) => {
    return (
        <View style={ styles.youcontainer }>
            <View style={ styles.owe }>
                <TouchableOpacity onPress={ () => setFilterModal(true) }>
                <Text style={ styles.bar }>Filter</Text>
                    </TouchableOpacity>
                <TouchableOpacity onPress={ () => setModalVisible(true) }>
                    <MaterialIcons size={100} name='add-circle-outline' style={ styles.bar } />
                </TouchableOpacity>
            </View>
            <Image style={ styles.avatar } source={{ uri: user.avatarUrl }} /> 
            <Text style={ styles.name }>{`${user.firstName} ${user.lastName}`}</Text>
            <View style={ styles.owe }>
                <View style={ styles.owes }>
                    {/* <Text>YOU PAID OTHERS</Text> */}
                    {/* <Text style={ styles.oweText }>{ `$${ totalowed }` }</Text> */}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    youcontainer: {
        borderColor: 'black',
        borderWidth: 1,
        padding: 5,
        backgroundColor: 'grey',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,
        elevation: 18,
    },
    container: {
        borderColor: 'black',
        borderWidth: 1,
        margin: 40,
        padding: 30,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,
        elevation: 18,
        borderRadius: 20,
    },
    avatar: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },
    name: {
        fontSize: 30,
    },
    owe: {
        flexDirection: 'row',
    },
    owes: {
        alignItems: 'center',
        marginLeft: 80,
        marginRight: 80,
    },
    oweText: {
       fontSize: 30,
    },
    bar: {
        fontSize: 20,
        marginLeft: 130,
        marginRight: 130,
        color: 'white',
    }
});

export default MeIouCard;
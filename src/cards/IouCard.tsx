import React, { useState, useEffect } from 'react';
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';

const IouCard = ({ user, color, setModalVisible }: any) => {
    const you = user.me;
    return (
        <View style={ you ? styles.youcontainer : {...styles.container, backgroundColor: color} }>
            {
                you ? 
                <View style={ styles.owe }>
                    <TouchableOpacity onPress={ () => alert('filter') }>
                    <Text style={ styles.bar }>Filter</Text>
                        </TouchableOpacity>
                    <TouchableOpacity onPress={ () => setModalVisible(true) }>
                        <MaterialIcons size={100} name='add-circle-outline' style={ styles.bar } />
                    </TouchableOpacity>
                </View> : 
                <Text></Text>
            }
            { user.payer ? <Image style={ styles.avatar } source={{ uri: user.payer.avatarUrl }} /> : <Text></Text> }
            { user.payer ? <Text style={ styles.name }>{`${user.payer.firstName} ${user.payer.lastName}`}</Text> : <Text></Text> }
            {
                you ? 
                <View style={ styles.owe }>
                    <View style={ styles.owes }>
                        <Text>YOU OWE OTHERS</Text>
                        {/* <Text style={ styles.oweText }>{ `$${ totalowed }` }</Text> */}
                    </View>
                </View>
                : 
                <View style={ styles.owe }>
                    <View style={ styles.owes }>
                        <Text>OWE YOU</Text>
                        <Text style={ styles.oweText }>{ `$${ user.amount }` }</Text>
                        <Text>{ `${ user.description }` }</Text>
                    </View>
                </View>
            }
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

export default IouCard;
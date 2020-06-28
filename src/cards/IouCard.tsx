import React from 'react';
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';

const IouCard = ({ debt, color }: any) => {
    return (
        <View style={{...styles.container, backgroundColor: color} }>
            <Image style={ styles.avatar } source={{ uri: debt.payer[0].avatarUrl }} />
            <Text>{ `${debt.payer[0].firstName} ${debt.payer[0].lastName}` }</Text>
            <Text>{ debt.description }</Text>
            <Text>{ debt.createdAt }</Text>
            <Text>${debt.amount} paid to</Text>
            {
                debt.payees && debt.payees.map((payee: any, index: number) => <Text key={ index }>{ payee.email }</Text> )
            }
        </View>
    );
};

const styles = StyleSheet.create({
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
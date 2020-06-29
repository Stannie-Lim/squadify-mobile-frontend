import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import moment from 'moment';

const IouCard = ({ debt, color }: any) => {
    const imageUri = debt.payer.avatarUrl !== null || debt.payer[0].avatarUrl !== null ? `${debt.payer.avatarUrl}${debt.payer[0].avatarUrl}` : ""
    return (
        <View style={{ ...styles.container, backgroundColor: color }}>
            <Image style={styles.avatar} source={imageUri.length !== 0 ? { uri: debt.payer[0] ? debt.payer[0].avatarUrl : debt.payer.avatarUrl } : null} />
            <Text>{`${debt.payer[0] ? debt.payer[0].firstName.split('#')[0] : debt.payer.firstName.split('#')[0]} ${debt.payer[0] ? debt.payer[0].lastName.split('#')[0] : debt.payer.lastName.split('#')[0]}`}</Text>
            <Text>Paid ${debt.amount ? debt.amount : debt.iou.amount} to: </Text>
            {
                debt.payees && debt.payees.map((payee: any, index: number) => <Text key={index}>{payee.firstName.split('#')[0]}</Text>)
            }
            <Text>for: {debt.description ? debt.description : debt.iou.description}</Text>
            <Text>on: {debt.createdAt ? moment(debt.createdAt).format('MMMM Do YYYY, hh:m A') : moment(debt.iou.createdAt).format('MMMM Do YYYY, hh:m A')}</Text>
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
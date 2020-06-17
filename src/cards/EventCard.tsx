import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions } from 'react-native';

const EventCard = ({ event }: any) => {
    return (
        <View style={ styles.container }>
            <Text style={{ fontSize: 30 }}>{ event.name }</Text>
            <Text>{ event.description }</Text>
            <Text>{ new Date(event.startTime).toDateString() }</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 10,
        borderColor: 'black',
        borderWidth: 1,
        width: Dimensions.get('window').width - 30,
        height: Dimensions.get('window').height / 3.5,
        borderRadius: 20,
        marginBottom: 50
    },
});

export default EventCard;
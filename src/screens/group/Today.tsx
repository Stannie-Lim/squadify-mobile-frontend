import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions } from 'react-native';

// components
import EventCard from '../../cards/EventCard';

const Today = () => {
    const today = new Date();
    const events = [];
    for(let i = 0; i < 20; i++) events.push({ name: 'Cool event', description: 'This is cool', dateAndTime: today, isPrivate: true, isFinished: false });
    return (
        <View>
            <View style={ styles.top }>
                <Text style={{ fontSize: 30 }}>Today's Events</Text>
                <Text style={{ fontSize: 20 }}>{today.toDateString()}</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                <ScrollView style={{ height: Dimensions.get('window').height / 3.5, }}>
                    {
                        events.map((event, index) => <EventCard key={ index } event={ event } /> )
                    }
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    top: {
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'grey',
    }
});

export default Today;
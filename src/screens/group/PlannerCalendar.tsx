import React from 'react';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { StyleSheet, Text, View, SafeAreaView, Dimensions } from 'react-native';

// components
import Today from './Today';

const PlannerCalendar = ({ navigation, group }: any) => {
    const goToMap = (date: any) => {
        navigation.navigate('PlannerMap', { date })
    };

    return (
        <SafeAreaView>
            <View style={ styles.center }>
                <Text style={ styles.text }>Planner</Text>
            </View>
            <Calendar 
                onDayPress={goToMap}
            />
            <Today group={ group }/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    center: {
        alignItems: 'center',
    },
    text: {
        fontSize: 50,
    },
});

export default PlannerCalendar;
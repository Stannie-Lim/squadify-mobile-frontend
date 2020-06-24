import React, { useState } from 'react';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, Modal } from 'react-native';

// components
import Today from './Today';
import TodayEventMap from './TodayEventMap';

const PlannerCalendar = ({ route, navigation, group }: any) => {
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ pressedDate, setDate ] = useState('');
    const goToMap = (date: any) => {
        setDate(date.dateString);
        setModalVisible(true);
    };

    return (
        <SafeAreaView>
            <View style={ styles.center }>
                <Text style={ styles.text }>Planner</Text>
            </View>
            <Calendar 
                onDayPress={goToMap}
            />
            <Today route={ route } group={ group } navigation={ navigation } />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >  
                <TodayEventMap group={ group } date={ pressedDate } setModalVisible={ setModalVisible } />
            </Modal>
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
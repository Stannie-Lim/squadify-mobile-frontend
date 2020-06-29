import React, { useState, useEffect } from 'react';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, Modal } from 'react-native';

// components
import Today from './Today';
import TodayEventMap from './TodayEventMap';
import { AxiosHttpRequest } from '../../utils/axios';
import { API_URL } from '../../secrets';
import moment from 'moment';
import Details from './Details';

const PlannerCalendar = ({ route, navigation, group }: any) => {
    const [showEventDetailModal, setShowEventDetailModal] = useState(false);
    const [showTodayModal, setShowTodayModal] = useState(false)
    const [pressedDate, setDate] = useState('');
    const [marked, setMarked] = useState({});
    const [events, setEvents] = useState([]);

    const getEvents = async () => {
        const groupEvents = (await AxiosHttpRequest('GET', `${API_URL}/event/group_events/${group.id}`))?.data;
        setMarked(groupEvents.reduce((acc: any, now: any) => {
            acc[moment(now.startTime).format('YYYY-MM-DD')] = {
                marked: true,
                selectedColor: 'blue'
            };
            return acc;
        }, {}));
        setEvents(groupEvents);
    };

    useEffect(() => {
        getEvents()
    }, [])

    const showDetails = ({ dateString }: any) => {
        setDate(dateString);
        setShowEventDetailModal(true);
    };

    return (
        <SafeAreaView style={{ marginTop: 100 }}>
            <Calendar
                markedDates={marked}
                onDayPress={showDetails}
            />
            <Today showTodayModal={showTodayModal} setShowTodayModal={setShowTodayModal} route={route} group={group} navigation={navigation} />
            <Modal
                animationType="slide"
                visible={showTodayModal}
                onRequestClose={() => {
                    setShowTodayModal(false);
                }}
            >
                <Today showTodayModal={showTodayModal} setShowTodayModal={setShowTodayModal} route={route} group={group} navigation={navigation} />
            </Modal>
            <Modal
                animationType="slide"
                visible={showEventDetailModal}
                onRequestClose={() => {
                    setShowEventDetailModal(false);
                }}
            >
                <Details date={pressedDate} setShowModal={setShowEventDetailModal} />
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
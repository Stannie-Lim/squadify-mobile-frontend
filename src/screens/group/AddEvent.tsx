import moment from 'moment';
import { API_URL } from '../../secrets';
import { CheckBox } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { AxiosHttpRequest } from '../../utils/axios';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button, Dimensions, AsyncStorage, ImageBackground, Image } from 'react-native';

// components 
import SetLocation from './SetLocation';

// styles
const bg = require('../../../assets/images/event.jpg');

// icons
import { AntDesign, FontAwesome, Entypo, Feather } from '@expo/vector-icons';

const AddEvent = ({ navigation, route }: any) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [dateOfEvent, setDate] = useState('');
    const [timeOfEvent, setTime] = useState('');
    const [addressOfEvent, setAddress] = useState('');
    const [coordsOfEvent, setCoords] = useState({});
    const [isPublic, setPublic] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const disabled = !(name && description && dateOfEvent && timeOfEvent && addressOfEvent.length !== 0);

    useEffect(() => {
        if (route.state.routes[2].params) {
            const address = route.state.routes[2].params.address;
            const pinnedLocation = route.state.routes[2].params.pinnedLocation;
            setAddress(address);
            setCoords(pinnedLocation);
        }
    });

    const handleDate = (dateObj: any) => {
        setDate(dateObj);
        setDatePickerVisibility(false);
    };

    const handleTime = (timeObj: any) => {
        setTime(timeObj);
        setTimePickerVisibility(false);
    };

    const createEvent = async () => {
        const { group } = route.params;
        const date = moment(dateOfEvent).format('YYYY-MM-DD');
        const time = moment(timeOfEvent).format('HH:mm:ss');
        const startTime = new Date(`${date}T${time}Z`);
        const now = new Date();
        if (startTime < now) alert('Cannot create an event in the past!');
        else {
            try {
                const data = (await AxiosHttpRequest('POST', `${API_URL}/event/create`, { name, description, isPrivate: !isPublic, startTime, address: addressOfEvent, coordsOfEvent }))?.data;
                await AxiosHttpRequest('POST', `${API_URL}/event/assign_group/${group.id}`, { eventId: data.event.id });

                setName('');
                setDescription('');
                setDate('');
                setTime('');
                setAddress('');
                setCoords({});
                setPublic(false);
                navigation.navigate('Group', { newEvent: data.event });
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <ImageBackground source={bg} style={styles.image}>
            <SafeAreaView>
                <Text style={styles.title}>Create New Event</Text>
                <TextInput
                    style={styles.inputField}
                    onChangeText={text => setName(text)}
                    value={name}
                    placeholder='Name of Event'
                    placeholderTextColor="white"
                />
                <TextInput
                    style={styles.inputField}
                    onChangeText={text => setDescription(text)}
                    value={description}
                    placeholder='Description'
                    placeholderTextColor="white"
                />

                <TextInput
                    style={styles.inputField}
                    value={dateOfEvent}
                    placeholder='Date'
                    placeholderTextColor="white"
                >{dateOfEvent && moment(dateOfEvent).format('dddd, MMMM Do YYYY')}</TextInput>
                <Button title="Set Date" onPress={() => setDatePickerVisibility(true)} />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleDate}
                    onCancel={() => setDatePickerVisibility(false)}
                />
                <TextInput
                    style={timeOfEvent ? styles.inputField : styles.blank}
                    value={timeOfEvent}
                    placeholder='Time'
                    placeholderTextColor="#5c5c5c"
                >{timeOfEvent && moment(timeOfEvent).format('LT')}</TextInput>
                <Button title="Set Time" onPress={() => setTimePickerVisibility(true)} />
                <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode="time"
                    onConfirm={handleTime}
                    onCancel={() => setTimePickerVisibility(false)}
                />

                <Text>{addressOfEvent}</Text>
                <Button title='Choose Location' onPress={() => navigation.navigate('Set Location')} />

                <CheckBox
                    title='Public'
                    checked={isPublic}
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    onPress={() => setPublic(!isPublic)}
                />

                <Button title='Create event' onPress={createEvent} disabled={disabled} />
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    inputField: {
        height: 40,
        borderBottomWidth: 2,
        borderColor: 'white',
        fontSize: 20,
        marginBottom: 10,
        width: 350,
        alignSelf: "center",
        textAlign: 'center',
        marginTop: 10,
    },
    blank: {
        opacity: 100,
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        opacity: 1
    },
    title: {
        fontSize: 40,
        textAlign: "center",
        marginBottom: 100,
        backgroundColor: '#FFFFFF50',
        width: 370,
        height: 100,
        alignSelf: "center",
        borderRadius: 10,
        overflow: 'hidden',
    },
    button: {
        textAlign: "center",
        backgroundColor: '#FFFFFF50',
        alignSelf: "center",
        borderRadius: 10,
        overflow: 'hidden',
    },
});

export default AddEvent;
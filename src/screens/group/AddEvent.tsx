import moment from 'moment';
import { API_URL } from 'react-native-dotenv';
import { CheckBox } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { AxiosHttpRequest } from '../../utils/axios';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button, Dimensions, AsyncStorage } from 'react-native';

// components 
import SetLocation from './SetLocation';

const AddEvent = ({ navigation, route }: any) => {
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ dateOfEvent, setDate ] = useState('');
    const [ timeOfEvent, setTime ] = useState('');
    const [ addressOfEvent, setAddress ] = useState('');
    const [ coordsOfEvent, setCoords ] = useState({});
    const [ isPrivate, setPrivate ] = useState(false);
    const [ isDatePickerVisible, setDatePickerVisibility ] = useState(false);
    const [ isTimePickerVisible, setTimePickerVisibility ] = useState(false);
    const disabled = !(name && description && dateOfEvent && timeOfEvent && addressOfEvent.length !== 0);

    useEffect(() => {
        if(route.state.routes[2].params) {
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

    const createEvent = async() => {
        const { group } = route.params;
        const date = moment(dateOfEvent).format('YYYY-MM-DD');
        const time = moment(timeOfEvent).format('HH:mm:ss');
        const startTime = new Date(`${date}T${time}Z`);
        const now = new Date();
        if(startTime < now) alert('Cannot create an event in the past!');
        else {
            try {
                const data = (await AxiosHttpRequest('POST', `${API_URL}/event/create`, { name, description, isPrivate, startTime, addressOfEvent, coordsOfEvent }))?.data;

                await AxiosHttpRequest('POST', `${API_URL}/event/assign_group/${group.id}`, { eventId: data.event.id });

                setName('');
                setDescription('');
                setDate('');
                setTime('');
                setAddress('');
                setCoords({});
                setPrivate(false);
                navigation.navigate('Planner', { newEvent: data.event });
            } catch(err) {
                console.log(err);
            }
        }
    };

    return (
        <SafeAreaView>
            <TextInput 
                style={styles.inputField} 
                onChangeText={ text => setName(text) } 
                value={ name } 
                placeholder='Name of Event'
            />
            <TextInput 
                style={styles.inputField} 
                onChangeText={ text => setDescription(text) } 
                value={ description } 
                placeholder='Description'
            />

            <Text>{moment(dateOfEvent).format('dddd, MMMM Do YYYY')}</Text>
            <Button title="Set Date" onPress={ () => setDatePickerVisibility(true) } />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDate}
                onCancel={ () => setDatePickerVisibility(false) }
            />

            <Text>{moment(timeOfEvent).format('LT')}</Text>
            <Button title="Set Time" onPress={ () => setTimePickerVisibility(true)} />
            <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleTime}
                onCancel={ () => setTimePickerVisibility(false) }
            />

            <Text>{addressOfEvent}</Text>
            <Button title='Choose Location' onPress={ () => navigation.navigate('Set Location') } />

            <CheckBox 
                title='Private'
                checked={isPrivate}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                onPress={ () => setPrivate(!isPrivate) }
            />

            <Button title='Create event' onPress={ createEvent } disabled={ disabled } />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    inputField: {
      height: 40, 
      borderBottomWidth: 2,
      borderColor: 'lightseagreen', 
      fontSize: 20,
      marginBottom: 10,
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

export default AddEvent;
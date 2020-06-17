import moment from 'moment';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { API_URL } from 'react-native-dotenv';
import { CheckBox } from 'react-native-elements';
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
        const userId = await AsyncStorage.getItem('id');
        const token = await AsyncStorage.getItem('token');
        console.log(token);
        const date = moment(dateOfEvent).format('YYYY-MM-DD');
        const time = moment(timeOfEvent).format('HH:mm:ss');
        const startTime = new Date(`${date}T${time}Z`);
        const data = (await axios.post(`${API_URL}/event/${group.id}`, { userId, name, description, isPrivate, startTime, addressOfEvent, coordsOfEvent }, { headers: {Authorization: token }})).data;
        console.log(data);
        setName('');
        setDescription('');
        setDate('');
        setTime('');
        setAddress('');
        setCoords({});
        setPrivate(false);
        // navigation.navigate('');
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
import moment from 'moment';
import { API_URL } from 'react-native-dotenv';
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
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ dateOfEvent, setDate ] = useState('');
    const [ timeOfEvent, setTime ] = useState('');
    const [ addressOfEvent, setAddress ] = useState('');
    const [ coordsOfEvent, setCoords ] = useState({});
    const [ isPublic, setPublic ] = useState(false);
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
            } catch(err) {
                console.log(err);
            }
        }
    };

    return (
        <ImageBackground source={bg} style={styles.image}>
            <SafeAreaView style={{ marginTop: 100}}>
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
                    title='Public'
                    checked={isPublic}
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    onPress={ () => setPublic(!isPublic) }
                />

                <Button title='Create event' onPress={ createEvent } disabled={ disabled } />
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    inputField: {
      height: 40, 
      borderBottomWidth: 2,
      borderColor: 'lightseagreen', 
      fontSize: 20,
      marginBottom: 10,
      width: 350,
      alignSelf: "center",
      textAlign: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

export default AddEvent;
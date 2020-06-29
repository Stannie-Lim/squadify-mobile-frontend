import moment from 'moment';
import { API_URL } from '../../secrets';
import { CheckBox } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { AxiosHttpRequest } from '../../utils/axios';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button, Dimensions, AsyncStorage, ImageBackground, Image, TouchableOpacity } from 'react-native';

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
        if(disabled) {
            alert("Please fill out all fields!");
            return;
        }
        if (startTime < now) alert('Cannot create an event in the past!');
        else {
            try {
                const data = (await AxiosHttpRequest('POST', `${API_URL}/event/create`, { name, description, isPrivate: !isPublic, startTime, address: addressOfEvent, coordsOfEvent }))?.data;
                await AxiosHttpRequest('POST', `${API_URL}/event/assign_group/${group.id}`, { eventId: data.event.id });
                
                setName('');
                setDescription('');
                setDate('');
                setTime('');
                setCoords({});
                setPublic(false);
                setAddress('');
                navigation.navigate('Group', { newEvent: data.event });
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <ImageBackground source={bg} style={styles.image}>
            <SafeAreaView>
                <View style={styles.title}>
                    <Text style={ styles.titletext }>Create New Event</Text>
                </View>
                <TextInput
                    style={styles.inputField}
                    onChangeText={text => setName(text)}
                    value={name}
                    placeholder='Name of Event'
                    placeholderTextColor="white"
                    maxLength={18}
                />
                <TextInput
                    style={styles.inputField}
                    onChangeText={text => setDescription(text)}
                    value={description}
                    placeholder='Description'
                    placeholderTextColor="white"
                />
                
                <View style={ styles.timedateview }>
                    <TouchableOpacity style={ styles.touchable } onPress={() => setDatePickerVisibility(true)}>
                        <Text style={ styles.timedate }>{ dateOfEvent.length === 0 ? 'Date' : moment(dateOfEvent).format('YYYY-MM-DD') }</Text>
                    </TouchableOpacity>
                </View>

                <View style={ styles.timedateview }>
                    <TouchableOpacity style={ styles.touchable } onPress={() => setTimePickerVisibility(true)}>
                        <Text style={ styles.timedate }>{ timeOfEvent.length === 0 ? 'Time' : moment(timeOfEvent).format('LT') }</Text>
                    </TouchableOpacity>
                </View>

                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleDate}
                    onCancel={() => setDatePickerVisibility(false)}
                />

                <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode="time"
                    onConfirm={handleTime}
                    onCancel={() => setTimePickerVisibility(false)}
                />

                <View style={ styles.timedateview }>
                    <TouchableOpacity style={ styles.touchable } onPress={() => navigation.navigate('Set Location')}>
                        <Text style={ styles.timedate }>{ addressOfEvent.length === 0 ? 'Choose Location' : addressOfEvent }</Text>
                    </TouchableOpacity>
                </View>

                <View style={ styles.checkboxcontainer}>
                    <View style={ styles.checkbox }>
                        <CheckBox
                            title='Public'
                            checked={isPublic}
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            onPress={() => setPublic(!isPublic)}
                        />
                    </View>
                </View>

                <View style={ styles.center }>
                    <TouchableOpacity style={ styles.createContainer } onPress={createEvent} disabled={disabled}>
                        <Text style={ styles.createEvent }>Create event</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    inputField: {
        fontSize: 20,
        height: 40,
        borderBottomWidth: 2,
        borderColor: 'white',
        marginBottom: 10,
        width: 350,
        alignSelf: "center",
        textAlign: 'center',
        marginTop: 10,
        color: 'white',
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
        marginBottom: 5,
        backgroundColor: '#FFFFFF50',
        width: Dimensions.get('window').width / 1.2,
        height: 70,
        alignSelf: "center",
        justifyContent: 'center',
        borderRadius: 10,
        overflow: 'hidden',
    },
    titletext: {
        fontSize: 40,
        textAlign: "center",
    },
    button: {
        textAlign: "center",
        backgroundColor: '#FFFFFF50',
        alignSelf: "center",
        borderRadius: 10,
        overflow: 'hidden',
    },
    timedate: {
        color: 'white',
        fontSize: 20,
        marginBottom: 10,
        marginTop: 10,
    },
    timedateview: {
        alignItems: 'center',
        marginBottom: 10
    },
    touchable: {
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        width: Dimensions.get('window').width / 1.2,
        alignItems: 'center',
    },
    createContainer: {
        borderColor: 'white',
        borderRadius: 50,
        borderWidth: 2,
        width: Dimensions.get('window').width / 1.5,
        alignItems: 'center',
        padding: 15,
    }, 
    createEvent: {
        color: 'white',
        fontSize: 25,
    },
    center: {
        alignItems: 'center',
    },
    checkbox: {
        width: Dimensions.get('window').width / 1.15,
    },
    checkboxcontainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
});

export default AddEvent;
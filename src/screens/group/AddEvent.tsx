import React, { useState } from 'react';
import { CheckBox } from 'react-native-elements';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button } from 'react-native';

const AddEvent = () => {
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [dateOfEvent, setDate] = useState({});
    const [timeOfEvent, setTime] = useState({});
    const [isPrivate, setPrivate] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const handleDate = (date: any) => {
        setDate(date);
        setDatePickerVisibility(false);
    };

    const handleTime = (date: any) => {
        setTime(date);
        setTimePickerVisibility(false);
    };

    return (
        <SafeAreaView>
            <Text>AddEvent</Text>
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
            <Button title="Set Date" onPress={ () => setDatePickerVisibility(true) } />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDate}
                onCancel={ () => setDatePickerVisibility(false) }
            />
            <Button title="Set Time" onPress={ () => setTimePickerVisibility(true)} />
            <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleTime}
                onCancel={ () => setDatePickerVisibility(false) }
            />
            <CheckBox 
                title='Private'
                checked={isPrivate}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                onPress={ () => setPrivate(!isPrivate) }
            />
            <Button title='Create event' onPress={ () => console.warn(name, description, isPrivate, dateOfEvent, timeOfEvent) } />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    inputField: {
      height: 40, 
      borderBottomWidth: 2,
      borderColor: 'lightseagreen', 
      fontSize: 20,
      marginBottom: 30,
    },
  });

export default AddEvent;
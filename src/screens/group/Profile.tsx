import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Button, TextInput } from 'react-native';
import axios from 'axios';

const Profile = ({ navigation }: any) => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ firstName, setFirstName ] = useState('');
  const [ dob, setDob ] = useState('');

  const Update = async() => {
    try {
      //yourID:/uodate
    } catch(err) { 
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput 
          style={styles.inputField}
          onChangeText={text => setFirstName(text)}
          value={firstName} 
          placeholder='First Name'
      />
       <TextInput 
          style={styles.inputField}
          onChangeText={text => setLastName(text)}
          value={lastName} 
          placeholder='Last Name'
      />
       <TextInput 
          style={styles.inputField}
          onChangeText={text => setDob(text)}
          value={dob} 
          placeholder='Date of Birth'
      />
      <TextInput 
          style={styles.inputField}
          onChangeText={text => setEmail(text)}
          value={email} 
          placeholder='Email'
      />
      <TextInput 
          style={styles.inputField}
          onChangeText={text => setPassword(text)}
          value={password} 
          placeholder='Password'
      />
      <Button title='Update Info' onPress={ Update } />
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
  container: {
      flex: 1,
      justifyContent: 'center',
  }
});

export default Profile;

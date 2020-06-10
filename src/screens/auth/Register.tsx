import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, TextInput, AsyncStorage } from 'react-native';
import axios from 'axios';

// component
import ChooseImage from './ChooseImage';

const Register = ({ navigation }: any) => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ firstName, setFirstName ] = useState('');
  const [ dob, setDob ] = useState('');

  const register = async() => {
    try {
      const token = (await axios.post('http://localhost:3000/auth/register', { email, password, lastName, firstName, dob })).data.token; 
      await AsyncStorage.setItem("token", token);

      const groups = ['Group 1', 'Group 2'];
      navigation.replace('Your Account', { groups });
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
          placeholder='Date of Birth MM-DD-YYYY'
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
      <ChooseImage />
      <Button title='Register' onPress={ register } />
      <Button title="Already have an account? Log in here!" onPress={ () => navigation.navigate('Login') } />
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

export default Register;

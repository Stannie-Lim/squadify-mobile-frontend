import React, { useState, useEffect } from 'react';
import { AsyncStorage, StyleSheet, SafeAreaView, Button, TextInput } from 'react-native';
import { API_URL } from 'react-native-dotenv'
import axios from 'axios';

const Profile = ({ navigation }: any) => {
  const [ id, setId ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ firstName, setFirstName ] = useState('');
  const [ dob, setDob ] = useState('');
  const [ avatarUrl, setAvatarUrl ] = useState('');

  const Update = async() => {
    try {
        const user = (await axios.put(`${API_URL}/user/${id}/updateProfile`, { id, firstName, lastName, email, password, avatarUrl})).data;
        console.log(user)
    } catch(err) { 
      console.log(err);
    }
  };

  useEffect( () => 
  {
    const getUser = async() => {
      const token = await AsyncStorage.getItem('token');
      const me = (await axios.get(`${API_URL}/auth/me`, { headers: { Authorization: token }})).data;
      setId(me.id)
      setFirstName(me.firstName)
      setLastName(me.lastName)
      setEmail(me.email)
      setPassword(me.password)
      setAvatarUrl(me.avatarUrl)
      console.log(me);
  }
  getUser();
  }, [])

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

import React, { useState } from 'react';
import { RNS3 } from 'react-native-aws3';
import { API_URL, REGION, ACCESS_KEY_ID, SECRET_ACCESS_KEY } from 'react-native-dotenv'
import { StyleSheet, Text, View, SafeAreaView, Button, TextInput, AsyncStorage, Image } from 'react-native';
import axios from 'axios';

// component
import ChooseImage from './ChooseImage';

const Register = ({ navigation }: any) => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ firstName, setFirstName ] = useState('');
  const [ dob, setDob ] = useState('');
  const [ image, setImage ] = useState(null);

  const register = async() => {
    try {
      const file = {
        uri: image,
        name: `${email.replace('.', '').replace('@', '')}_avatar`, 
        type: 'image/jpg',
      };
      const config = {
          bucket: 'squadify-avatars',
          region: REGION,
          accessKey: ACCESS_KEY_ID,
          secretKey: SECRET_ACCESS_KEY
      };
      const avatarUrl = (await RNS3.put(file, config)).body.postResponse.location;

      const token = (await axios.post(`${API_URL}/auth/register`, { email, password, lastName, firstName, dob, avatarUrl } )).data.token; 
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
      <ChooseImage setImage={ setImage } />

      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

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

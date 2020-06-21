import moment from 'moment';
import React, { useState } from 'react';
import { RNS3 } from 'react-native-aws3';
import { AxiosHttpRequest, setJwt } from '../../utils/axios';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { API_URL, REGION, ACCESS_KEY_ID, SECRET_ACCESS_KEY } from 'react-native-dotenv'
import { StyleSheet, Text, View, SafeAreaView, Button, TextInput, AsyncStorage, Image } from 'react-native';

// component
import ChooseImage from './ChooseImage';

const Register = ({ navigation }: any) => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ firstName, setFirstName ] = useState('');
  const [ dob, setDob ] = useState({});
  const [ image, setImage ] = useState(null);
  const [ isDatePickerVisible, setDatePickerVisibility ] = useState(false);

  const handleDate = (dateObj: object): void => {
    setDob(dateObj);
    setDatePickerVisibility(false);
  };

  const register = async() => {
    try {
      const file = {
        uri: image,
        name: `${email.replace('.', '').replace('@', '')}_avatar`, 
        type: 'image/jpg',
      };
      const config = {
          keyPrefix: 'users/',
          bucket: 'squadify-avatars',
          region: REGION,
          accessKey: ACCESS_KEY_ID,
          secretKey: SECRET_ACCESS_KEY
      };
      const avatarUrl = (await RNS3.put(file, config)).body.postResponse.location;

      const token = (await AxiosHttpRequest('POST', `${API_URL}/auth/register`, { email, password, lastName, firstName, dob: moment(dob).format('MM-DD-YYYY'), avatarUrl }))?.data.token;

      setJwt(token);

      navigation.replace('Your Account', { groups: [] });

    } catch(err) { 
      alert("backend is not running right now");
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
       <Text>{moment(dob).format('dddd, MMMM Do YYYY')}</Text>
          <Button title="Set Date" onPress={ () => setDatePickerVisibility(true) } />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDate}
            onCancel={ () => setDatePickerVisibility(false) }
      />
      <TextInput 
          autoCapitalize="none"
          style={styles.inputField}
          onChangeText={text => setEmail(text)}
          value={email} 
          placeholder='Email'
      />
      <TextInput 
          autoCapitalize="none"
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

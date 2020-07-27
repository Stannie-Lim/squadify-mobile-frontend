import moment from 'moment';
import React, { useState } from 'react';
// @ts-ignore
import { RNS3 } from 'react-native-aws3';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { AxiosHttpRequest, setJwt } from '../../utils/axios';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { API_URL, REGION, ACCESS_KEY_ID, SECRET_ACCESS_KEY } from '../../../secrets'
import { StyleSheet, Text, View, SafeAreaView, Button, TextInput, AsyncStorage, Image, ImageBackground, Dimensions, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';

// components
import ChooseImage from './ChooseImage';

// styles
const bg = require('../../../assets/images/login.jpg');

// icons
import { AntDesign, FontAwesome, Entypo, Feather } from '@expo/vector-icons';

const Register = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [dob, setDob]: any = useState('');
  const [image, setImage] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [loading, setLoading] = useState(false)

  const handleDate = (dateObj: object): void => {
    setDob(dateObj);
    setDatePickerVisibility(false);
  };

  const register = async () => {
    setLoading(true)
    if (!image) {
      alert('Please set a profile picture');
      setLoading(false)
      return;
    } else if (!(email && password && firstName && lastName && dob && image)) {
      alert('Please fill out all fields');
      setLoading(false)
      return;
    }
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

      if (avatarUrl) {
        const token = (await AxiosHttpRequest('POST', `${API_URL}/auth/register`, { email, password, lastName, firstName, dob: moment(dob).format('MM-DD-YYYY'), avatarUrl }))?.data.token;

        setJwt(token);

        navigation.replace('Groups', { groups: [] });
      } else {
        alert('image wasnt uploaded');
      }
      setLoading(false)
      return
    } catch (err) {
      setLoading(false)
      alert("backend is not running right now or email is already in use");
    }
  };

  return (
    <ImageBackground source={bg} style={styles.image}>
      <ScrollView style={styles.scrollcontainer}>
        <SafeAreaView style={styles.container}>
          <ChooseImage setImage={setImage} image={image} />
          <View style={styles.inputsContainer}>
            <View style={styles.inputs}>
              <AntDesign name="user" size={24} color="white" />
              <TextInput
                style={styles.inputField}
                onChangeText={text => setFirstName(text)}
                value={firstName}
                placeholder='First Name'
                placeholderTextColor='white'
              />
            </View>
            <View style={styles.inputs}>
              <AntDesign name="user" size={24} color="white" />
              <TextInput
                style={styles.inputField}
                onChangeText={text => setLastName(text)}
                value={lastName}
                placeholder='Last Name'
                placeholderTextColor='white'
              />
            </View>
            <View style={styles.inputs}>
              <FontAwesome name="birthday-cake" size={24} color="white" />
              <TouchableOpacity onPress={() => setDatePickerVisibility(true)} style={styles.inputField}>
                <Text style={styles.birthday}>{dob.length !== 0 ? moment(dob).format('dddd, MMMM Do YYYY') : 'Date of Birth'}</Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDate}
                onCancel={() => setDatePickerVisibility(false)}
              />
            </View>
            <View style={styles.inputs}>
              <Entypo name="email" size={24} color="white" />
              <TextInput
                autoCapitalize="none"
                style={styles.inputField}
                onChangeText={text => setEmail(text)}
                value={email}
                placeholder='Email'
                placeholderTextColor='white'
              />
            </View>
            <View style={styles.inputs}>
              <Feather name="lock" size={24} color="white" />
              <TextInput
                autoCapitalize="none"
                style={styles.inputField}
                onChangeText={text => setPassword(text)}
                value={password}
                secureTextEntry={true}
                placeholder='Password'
                placeholderTextColor='white'
              />
            </View>
          </View>
          <View style={styles.buttongroup}>
            <TouchableOpacity onPress={register} style={styles.signin}>
              <Text style={styles.text}>Register</Text>
            </TouchableOpacity>
          </View>
          {loading &&
            <View style={styles.loading}>
              <ActivityIndicator size='large' color='white' />
            </View>
          }
          <View style={styles.buttongroup}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.login}>Already have an account? Log in here!</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  inputField: {
    height: 40,
    borderBottomWidth: 1,
    borderColor: 'white',
    fontSize: 20,
    marginBottom: 30,
    marginLeft: 15,
    width: Dimensions.get('window').width / 1.5,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    padding: 5,
  },
  scrollcontainer: {
    paddingTop: Dimensions.get('screen').height / 10
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    opacity: 1
  },
  inputs: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  inputsContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    padding: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 24,
    width: Dimensions.get('screen').width
  },
  birthday: {
    height: 40,
    borderBottomWidth: 1,
    borderColor: 'white',
    fontSize: 20,
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    width: Dimensions.get('window').width / 1.5,
    color: 'white',
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  imagecircle: {
    margin: 30,
  },
  buttongroup: {
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  signin: {
    alignItems: 'center',
    width: Dimensions.get('window').width / 1.5,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 2
  },
  login: {
    backgroundColor: 'lightseagreen',
    width: Dimensions.get('window').width,
    textAlign: 'center',
    padding: 20,
    color: 'white',
    fontSize: 20
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Register;

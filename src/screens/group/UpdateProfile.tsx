import moment from 'moment';
import { RNS3 } from 'react-native-aws3';
import ChooseImage from '../auth/ChooseImage';
import React, { useState, useEffect } from 'react';
import { AxiosHttpRequest } from '../../utils/axios';
import { AntDesign, FontAwesome, Entypo } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { API_URL, REGION, ACCESS_KEY_ID, SECRET_ACCESS_KEY } from '../../secrets'
import { AsyncStorage, StyleSheet, SafeAreaView, Button, TextInput, Image, TouchableOpacity, View, Text, ScrollView, ImageBackground, Dimensions, ActivityIndicator } from 'react-native';


const UpdateProfile = ({ user, setShowModal }: any): any => {

  const [image, setImage] = useState(user.avatarUrl);
  const [email, setEmail] = useState(user.email);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [dob, setDob]: any = useState(user.dob);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [loading, setLoading] = useState(false)

  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const update = async () => {
    setLoading(true)
    let avatarUrl: string = image
    if (avatarUrl !== user.avatarUrl) {
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
      avatarUrl = (await RNS3.put(file, config)).body.postResponse.location;
    }

    await AxiosHttpRequest('PUT', `${API_URL}/user/updateProfile`,
      {
        firstName: firstName.split('#')[1] ? firstName.split('#')[0] : firstName,
        lastName: lastName.split('#')[1] ? lastName.split('#')[0] : lastName,
        email,
        avatarUrl
      })

    sleep(2500)

    setLoading(false)
    setShowModal(false)
  }

  const handleDate = (dateObj: object): void => {
    setDob(dateObj);
    setDatePickerVisibility(false);
  };

  return (
    <SafeAreaView>
      <View style={{ alignItems: 'center', marginBottom: 50, marginTop: 30 }}>
        <ChooseImage image={image} setImage={setImage} />
      </View>
      <View style={styles.inputs}>
        <AntDesign name="user" size={24} color="black" />
        <TextInput
          style={styles.inputField}
          onChangeText={text => setFirstName(text)}
          value={firstName}
          placeholder='First Name'
          placeholderTextColor='grey'
        />
      </View>
      <View style={styles.inputs}>
        <AntDesign name="user" size={24} color="black" />
        <TextInput
          style={styles.inputField}
          onChangeText={text => setLastName(text)}
          value={lastName}
          placeholder='Last Name'
          placeholderTextColor='grey'
        />
      </View>
      <View style={styles.inputs}>
        <FontAwesome name="birthday-cake" size={24} color="black" />
        <TouchableOpacity onPress={() => setDatePickerVisibility(true)} style={styles.birthday}>
          <Text style={styles.birthday}>{dob && dob.length !== 0 ? moment(dob).format('dddd, MMMM Do YYYY') : 'Date of Birth'}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDate}
          onCancel={() => setDatePickerVisibility(false)}
        />
      </View>
      <View style={styles.inputs}>
        <Entypo name="email" size={24} color="black" />
        <TextInput
          autoCapitalize="none"
          style={styles.inputField}
          onChangeText={text => setEmail(text)}
          value={email}
          placeholder='Email'
          placeholderTextColor='grey'
        />
      </View>
      {loading &&
        <View style={styles.loading}>
          <ActivityIndicator size='large' color='white' />
        </View>
      }
      <View style={styles.buttongroup}>
        <TouchableOpacity onPress={update} style={styles.signin}>
          <Text style={styles.text}>Update info</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 20 }}>
        <Button title='Cancel' onPress={() => setShowModal(false)} />
      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  inputField: {
    height: 40,
    borderBottomWidth: 1,
    borderColor: 'black',
    fontSize: 20,
    marginBottom: 30,
    width: Dimensions.get('window').width / 1.5,
    color: 'black',
  },
  inputs: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  birthday: {
    height: 40,
    borderBottomWidth: 1,
    borderColor: 'black',
    fontSize: 20,
    marginBottom: 30,
    width: Dimensions.get('window').width / 1.5,
    color: 'grey',
  },
  buttongroup: {
    alignItems: 'center',
    marginTop: 40
  },
  text: {
    color: 'black',
    fontSize: 20
  },
  signin: {
    alignItems: 'center',
    width: Dimensions.get('window').width / 1.5,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 2
  },
  login: {
    backgroundColor: 'lightseagreen',
    width: Dimensions.get('window').width,
    textAlign: 'center',
    padding: 20,
    color: 'black',
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

export default UpdateProfile
import { RNS3 } from 'react-native-aws3';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import React, { useState, useEffect } from 'react';
import { AxiosHttpRequest, getUser } from '../../utils/axios';
import { API_URL, REGION, ACCESS_KEY_ID, SECRET_ACCESS_KEY } from 'react-native-dotenv'
import { AsyncStorage, StyleSheet, SafeAreaView, Button, TextInput, Image, TouchableOpacity } from 'react-native';

//components 

const Profile = ({ navigation }: any) => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    avatarUrl: ''
  });

  const Update = async () => {
    try {
      //wait until we're not too lazy to do the password hashing first 

      // const updated = (await AxiosHttpRequest('PUT', `${API_URL}/user/updateProfile`, {
      //   firstName: user.firstName, 
      //   lastName: user.lastName, 
      //   email: user.email, 
      //   password: 'password', 
      //   avatarUrl: user.avatarUrl
      // }))?.data;
      // setUser({
      //   firstName: updated.raw[0].firstName,
      //   lastName: updated.raw[0].lastName,
      //   password: updated.raw[0].password,
      //   email: updated.raw[0].email,
      //   avatarUrl: updated.raw[0].avatarUrl
      // });
    } catch (err) {
      console.log(err);
    }
  };

  const pickImage = async () => {
    try {
      await Permissions.askAsync(Permissions.CAMERA_ROLL);
      const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true });
      if (!cancelled) {
        const file = {
          uri,
          name: `${user.email.replace('.', '').replace('@', '')}_avatar`,
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
        setUser({
          firstName: user.firstName,
          lastName: user.lastName,
          password: user.password,
          email: user.email,
          avatarUrl
        });
        Update();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getUserInfo = async () => {
      await getUser(setUser);
    };
    getUserInfo();
  }, [])

  /* 
    modal stuff because idk where else to put this for testing
  */

  const [modalVisible, setModalVisible] = useState(false);


  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        {user.avatarUrl.length !== 0 && <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />}
      </TouchableOpacity>


      {/* <TextInput 
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
      /> */}
      {/* <Button title='Update Info' onPress={ Update } /> */}
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
    alignItems: 'center',
    marginTop: 100,
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
});

export default Profile;

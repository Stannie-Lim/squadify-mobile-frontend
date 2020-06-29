import React, { useState, useEffect } from 'react';
import { AsyncStorage, StyleSheet, SafeAreaView, Button, TextInput } from 'react-native';
import { API_URL } from 'react-native-dotenv'
import axios from 'axios';

const ProfileView = ({}: any)=>{

  useEffect( () =>{
    const getUser = async() => {
      const token = await AsyncStorage.getItem('token');
      const me = (await axios.get(`${API_URL}/auth/me`, { headers: { Authorization: token }})).data;
  }
  getUser();
  }, [])

  return(

  )
}

export default ProfileView;
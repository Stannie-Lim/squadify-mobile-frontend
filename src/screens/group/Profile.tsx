import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { AxiosHttpRequest, getUser } from '../../utils/axios';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { API_URL, REGION, ACCESS_KEY_ID, SECRET_ACCESS_KEY } from '../../secrets'
import { AsyncStorage, StyleSheet, SafeAreaView, Button, TextInput, Image, TouchableOpacity, View, Modal, Text, Dimensions } from 'react-native';

const noimage = require('../../../assets/images/noimage.jpg');
//components 
import Details from './Details';
import ChooseImage from '../auth/ChooseImage';
import UpdateProfile from './UpdateProfile';

const Profile = ({ navigation }: any) => {
  const [date, setDate] = useState('');
  const [events, setEvents] = useState([]);
  const [marked, setMarked] = useState({});
  const [user, setUser]: any = useState({});
  const [showDayModal, setShowDayModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false)


  useEffect(() => {
    const getUserInfo = async () => await getUser(setUser);
    getUserInfo();
    getEvents();
  }, [])

  const getEvents = async () => {
    const myEvents = (await AxiosHttpRequest('GET', `${API_URL}/event/my_events`))?.data;
    setMarked(myEvents.reduce((acc: any, now: any) => {
      acc[moment(now.startTime).format('YYYY-MM-DD')] = {
        marked: true,
        selectedColor: 'blue'
      };
      return acc;
    }, {}));
    setEvents(myEvents);
  };

  const showDetails = ({ dateString }: any) => {
    setDate(dateString);
    setShowDayModal(true);
  };

  const imageUri = user.avatarUrl !== null ? user.avatarUrl : ""

  return (
    <SafeAreaView style={styles.bigcontainer}>
      <View style={styles.container}>
        <Text style={styles.username}>{user && user.firstName && `${user.firstName.split('#')[0]} ${user.lastName.split('#')[0]} #${user.lastName.split('#')[1]}`}</Text>
        {user && <Image source={imageUri && imageUri.length !== 0 ? { uri: user.avatarUrl } : noimage} style={styles.avatar} />}
      </View>
      <Button title='Update info' onPress={() => setShowUpdateModal(true)} />
      <TouchableOpacity style={{ backgroundColor: 'lightseagreen', padding: 2, marginTop: 15 }}>
        <Text style={{ fontSize: 25, color: 'white', textAlign: 'center' }}>Personal Calendar</Text>
      </TouchableOpacity>
      <View style={styles.calendar}>
        <Calendar
          markedDates={marked}
          onDayPress={showDetails}
        >
        </Calendar>

      </View>
      <Modal
        animationType="slide"
        visible={showDayModal}
        onRequestClose={() => {
          setShowDayModal(false);
        }}
      >
        <Details date={date} setShowModal={setShowDayModal} />
      </Modal>
      <Modal
        animationType="slide"
        visible={showUpdateModal}
        onRequestClose={() => {
          setShowUpdateModal(false);
        }}
      >
        <UpdateProfile user={user} setShowModal={setShowUpdateModal} />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  username: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  inputField: {
    height: 40,
    borderBottomWidth: 2,
    borderColor: 'lightseagreen',
    fontSize: 20,
    marginBottom: 30,
  },
  container: {
    alignItems: 'center',
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  bigcontainer: {
    flexDirection: 'column',
    marginTop: Dimensions.get('screen').height / 70
  },
});

export default Profile;

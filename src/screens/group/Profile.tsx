import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { AxiosHttpRequest, getUser } from '../../utils/axios';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { API_URL, REGION, ACCESS_KEY_ID, SECRET_ACCESS_KEY } from '../../secrets'
import { AsyncStorage, StyleSheet, SafeAreaView, Button, TextInput, Image, TouchableOpacity, View, Modal, Text } from 'react-native';

//components 
import Details from './Details';

const Profile = ({ navigation }: any) => {
  const [date, setDate] = useState('');
  const [events, setEvents] = useState([]);
  const [marked, setMarked] = useState({});
  const [user, setUser]: any = useState({});
  const [showModal, setShowModal] = useState(false);

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
    setShowModal(true);
  };

  return (
    <SafeAreaView style={styles.bigcontainer}>
      <View style={styles.container}>
        {user.avatarUrl && <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />}
      </View>

      <View style={styles.calendar}>
        <Calendar
          markedDates={marked}
          onDayPress={showDetails}
        >
        </Calendar>

      </View>
      <Modal
        animationType="slide"
        visible={showModal}
        onRequestClose={() => {
          setShowModal(false);
        }}
      >
        <Details date={date} setShowModal={setShowModal} />
      </Modal>
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
    alignItems: 'center',
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  bigcontainer: {
    flexDirection: 'column',
    marginTop: 100
  },
  calendar: {
    marginTop: 25,
  }
});

export default Profile;

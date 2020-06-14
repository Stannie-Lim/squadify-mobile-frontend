import axios from 'axios';
import { API_URL } from 'react-native-dotenv';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, SafeAreaView, Button, TouchableOpacity, Image, AsyncStorage } from 'react-native';

const Home = ({ navigation, route }: any) => {
  const [ groups, setGroups ] = useState([]);
  useEffect(() => {
    const getGroups = async() => {
      const token = await AsyncStorage.getItem('token');
      const id = await AsyncStorage.getItem('id');
      try {
        const groupsData = (await axios.get(`${API_URL}/groups/${id}`, { headers: { Authorization: token }})).data;
        setGroups(groupsData);
      } catch(err) {
        console.log(err);
      }
    };
    getGroups();
  }, [groups]);
  return (
      <ScrollView>
        {
          route.params 
          ? route.params.groups.map((group: any, index: number) => 
            <TouchableOpacity 
              style={ styles.container }
              key={index} 
              onPress={ () => navigation.navigate('Group', { group } ) }
            >
              <Image source={{ uri: group.avatarUrl }} style={ styles.avatar } />
              <Text style={ group.isPrivate ? styles.private : styles.public }>{group.name}</Text>
            </TouchableOpacity> 
          ):
          groups?.map((group: any, index: number) => 
            <TouchableOpacity 
              style={ styles.container }
              key={index} 
              onPress={ () => navigation.navigate('Group', { group } ) }
            >
              <Image source={{ uri: group.avatarUrl }} style={ styles.avatar } />
              <Text style={ group.isPrivate ? styles.private : styles.public }>{group.name}</Text>
            </TouchableOpacity> 
          ) 
        }
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    padding: 20,
  },
  private: {
    color: "tomato",
    fontSize: 30,
  },
  public: {
    color: 'dodgerblue',
    fontSize: 30,
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
  }, 
});

export default Home;
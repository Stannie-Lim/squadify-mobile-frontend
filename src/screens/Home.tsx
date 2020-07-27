import { API_URL } from '../../secrets';
import { AxiosHttpRequest } from '../utils/axios';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, SafeAreaView, Button, TouchableOpacity, Image, AsyncStorage, RefreshControl } from 'react-native';

// components
import RemoveGroupCard from '../cards/RemoveGroupCard';

const Home = ({ navigation, route }: any) => {
  const [groups, setGroups] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getGroups();
  }, []);

  const getGroups = async () => {
    try {
      const groupsData = (await AxiosHttpRequest('GET', `${API_URL}/user/groups`))?.data;
      setGroups(groupsData);
    } catch (err) {
      console.log(err);
    }
  };

  const refresh = () => {
    setRefreshing(true);
    getGroups();
    setRefreshing(false);
  };

  const deleteGroup = async (groupId: string) => {
    await AxiosHttpRequest('DELETE', `${API_URL}/groups/${groupId}`);
    const temp = groups.filter((group: any) => group.id !== groupId);
    setGroups(temp);
  };

  return (
    groups.length === 0 ?
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
          />
        }
      >
        <Text> &#8593; Click here to create a group, or join a group through invite!</Text>
      </ScrollView>
      :
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
          />
        }
      >
        {
          route.params
            ? route.params.groups.map((group: any, index: number) => {
              const imageUri = group.avatarUrl !== null ? group.avatarUrl : ""

              return <TouchableOpacity
                style={styles.container}
                key={index}
                onPress={() => navigation.navigate('Group', { group })}
              >
                {/* @ts-ignore */}
                <Image source={imageUri.length !== 0 ? { uri: group.avatarUrl } : null} style={styles.avatar} />
                <Text style={group.isPrivate ? styles.private : styles.public}>{group.name}</Text>
              </TouchableOpacity>
            })
            :
            groups?.map((group: any, index: number) => <RemoveGroupCard group={group} key={index} navigation={navigation} deleteGroup={deleteGroup} />)
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
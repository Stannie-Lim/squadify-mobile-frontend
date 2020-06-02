import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//routes 
import { GroupStack } from '../../routes/groupStack';

const Tab = createBottomTabNavigator();

const Group = () => {
  return (
    <GroupStack />
  );  
};

export default Group;

const styles = StyleSheet.create({
  tab: {
    // backgroundColor: tomato,
  },
});

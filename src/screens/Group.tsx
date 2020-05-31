import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

//screens 
import Planner from './Planner';
import Chat from './Chat';
import Profile from './Profile';
import Iou from './Iou';

const Tab = createMaterialBottomTabNavigator();
const Group = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Planner" component={Planner} />
                <Tab.Screen name="Chat" component={Chat} />
                <Tab.Screen name="IOUs" component={Iou} />
                <Tab.Screen name="My Profile" component={Profile} />
            </Tab.Navigator>
        </NavigationContainer>
    );  
};

export default Group;

const styles = StyleSheet.create({
  tab: {
    // backgroundColor: tomato,
  },
});

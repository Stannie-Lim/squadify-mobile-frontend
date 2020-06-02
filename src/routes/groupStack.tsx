import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//screens 
import PlannerCalendar from '../screens/group/PlannerCalendar';
import PlannerMap from '../screens/group/PlannerMap';
import Chat from '../screens/group/Chat';
import Profile from '../screens/group/Profile';
import Iou from '../screens/group/Iou';

// stacks
import { PlannerStack } from './plannerStack';

const Tab = createBottomTabNavigator();

export const GroupStack = () => {
  return (
    <Tab.Navigator>
        <Tab.Screen name="Planner" component={PlannerStack } />
        <Tab.Screen name="Chat" component={Chat} />
        <Tab.Screen name="IOUs" component={Iou} />
        <Tab.Screen name="My Profile" component={Profile} />
    </Tab.Navigator>
  );  
};

const styles = StyleSheet.create({
  tab: {
    // backgroundColor: tomato,
  },
});

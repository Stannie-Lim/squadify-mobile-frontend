import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//screens 
import PlannerCalendar from './PlannerCalendar';
import PlannerMap from './PlannerMap';
import Chat from './Chat';
import Profile from './Profile';
import Iou from './Iou';

//routes 
import PlannerStack from '../../routes/plannerStack';

const Tab = createBottomTabNavigator();

const Group = () => {
  return (
      <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Planner" component={PlannerCalendar} />
            <Tab.Screen name="PlannerMap" component={PlannerMap} />
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

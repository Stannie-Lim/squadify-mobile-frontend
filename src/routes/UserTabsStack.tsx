import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// icons
import { Ionicons, AntDesign, FontAwesome5 } from "@expo/vector-icons";

// screens
import Home from '../screens/Home';
import Friends from '../screens/friend/Friends';

interface UserTabsProps {};
type UserParamList = {
  Group: undefined;
  Groups: undefined;
  Friends: undefined;
};

const Tab = createBottomTabNavigator<UserParamList>();
export const UserTabsStack: React.FC<UserTabsProps> = ({ route }: any) => {
  const { groups, friends } = route.params;
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        if (route.name === "Groups") {
          return <Ionicons name={"ios-people"} size={size} color={color} />;
        } 
        else if (route.name === "Friends") {
          return <Ionicons name={"ios-people"} size={size} color={color} />;
        }
      }
    })}
    tabBarOptions={{
      activeTintColor: "tomato",
      inactiveTintColor: "gray"
    }}>
        <Tab.Screen name="Groups">
          { ({ navigation }: any) => <Home navigation={navigation} groups={groups} /> }
        </Tab.Screen>
        <Tab.Screen name="Friends">
          { ({ navigation }: any) => <Friends navigation={navigation} friends={friends} /> }
        </Tab.Screen>
    </Tab.Navigator>
  );  
};
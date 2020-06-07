import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// icons
import { Ionicons, AntDesign, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

//screens 
import Feed from '../../screens/group/Feed';
import Chat from '../../screens/group/Chat';
import Profile from '../../screens/group/Profile';
import AddEvent from '../../screens/group/AddEvent';
import Iou from '../../screens/group/Iou';

// MAINVIEW AFTER YOU LOG IN
/*



NAVBAR BOTTOM: feed (top right: search), group (top left navbar: groups list, top right navbar: chats, calendar/map view), add event, IOUS, my profile




*/

// stacks
import { PlannerStack } from './plannerStack';

interface GroupTabsProps {};
type GroupParamList = {
  Feed: undefined;
  Planner: undefined;
  Chat: undefined;
  "Add Event": undefined;
  IOUs: undefined;
  "My Profile": undefined;
};

const Tab = createBottomTabNavigator<GroupParamList>();
const GroupStack: React.FC<GroupTabsProps> = ({route}: any) => {
  const { group } = route.params;

  //ALL THE GROUP INFORMATION IS IN THIS VARIABLE 
  console.log(group);


  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        if (route.name === "Feed") return <FontAwesome5 name={"book"} size={size} color={color} />;
        else if (route.name === "Planner") return <Ionicons name={"ios-calendar"} size={size} color={color} />;
        else if (route.name === "Chat") return <Ionicons name={"ios-people"} size={size} color={color} />;
        else if (route.name === "Add Event") return <MaterialIcons name={"place"} size={size} color={color} />;
        else if (route.name === "IOUs") return <FontAwesome5 name={"money-bill"} size={size} color={color} />;
        else if (route.name === "My Profile") return <AntDesign name={"profile"} size={size} color={color} />;
      }
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray"
      }}>
        <Tab.Screen name='Feed' component={Feed} />
        {/* <Tab.Screen name="Chat" component={Chat} /> */}
        <Tab.Screen name="Planner" component={PlannerStack} />
        <Tab.Screen name="Add Event" component={AddEvent} />
        <Tab.Screen name="IOUs" component={Iou} />
        <Tab.Screen name="My Profile" component={Profile} />
    </Tab.Navigator>
  );  
};

export default GroupStack;

const styles = StyleSheet.create({
  tab: {
    // backgroundColor: tomato,
  },
});

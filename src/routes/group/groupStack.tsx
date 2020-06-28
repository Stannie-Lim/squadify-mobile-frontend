import React, { useState, useEffect } from 'react';
import { getUser } from '../../utils/axios';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';

// icons
import { Ionicons, AntDesign, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

//screens 
import Iou from '../../screens/group/Iou';
import Feed from '../../screens/group/Feed';
import Profile from '../../screens/group/Profile';
import AddEvent from '../../screens/group/AddEvent';
import PlannerCalendar from '../../screens/group/PlannerCalendar';

interface GroupTabsProps {};
type GroupParamList = {
  Feed: undefined;
  Group: undefined;
  Chat: undefined;
  "Add Event": undefined;
  IOUs: undefined;
  "My Profile": undefined;
};

const Tab = createBottomTabNavigator<GroupParamList>();
const GroupStack: React.FC<GroupTabsProps> = ({route, navigation}: any) => {
  const { group } = route.params;
  const [ user, setUser ] = useState({});

  useEffect(() => {
    getUserFromDb();
}, []);

  const getUserFromDb = async() => {
    try { 
        await getUser(setUser);
    } catch(err) {
        console.log(err);
    }
}

  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        if (route.name === "Feed") return <FontAwesome5 name={"book"} size={size} color={color} />;
        else if (route.name === "Group") return <Ionicons name={"ios-calendar"} size={size} color={color} />;
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
        <Tab.Screen name="Group">
          { () => <PlannerCalendar navigation={ navigation } group={ group } /> }
        </Tab.Screen>
        <Tab.Screen name="Add Event">
          { () => <AddEvent navigation={ navigation } route={ route }/> }
        </Tab.Screen>
        <Tab.Screen name="IOUs">
          { () => <Iou navigation={ navigation } route={ route } group={ group } user={ user } /> }
        </Tab.Screen>
        <Tab.Screen name="My Profile">
          { () => <Profile navigation={ navigation } route={ route } group={ group } /> }
        </Tab.Screen>
    </Tab.Navigator>
  );  
};

export default GroupStack;

const styles = StyleSheet.create({
  tab: {
    // backgroundColor: tomato,
  },
});

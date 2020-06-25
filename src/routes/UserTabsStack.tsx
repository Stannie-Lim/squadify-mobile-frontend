import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// icons
import { Ionicons, AntDesign, FontAwesome5 } from "@expo/vector-icons";

// screens
import Home from '../screens/Home';
import Friends from '../screens/friend/Friends';
import GroupInvitations from '../screens/group/GroupInvitations';

interface UserTabsProps {};
type UserParamList = {
  Group: undefined;
  Groups: undefined;
  Pending: undefined;
  "Group Invites": undefined;
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
        } else if (route.name === "Pending") {
          return <Ionicons name={"ios-people"} size={size} color={color} />;
        } else if (route.name === "Group Invites") {
          return <Ionicons name={"ios-people"} size={size} color={color} />;
        }
      }
    })}
    tabBarOptions={{
      activeTintColor: "tomato",
      inactiveTintColor: "gray"
    }}>
        <Tab.Screen name="Groups">
          { ({ navigation, route }: any) => <Home route={ route } navigation={navigation} groups={groups} /> }
        </Tab.Screen>
        <Tab.Screen name="Pending">
          { ({ navigation, route }: any) => <Friends route={ route } navigation={navigation} friends={friends} /> }
        </Tab.Screen>
        <Tab.Screen name="Group Invites">
          { ({ navigation, route }: any) => <GroupInvitations route={ route } navigation={ navigation } /> }
        </Tab.Screen>
    </Tab.Navigator>
  );  
};
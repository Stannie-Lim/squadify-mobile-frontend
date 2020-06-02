import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Button, Text } from "react-native";

//screens
import Home from '../screens/Home';
import Group from './group/groupStack';


interface HomeStackProps {}

type HomeParamList = {
    Home: undefined;
    Group: undefined;
  };
  

const Stack = createStackNavigator<HomeParamList>();
export const HomeStack: React.FC<HomeStackProps> = ({}) => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={ Home } />
        <Stack.Screen name="Group" component={ Group } />
    </Stack.Navigator>
  );
};
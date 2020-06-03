  
import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Button, Text } from "react-native";

// screens
import Auth from '../../screens/auth/Auth';
import Login from '../../screens/auth/Login';
import Register from '../../screens/auth/Register';
import Home from '../../screens/Home';
import Group from '../group/groupStack';
import { UserTabsStack } from '../UserTabsStack';

interface AuthStackProps {};
type AuthParamList = {
    "Welcome to Squadify!": undefined;
    Login: undefined;
    Register: undefined;
    "Your Groups": undefined;
    "Group 1": undefined;
    "Your Account": undefined;
};

const Stack = createStackNavigator<AuthParamList>();
export const AuthStack: React.FC<AuthStackProps> = ({}) => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Welcome to Squadify!" component={ Auth } />
        <Stack.Screen name="Login" component={ Login } />
        <Stack.Screen name="Register" component={ Register } />
        <Stack.Screen name='Your Account' component={ UserTabsStack } />
        <Stack.Screen name="Your Groups" component={ Home } />
        <Stack.Screen name="Group 1" component={ Group } />
    </Stack.Navigator>
  );
};


  
import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Button, Text } from "react-native";

// screens
import Auth from '../../screens/auth/Auth';
import Login from '../../screens/auth/Login';
import Register from '../../screens/auth/Register';
import Home from '../../screens/Home';
import Group from '../group/groupStack';

interface AuthStackProps {};
type AuthParamList = {
    "Welcome to Squadify!": undefined;
    Login: undefined;
    Register: undefined;
    Home: undefined;
    Group: undefined;
};

const Stack = createStackNavigator<AuthParamList>();
export const AuthStack: React.FC<AuthStackProps> = ({}) => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Welcome to Squadify!" component={ Auth } />
        <Stack.Screen name="Login" component={ Login } />
        <Stack.Screen name="Register" component={ Register } />
        <Stack.Screen name="Home" component={ Home } />
        <Stack.Screen name="Group" component={ Group } />
    </Stack.Navigator>
  );
};


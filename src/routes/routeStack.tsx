import React from 'react';
import { removeJwt } from '../utils/axios';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Button, Text, AsyncStorage, Modal } from "react-native";

// screens
import Home from '../screens/Home';
import Auth from '../screens/auth/Auth';
import Chat from '../screens/group/Chat';
import Login from '../screens/auth/Login';
import Search from '../screens/group/Search';
import Register from '../screens/auth/Register';
import RadiusMap from '../screens/group/RadiusMap';
import AddFriend from '../screens/friend/AddFriend';
import CreateGroup from '../screens/group/CreateGroup';
import SetLocation from '../screens/group/SetLocation';

// stacks
import Group from './group/groupStack';
import { UserTabsStack } from './UserTabsStack';

interface RoutesProps {};
type RoutesParamList = {
    "Welcome to Squadify!": undefined;
    Login: undefined;
    Register: undefined;
    Chat: undefined;
    "Your Groups": undefined;
    Group: undefined;
    "Your Account": undefined;
    Search: undefined;
    "Add friend": undefined;
    "Create group": undefined;
    'Set Location': undefined;
    "Radius map": undefined;
};

const Stack = createStackNavigator<RoutesParamList>();
export const Routes: React.FC<RoutesProps> = ({}) => {
    const logout = (navigation: any) => {
        removeJwt();
        navigation.popToTop();
      };
    
      const getHeaderLeft = (route: any, navigation: any) => {
        const { groups, friends} = route.params;
        if(route.state) {
          switch(route.state.index) {
            // if you're currently in groups tab
            case 0:
              return <Button title="Create Group" onPress={ () => navigation.push('Create group', { groups, friends, navigation, route }) } />
    
            //if you're currently in friends tab
            case 2:
              return <Button title="Add Friend" onPress={ () => navigation.push('Add friend',{ friends, navigation, route } ) } />
          }
        } else {
          return <Button title="Create Group" onPress={ () => navigation.push('Create group', { groups, friends, navigation, route }) } />
        }
      }
    
      const getHeaderRight = (route: any, navigation: any) => {
        if(route.state) {
          switch(route.state.index) {
            case 0:
              return <Button title='Chat' onPress={ () => navigation.navigate('Chat') } />
            case 1:
              return <Button title='Search' onPress={ () => navigation.navigate('Search') } />
          }
        } else {
          return <Button title='Chat' onPress={ () => navigation.navigate('Chat') } />
        }
    };
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Welcome to Squadify!" component={ Auth } />
                <Stack.Screen name="Login" component={ Login } />
                <Stack.Screen name="Register" component={ Register } />
                <Stack.Screen name="Your Groups" component={ Home } />
                <Stack.Screen name="Chat" component={ Chat } />
                <Stack.Screen name="Search" component={ Search } />

                { /* swiped left */ } 
                <Stack.Screen name='Your Account' component={ UserTabsStack } 
                    options={ ({ navigation, route }) => ({
                        headerLeft: () => getHeaderLeft(route, navigation),
                        headerRight: () => (
                        <Button title='Log Out' onPress={ () => logout(navigation) } /> 
                        ),
                        gestureEnabled: true,
                    })
                    }
                />

                <Stack.Screen name="Add friend" component={ AddFriend } />
                <Stack.Screen name='Create group' component={ CreateGroup } />
                <Stack.Screen name="Set Location" component={ SetLocation } />
                <Stack.Screen name="Radius map" component={ RadiusMap } />

                { /* swiped right */ } 
                <Stack.Screen name="Group" component={ Group }
                options={ ({ navigation, route }) => ({
                    title: route.params.group.name,
                    headerLeft: () => (
                    <Button title='Your Groups' onPress={ () => navigation.navigate('Your Account', { groups: route.params.groups, friends: route.params.friends }) } />
                    ),
                    headerRight: () => (
                    getHeaderRight(route, navigation)
                    )
                })}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
}; 


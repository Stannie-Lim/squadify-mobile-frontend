import { API_URL } from 'react-native-dotenv';
import { AxiosHttpRequest } from '../utils/axios';
import React, { useState, useEffect } from 'react';
import { removeJwt, getUser } from '../utils/axios';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Button, StyleSheet, Dimensions, Text, AsyncStorage, Modal, Alert, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";

// screens
import Home from '../screens/Home';
import Auth from '../screens/auth/Auth';
import Chat from '../screens/group/Chat';
import Login from '../screens/auth/Login';
import Search from '../screens/group/Search';
import Members from '../screens/group/Members';
import Register from '../screens/auth/Register';
import RadiusMap from '../screens/group/RadiusMap';
import AddFriend from '../screens/friend/AddFriend';
import CreateGroup from '../screens/group/CreateGroup';
import SetLocation from '../screens/group/SetLocation';
import InviteMember from '../screens/group/InviteMember';

// stacks
import Group from './group/groupStack';
import { UserTabsStack } from './UserTabsStack';

//icons 
import { AntDesign, Entypo, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'; 

interface RoutesProps { };
type RoutesParamList = {
  "Welcome to Squadify!": undefined;
  Login: undefined;
  Register: undefined;
  Chat: undefined;
  "Your Groups": undefined;
  Group: undefined;
  "Groups": undefined;
  Search: undefined;
  "Add friend": undefined;
  "Create group": undefined;
  'Set Location': undefined;
  "Radius map": undefined;
  "Members": undefined;
  "Invite": undefined;
};

const Stack = createStackNavigator<RoutesParamList>();
export const Routes: React.FC<RoutesProps> = ({ }) => {
  const [user, setUser] = useState({});
  const getMe = async () => {
    await getUser(setUser);
  };

  useEffect(() => {
    getMe()
  }, []);

  const logout = (navigation: any) => {
    removeJwt();
    navigation.popToTop();
  };

  const getHeaderLeft = (route: any, navigation: any) => {
    const { groups, friends } = route.params;
    if (route.state) {
      switch (route.state.index) {
        // if you're currently in groups tab
        case 0:
          return <TouchableOpacity onPress={() => navigation.push('Create group', { groups, friends, navigation, route })}>
            <MaterialIcons style={{ marginLeft: 10, }} name="group-add" size={30} color="black" />
          </TouchableOpacity>

        //if you're currently in friends tab
        case 1:
          return <TouchableOpacity onPress={() => navigation.push('Add friend', { friends, navigation, route })}>
            <AntDesign style={{ marginLeft: 10 }} name="plus" size={24} color="black" />
          </TouchableOpacity>
      }
    } else {
      return <TouchableOpacity onPress={() => navigation.push('Create group', { groups, friends, navigation, route })}>
      <MaterialIcons style={{ marginLeft: 10, }} name="group-add" size={30} color="black" />
    </TouchableOpacity>
    }
  }

  const getHeaderRight = (route: any, navigation: any) => {

    if (route.state) {
      switch (route.state.index) {
        case 0:
          return <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                  <Entypo style={{ marginRight: 10, }} name="magnifying-glass" size={24} color="black" />
                </TouchableOpacity>
        case 1:
          return <TouchableOpacity onPress={() => navigation.navigate('Chat', { group: route.params.group, user })}>
                  <Entypo style={{ marginRight: 10, }} name="chat" size={24} color="black" />
                </TouchableOpacity>
      }
    } else {
      return <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <Entypo style={{ marginRight: 10, }} name="magnifying-glass" size={24} color="black" />
            </TouchableOpacity>
    }
  };
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
            headerShown: true,
            headerTransparent:true
        }}>
        <Stack.Screen name="Welcome to Squadify!" component={Auth} 
          options={{
            title: '',
          }}
        />
        <Stack.Screen name="Login" component={Login} 
          options={{
            title: '',
            headerBackTitle: ' '
          }}
        />
        <Stack.Screen name="Register" component={Register} 
          options={{
            title: '',
            headerBackTitle: ' '
          }}
        />
        <Stack.Screen name="Your Groups" component={Home} />
        <Stack.Screen name="Search" component={Search} 
          options={{
            title: '',
            headerBackTitle: ' '
          }}
        />

        <Stack.Screen name="Chat" component={Chat}
          options={({ navigation, route }: any) => ({
            headerRight: () => <Button title='Group members' onPress={() => navigation.navigate('Members', { group: route.params.group, user })} />
          })
          }
        />

        <Stack.Screen name='Members' component={Members}
          options={({ navigation, route }: any) => ({
            headerRight: () => <Button title='Invite' onPress={() => navigation.navigate('Invite', { group: route.params.group, user })} />
          })
          }
        />

        <Stack.Screen name='Invite' component={InviteMember} />

        { /* swiped left */}
        <Stack.Screen name='Groups' component={UserTabsStack}
          options={({ navigation, route }) => ({
            headerLeft: () => getHeaderLeft(route, navigation),
            headerRight: () => (
              <TouchableOpacity onPress={() => logout(navigation)}>
                <MaterialCommunityIcons style={{ marginRight: 15, }} name="logout" size={24} color="black" />
              </TouchableOpacity>
            ),
            gestureEnabled: true,
          })
          }
        />

        <Stack.Screen name="Add friend" component={AddFriend} />
        <Stack.Screen name='Create group' component={CreateGroup} 
          options={{
            title: 'New Group',
            headerBackTitle: ' '
          }}
        />
        <Stack.Screen name="Set Location" component={SetLocation} />
        <Stack.Screen name="Radius map" component={RadiusMap} />

        { /* swiped right */}
        <Stack.Screen name="Group" component={Group}
          options={({ navigation, route }) => ({
            title: route.params.group.name,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Groups', { groups: route.params.groups, friends: route.params.friends })}>
                <MaterialIcons style={{ marginLeft: 20 }} name="group" size={30} color="black" />
              </TouchableOpacity>
             
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

const styles = StyleSheet.create({
  inputField: {
    height: 40,
    borderBottomWidth: 2,
    borderColor: 'lightseagreen',
    fontSize: 20,
    marginBottom: 30,
  },
  container: {
    flex: 1,
    alignItems: 'center'
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  modal: {
    backgroundColor: 'white',
    height: Dimensions.get('window').height,
  },
});


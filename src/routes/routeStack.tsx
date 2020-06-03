import React from 'react';
import { NavigationContainer, RouteProp } from "@react-navigation/native";

// stacks
import { HomeStack } from './homeStack';
import { AuthStack } from './auth/authStack';

// screens
import Auth from '../screens/auth/Auth';

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
    return (
        <NavigationContainer>
            <AuthStack />
            {/* <HomeStack /> */}
        </NavigationContainer>
    );
}; 


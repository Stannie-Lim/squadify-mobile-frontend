import React from 'react';
import { NavigationContainer, RouteProp } from "@react-navigation/native";

// stacks
import { AuthStack } from './auth/authStack';

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
    return (
        <NavigationContainer>
            <AuthStack />
        </NavigationContainer>
    );
}; 


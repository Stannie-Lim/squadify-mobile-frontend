import React from 'react';
import { NavigationContainer, RouteProp } from "@react-navigation/native";

// stack
import { HomeStack } from './homeStack';

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
    return (
        <NavigationContainer>
            <HomeStack />
        </NavigationContainer>
    );
}; 


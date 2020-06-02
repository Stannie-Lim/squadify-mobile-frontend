import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// screens
import PlannerCalendar from '../../screens/group/PlannerCalendar';
import PlannerMap from '../../screens/group/PlannerMap';

interface PlannerStackProps {}
type PlannerParamList = {
  PlannerCalendar: undefined;
  PlannerMap: undefined;
}

const Stack = createStackNavigator<PlannerParamList>();
export const PlannerStack: React.FC<PlannerStackProps> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='PlannerCalendar' component={ PlannerCalendar } />
      <Stack.Screen name='PlannerMap' component={ PlannerMap } />
    </Stack.Navigator>
  );
};
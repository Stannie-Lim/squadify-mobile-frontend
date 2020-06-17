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
export const PlannerStack: React.FC<PlannerStackProps> = ({navigation, group}: any) => {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name='PlannerCalendar'>
        { () => <PlannerCalendar group={ group } navigation={ navigation } /> }
      </Stack.Screen>
      <Stack.Screen name='PlannerMap'>
        { () => <PlannerMap group={ group } navigation={ navigation } /> }
      </Stack.Screen>
    </Stack.Navigator>
  );
};
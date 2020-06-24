import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// screens
import PlannerCalendar from '../../screens/group/PlannerCalendar';

interface PlannerStackProps {}
type PlannerParamList = {
  PlannerCalendar: undefined;
}

const Stack = createStackNavigator<PlannerParamList>();
export const PlannerStack: React.FC<PlannerStackProps> = ({navigation, group}: any) => {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name='PlannerCalendar'>
        { ({route}: any) => <PlannerCalendar route={ route } group={ group } navigation={ navigation } /> }
      </Stack.Screen>
    </Stack.Navigator>
  );
};
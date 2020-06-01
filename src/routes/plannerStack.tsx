import { createStackNavigator } from 'react-navigation-stack';

// screens
import PlannerCalendar from '../screens/group/PlannerCalendar';
import PlannerMap from '../screens/group/PlannerMap';

const screens = {
  PlannerCalendar: { screen: PlannerCalendar },
  PlannerMap: { screen: PlannerMap },
}   

const PlannerStack = createStackNavigator(screens);
export default PlannerStack;
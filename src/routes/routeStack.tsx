import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

//screens
import Home from '../screens/Home';

//group screens
import Group from '../screens/group/Group';

const screens = {
    Home: { screen: Home },
    Group: { screen: Group }
}   

const HomeStack = createStackNavigator(screens);
export default createAppContainer(HomeStack);
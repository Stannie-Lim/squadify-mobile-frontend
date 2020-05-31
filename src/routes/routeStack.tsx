import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

//screens
import Group from '../screens/Group';
import Home from '../screens/Home';

const screens = {
    Home: {
        screen: Home
    },
    Group: {
        screen: Group
    },
}   

const HomeStack = createStackNavigator(screens);
export default createAppContainer(HomeStack);
import { StackNavigator } from 'react-navigation';
import AuthNavigator from './auth-navigator';
import HomePage from '../screens/home/Home';
import { resetRouterTo } from './utils';

const createRootNavigator = initialRouteName =>
  StackNavigator(
    {
      Auth: { screen: AuthNavigator },
      Home: { screen: HomePage }
    },
    {
      initialRouteName,
      headerMode: 'none'
    }
  );

export const resetRootStack = routeName => resetRouterTo(true, routeName);

export default createRootNavigator;

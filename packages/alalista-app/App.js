import Expo from 'expo';
import { Root } from 'native-base';
import React, { Component } from 'react';
import deviceLog from 'react-native-device-log';
import createRootNavigator from './app/navigators/root-navigator';
import logger from './logger';
import { isLoggedIn } from './app/services/oauth';

class App extends Component {
  state = {
    isReady: false
  };

  async componentWillMount() {
    await logger;
    deviceLog.clear();
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'), // eslint-disable-line global-require
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'), // eslint-disable-line global-require
      Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf') // eslint-disable-line global-require
    });

    this.setState({ isLogged: await isLoggedIn(), isReady: true });
  }

  render() {
    const { isLogged } = this.state;
    const initialRoute = isLogged ? 'Home' : 'Auth';
    const RootComponent = createRootNavigator(initialRoute);
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }

    return (
      <Root>
        <RootComponent />
      </Root>
    );
  }
}

export default App;

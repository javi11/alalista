import { AsyncStorage } from 'react-native';
import deviceLog from 'react-native-device-log';

deviceLog.startTimer('start-up');

export default deviceLog.init(AsyncStorage, {
  logToConsole: true,
  logRNErrors: true,
  maxNumberToRender: 2000,
  maxNumberToPersist: 2000
});

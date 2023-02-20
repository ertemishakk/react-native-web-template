import {AppRegistry} from 'react-native';
import App from './App';
import {enableExperimentalWebImplementation} from 'react-native-gesture-handler';

enableExperimentalWebImplementation();

AppRegistry.registerComponent('App', () => App);
AppRegistry.runApplication('App', {rootTag: document.getElementById('root')});

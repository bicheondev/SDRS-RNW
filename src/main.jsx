import { AppRegistry } from 'react-native';

import { RnwApp } from './RnwApp.jsx';
import { getRootElement } from './platform/index.js';
import './styles.css';

AppRegistry.registerComponent('SDRSRnw', () => RnwApp);

const rootNode = getRootElement('root');

AppRegistry.runApplication('SDRSRnw', {
  rootTag: rootNode,
});

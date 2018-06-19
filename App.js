import React from 'react';
import SecondActivity from './app/SecondActivity';
import ThirdActivity from './app/ThirdActivity';
import { createStackNavigator } from 'react-navigation';

import {
  StyleSheet,
  Text,
  View,
   TouchableOpacity,
  AsyncStorage} from 'react-native';

  const Navigation = createStackNavigator({
    First: {screen: SecondActivity},
    Second: {screen: ThirdActivity}
  });

export default Navigation;

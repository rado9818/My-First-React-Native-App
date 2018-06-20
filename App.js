import React from 'react';
import SecondActivity from './app/SecondActivity';
import ThirdActivity from './app/ThirdActivity';
import LogInActivity from './app/LogInActivity';
import { createStackNavigator } from 'react-navigation';

import {
  StyleSheet,
  Text,
  View,
   TouchableOpacity,
  AsyncStorage} from 'react-native';

  const Navigation = createStackNavigator({
  	LogIn: {screen: LogInActivity},
    First: {screen: SecondActivity},
    Second: {screen: ThirdActivity}
  });

export default Navigation;

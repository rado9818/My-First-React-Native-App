import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
   TouchableOpacity,
  AsyncStorage} from 'react-native';


  const util = require('util');

export default class ThirdActivity extends React.Component {
  static navigationOptions = {
    title:"ThirdActivity"
  };

  render() {


    console.log("this.props.navigation.state = "+util.inspect(this.props.navigation.state, false, null));

    var {params} = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <Text>Third Activity! {params.name}</Text>
        <Image source={{uri: 'https://facebook.github.io/react/logo-og.png'}}
               style={{width: 200, height: 200}} />


      </View>
    );
  }
  saveData(){
    //var Constants = require('./Constants');

    alert("Hi");

  }
}
AppRegistry.registerComponent('ThirdActivity', () => ThirdActivity);

//AppRegistry.registerComponent('ThirdActivity', () => ThirdActivity);


const styles = StyleSheet.create({
  backgroundVideo: {
   position: 'absolute',
   top: 0,
   left: 0,
   bottom: 0,
   right: 0,
 },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

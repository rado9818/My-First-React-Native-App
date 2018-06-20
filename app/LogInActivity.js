import React from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TextInput,
   TouchableOpacity,
  AsyncStorage} from 'react-native';


  const util = require('util');




export default class LogInActivity extends React.Component {
  static navigationOptions = {
    title:"LogIn"
  };



  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

 onLogin(){
    const { email, password } = this.state;

    //alert(email + " " + password);

    fetch('https://reqres.in/api/login', {
    method: 'POST',
    headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    }).then((response) => response.json())
      .then((responseJson) => {
        if(!responseJson.hasOwnProperty('error')){
          var {navigate} = this.props.navigation;
          navigate('First');
          console.log(responseJson);
        }else{
          alert("Error");
        }
       
      })
      .catch((error) => {
        alert(error);
                console.log(error);

      });

  }
 
  render() {


    console.log("this.props.navigation.state = "+util.inspect(this.props.navigation.state, false, null));

    var {params} = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <Text>LogInActivity! </Text>
          <TextInput
                  style={{width: 300, height: 40, borderColor: 'gray'}}
                  placeholder="Email"
                  onChangeText={(email) => this.setState({email})}
                />

          <TextInput
            onChangeText={(password) => this.setState({password})}
            placeholder="Password"
            style={{width: 300, height: 40, borderColor: 'gray'}}
          />
        <Button
            title="Log In"
            onPress={this.onLogin.bind(this)}
          />

      </View>
    );
  }
  saveData(){
    //var Constants = require('./Constants');

    alert("Hi");

  }
}

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

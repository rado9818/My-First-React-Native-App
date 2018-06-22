import React from 'react';
import {moviesUrl, key} from './Constants';
import SearchText from './components/SearchText';
import TableComponent from './components/TableComponent';
import {sortBy} from 'lodash';
const util = require('util');
//import ThirdActivity from './app/ThirdActivity';
import { AppNavigator } from 'react-navigation';
import {BackHandler, BackAndroid} from 'react-native';

var list;
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
   TouchableOpacity,
   FlatList, ActivityIndicator,
  AsyncStorage} from 'react-native';

var ImagePicker = require('react-native-image-picker');

// More info on all the options is below in the README...just some common use cases shown here
var options = {
  title: 'Select Avatar',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};


function isSearched(searchTerm){
  return function(item){

    return !searchTerm || item.title.includes(searchTerm);
  }
}

export default class SecondActivity extends React.Component {
  static navigationOptions = {
    title:"SecondActivity",
    headerLeft: null
  };
  //var {navigate}
  constructor(props){
    super(props);
    this.state ={ isLoading: true}
    console.log(key);
    goToCategoryView = () => {
    //Replace here push with resetTo

    }

 

    this.removeItem = this.removeItem.bind(this);
    this.searchValue = this.searchValue.bind(this);
    this.onSort = this.onSort.bind(this);
  }

  componentWillMount(){
      BackHandler.addEventListener('hardwareBackPress', function(){
        BackAndroid.exitApp();
        return true;
      }
    );

  }


  componentDidMount(){
    this.setState({isLoading: true})
    return fetch(moviesUrl)
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.movies,
        }, function(){
            list = responseJson.movies;
        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

removeItem(name){
//  alert("Delete "+name);
function isNotName(item){
    return item.title !== name;
}
//console.log(list[0].title);
  const updatedList=list.filter(isNotName);
  console.log("Here is the context "+this.setState);
  this.setState({dataSource: updatedList});
  list = updatedList;
}

onSort(list, key, reverse){
  if(reverse){
    return sortBy(list, key).reverse();
  }else{
    return sortBy(list, key);
  }
}

searchValue(event){
  console.log(event);
  const updatedList=list.filter(isSearched(event));
  this.setState({dataSource: updatedList});
}

takePic(){
     /**
   * The first arg is the options object for customization (it can also be null or omitted for default options),
   * The second arg is the callback which sends object: response (more info below in README)
   */
  ImagePicker.showImagePicker(options, (response) => {
    console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled image picker');
    }
    else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    }
    else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    }
    else {
      let source = { uri: response.uri };

      // You can also display the image using data:
      // let source = { uri: 'data:image/jpeg;base64,' + response.data };

      this.setState({
        avatarSource: source
      });
    }
  });
}

  render() {
  //  console.log("this.props.navigation = "+util.inspect(this.props.navigation, false, null));
    var {navigate} = this.props.navigation;


    return (
      <View style={styles.container}>

        <Text>This is SecondActivity.</Text>
        <Button onPress={
              () => navigate('Second', {name: 'Rado'})
          }
          title="Go to scr 2"
        />

         <Button onPress={
              () => this.takePic
          }
          title="Take a pic"
        />

        <SearchText
          onChangeText={this.searchValue}
        />

        <TableComponent
          sortKey="title"
          onSort={this.onSort}
          removeItem={this.removeItem}
          state={this.state}/>

      </View>
    );
  }
  saveData(){

    //var Constants = require('./Constants');
    //navigate('ThirdActivity');
  //  alert("Hi");

  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

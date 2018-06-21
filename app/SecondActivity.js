import React from 'react';
import {moviesUrl, key} from './Constants';
import PropTypes from 'prop-types';
import {sortBy} from 'lodash';
const util = require('util');
//import ThirdActivity from './app/ThirdActivity';
import { AppNavigator } from 'react-navigation';

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


function isSearched(searchTerm){
  return function(item){

    return !searchTerm || item.title.includes(searchTerm);
  }
}

export default class SecondActivity extends React.Component {
  static navigationOptions = {
    title:"SecondActivity"
  };
  //var {navigate}
  constructor(props){
    super(props);
    this.state ={ isLoading: true}
    console.log(key);
    goToCategoryView = () => {
    //Replace here push with resetTo

}

    const defaultGetStateForAction = AppNavigator.router.getStateForAction;

    AppNavigator.router.getStateForAction = (action, state) => {
    const screen = state ? state.routes[state.index] : null;
    const tab = screen && screen.routes ? screen.routes[screen.index] : null;
    const tabScreen = tab && tab.routes ? tab.routes[tab.index] : null;

    if (
        action.type === NavigationActions.BACK &&
        tab && tab.routeName === 'LogIn' &&
        tabScreen && tabScreen.routeName === 'events'
    ) {
        return null;

    }
  }

    this.removeItem = this.removeItem.bind(this);
    this.searchValue = this.searchValue.bind(this);
    this.onSort = this.onSort.bind(this);
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


class SearchText extends React.Component{
  componentDidMount(){
    this.input.focus();
  }
  render(){
    const {onChangeText} = this.props;

      return (
        <TextInput
          style={{width: 100,height: 40}}
          placeholder="Search..."
          onChangeText={onChangeText}
          ref = {(node) => {this.input = node}}
        />
      )
  }
}


class Loading extends React.Component{

  render(){
    const {onChangeText} = this.props;
      return (
       <View><Text>Loading...</Text></View>
      )
  }
}



class TableComponent extends React.Component{
  render(){
    const {onChangeText, removeItem, state, sortKey, onSort} = this.props;
      state.dataSource = onSort(state.dataSource, sortKey, false);

      return (

        state.isLoading ? <Loading/> :
        <FlatList
          data={state.dataSource}
          renderItem={({item}) => <View><Text>{item.title}, {item.releaseYear}</Text>
        <Button title="test" onPress={
            () => alert(item.title)
        }/>
        <Button title="delete"
        margin="10"
        onPress={
            () => removeItem(item.title)
        }/>
        </View>}
          keyExtractor={(item, index) => index}
        />
      )
  }
}

TableComponent.propTypes = {
  onChangeText: PropTypes.func,
  state:PropTypes.object.isRequired
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

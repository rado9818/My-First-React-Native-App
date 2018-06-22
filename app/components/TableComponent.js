import React from 'react';
import {
  Text,
  TextInput,
  View,
  Button,
   FlatList} from 'react-native';
import PropTypes from 'prop-types';
import LoadingComponent from './LoadingComponent';

export default class TableComponent extends React.Component{
  render(){
    const {onChangeText, removeItem, state, sortKey, onSort} = this.props;
      state.dataSource = onSort(state.dataSource, sortKey, false);

      return (

        state.isLoading ? <LoadingComponent/> :
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

import React from 'react';
import {
  TextInput
} from 'react-native';

export default class SearchText extends React.Component{
  componentDidMount(){
    this.input.focus();
  }
  render(){
    const {onChangeText} = this.props;

    console.log("This should be our event ", onChangeText);

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
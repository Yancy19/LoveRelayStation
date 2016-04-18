/**
 * Yancy 2016-3-20
 */
'use strict';
import React, {
  Component,
  StyleSheet,
  View,
  Text
} from 'react-native';
import DropDown,{
  Select,
  Option,
  OptionList
} from 'react-native-selectme'

export default class MySelect extends Component {
  constructor(props){
    super(props);
    this.state={
      canada: ''
    };
  };
  _getOptionList() {
    return this.refs['OPTIONLIST'];
  }
  _canada(province) {

  this.setState({
      canada: province
    });
  }
  render(){
    return(
      <View>
        <Select
          width={deviceWidth}
          ref="SELECT1"
          optionListRef={this._getOptionList.bind(this)}
          defaultValue="Select a Province in Canada ..."
          onSelect={this._canada.bind(this)}
          height={40}
          style={{justifyContent:'flex-start'}}
          >
          <Option value = {{id : "alberta"}}>Alberta</Option>
          <Option value>British Columbia</Option>
          <Option>Manitoba</Option>
          <Option>New Brunswick</Option>
          <Option>Newfoundland and Labrador</Option>
          <Option>Northwest Territories</Option>
          <Option>Nova Scotia</Option>
          <Option>Nunavut</Option>
          <Option>Ontario</Option>
          <Option>Prince Edward Island</Option>
          <Option>Quebec</Option>
          <Option>Saskatchewan</Option>
          <Option>Yukon</Option>
        </Select>

        <Text>Selected Canada province: {this.state.canada}</Text>

        <OptionList ref="OPTIONLIST"/>
      </View>
    );
  }
}

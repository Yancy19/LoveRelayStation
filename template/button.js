/**
 * Yancy 2016-3-16
 */
'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';
export default class Button extends Component {
  constructor(props) {
    super(props);
    this.setState={
      status:0,
    }
  }
  _onPresee=()=>{
    const { click }=this.props;
    click();
  };
  render(){
    // 解构
    const { text,bColor }=this.props
    return(
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button,{backgroundColor:bColor}]}
          onPress={this._onPresee}
        >
          <Text style={styles.buttonText} >{this.props.text}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles=StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button:{
    height:40,
    width:150,
    borderRadius:20,
    backgroundColor:'green',
    justifyContent:'center',
    overflow:'hidden'
  },
  buttonText:{
    textAlign:'center',
    color:'white'
  },

});

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
  TouchableOpacity,
} from 'react-native';

import Button from './button';
import Registered from './registered';
import Index from './index';
import {LogoImg} from './logoImg';
export default class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      UserName:null,
      Password:null,
    }
  }
  _registered=()=>{
    const { navigator } = this.props;
    navigator.replace({
        name: "注册",
        component: Registered,
    });
  };
  _login=()=>{
    fetch(Url+'/api/Member/Login?userName='+this.state.UserName+'&password='+this.state.Password,{
      method:'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((response)=>response.json())
    .then((responseDate)=>{
      if(responseDate.success){
        storage.save({
          key: 'loginState',   // Note: Do not use underscore("_") in key!
          rawData: { 
            id:responseDate.data.Id,
            userName: responseDate.data.UserName,
            password: responseDate.data.Password,
            type: responseDate.data.Type,
          },
          // if not specified, the defaultExpires will be applied instead.
          // if set to null, then it will never expires.
          expires: 1000 * 3600
        });
        const { navigator } = this.props;
        navigator.replace({
            name: "welcome",
            component: Index,
        });
      }
      else{
        alert(responseDate.msg);
      }
      
    })
    .done();
  };
  render(){
    const { name }=this.props;
    return (
      <View>
        <View style={{flexDirection:'row',height:50,padding:10,backgroundColor:'green'}}>
          <View style={{flex:1}} />
          <Text style={{flex:1,fontSize:20,color:'white',textAlign:'center'}}>{name}</Text>
          <TouchableOpacity
            style={{flex:1,  alignItems:'flex-end',}}
            onPress={this._registered}
          >
            <Text style={{fontSize:20,color:'white'}}>注册</Text>
          </TouchableOpacity>
        </View>
        <View>
          <LogoImg/>
        </View>
        <View style={styles.row}>
          <View style={{flex:1}}>
            <TextInput
              style={{height:40}}
              placeholder="请输入用户名"
              onChangeText={(text) => this.setState({UserName: text})}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={{flex:1}}>
            <TextInput
              style={{height:40}}
              placeholder="请输入密码"
              secureTextEntry ={true}
              onChangeText={(text) => this.setState({Password: text})}
            />
          </View>
        </View>
        <View>
          <Button bColor="green" text="登陆" click={this._login}></Button>
        </View>
      </View>
    );
  }
};

const styles=StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    // flexDirection:'row'
  },
  text:{
    // flex:1,
    // flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'flex-start',
  },
  textInput:{
    // flex:1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  },
  row:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // paddingLeft:deviceWidth/2,
    // marginLeft:-150
  },
});

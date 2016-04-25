/**
 * Yancy 2016-3-16
 */
'use strict';
import React, {
  Component,
  StyleSheet,
  Dimensions,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

import Login from './login';
import Index from './index';
import Button from './button';
import {LogoImg} from './logoImg';
export default class Registered extends Component {
  constructor(props){
    super(props);
    this.state={
      UserName:null,
      Password:null,
      UserType:0,
    }
  }
  _goBack=()=>{
    const { navigator } = this.props;
    navigator.replace({
        name: "登陆",
        component: Login,
    });
  };
  fetchDate=()=>{
    fetch(Url+'api/Member/Register',{
        method:'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          UserName:this.state.UserName,
          Password:this.state.Password,
          Type:this.state.UserType,
        })
      })
      .then((response)=>response.json())
      .then((responseDate)=>{
        if(responseDate.success){
          const { navigator } = this.props;
          navigator.replace({
              name: "登陆",
              component: Login,
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
          <TouchableOpacity
            style={{flex:1}}
            onPress={this._goBack}
          >
            <Text style={{fontSize:20,color:'white'}}>返回</Text>
          </TouchableOpacity>
          <Text style={{flex:1,fontSize:20,color:'white',textAlign:'center'}}>{name}</Text>
          <View style={{flex:1,}}/>
        </View>
        <LogoImg/>
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
        <View style={{flex:1,flexDirection:'row'}}>
          <TouchableOpacity
            style={{flex:1,alignItems:'flex-end',padding:10}}
            onPress={()=>{this.setState({UserType: 0})}}>
            <View style={{flexDirection:'row',backgroundColor:'green',alignItems:'center'}}>
              <FontAwesome
                name='check'
                size={15}
                color={this.state.UserType==0?'white':'gray'}/>
              <Text style={{color:'white'}}>个人</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex:1,alignItems:'flex-start',padding:10}}
            onPress={()=>{this.setState({UserType: 1})}}>
            <View style={{flexDirection:'row',backgroundColor:'green',alignItems:'center'}}>
              <FontAwesome
                name='check'
                size={15}
                color={this.state.UserType==1?'white':'gray'}/>
              <Text style={{color:'white'}}>企业</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <Button bColor="green" text="注册" click={()=>this.fetchDate()}></Button>
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
  }
});

/**
 * Yancy 2016-4-21
 */
'use strict';
import React, {
  Component,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput
} from 'react-native';
var FontAwesome = require('react-native-vector-icons/FontAwesome');

import OldStuffIndex from './oldStuffIndex';
import Button from './../../template/button';
export default class Add extends Component {
  constructor(props){
    super(props);
    this.state={
      Name: null,
      Introduction:null,
      MemberId:null,
      ProvideName:null,
      ProvidePhone:null,
      ProvideAddress:null,
    };
  };

  _goBack=()=>{
    const { navigator } = this.props;
    navigator.pop();
    navigator.replace({
        name: '旧物回收站',
        component: OldStuffIndex,
        params:{
          URL:'/api/OldStuff',
        },
    });
  };
  _submit=()=>{
    console.log(this.state);
    fetch(Url+'api/OldStuff',{
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        Name: this.state.Name,
        Introduction: this.state.Introduction,
        MemberId: this.state.MemberId,
        ProvideName:this.state.ProvideName,
        ProvidePhone:this.state.ProvidePhone,
        ProvideAddress:this.state.ProvideAddress,
      })
    })
    .then((response)=>response.json())
    .then((responseDate)=>{
      this._goBack();
    })
    .done();
  };
  componentDidMount(){
    storage.load({
      key: 'loginState',
      autoSync: true,
      syncInBackground: true,
    }).then( ret => {
        this.setState({
          MemberId:ret.id,
        });
    }).catch( err => {
        // navigator.replace({
        //     name: "登陆",
        //     component: Login,
        // });
    });
  }
  render(){
    const { name }=this.props;
    return(
      <View>
        <View style={{flexDirection:'row',height:50,padding:10,backgroundColor:'green'}}>
          <TouchableOpacity
            style={{flex:1}}
            onPress={this._goBack}
          >
            <FontAwesome
              name='angle-left'
              size={35}
              color='white'
              style={[styles.beer,{width:35,height:35,marginTop:-5}]}/>
          </TouchableOpacity>
          <Text style={{flex:2,fontSize:20,color:'white',textAlign:'center'}}>{name}</Text>
          <TouchableOpacity
            style={{flex:1,  alignItems:'flex-end',}}
          >
          </TouchableOpacity>
        </View>
        <View>
          <TextInput
            style={{height:40}}
            placeholder="旧物名称"
            onChangeText={(text) => this.setState({Name: text})} />
          <TextInput
            style={{height:40}}
            placeholder="旧物说明"
            onChangeText={(text) => this.setState({Introduction: text})} />
          <TextInput
            style={{height:40}}
            placeholder="提供者姓名"
            onChangeText={(text) => this.setState({ProvideName: text})} />
            <TextInput
            style={{height:40}}
            placeholder="提供者电话"
            onChangeText={(text) => this.setState({ProvidePhone: text})} />
            <TextInput
            style={{height:40}}
            placeholder="提供者地址"
            onChangeText={(text) => this.setState({ProvideAddress: text})} />
        </View>
        <View>
          <Button bColor="green" text="提交" click={this._submit}></Button>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  Radius:{
    width:50,
    height:50,
    borderRadius:25,
    borderWidth:1,
    alignItems:'center',
    justifyContent:'center',
    borderColor:'#D8D8D8',
  },
  header:{
    flexDirection:'row',
    backgroundColor:'#69C01B',
    padding:5,
  },
  tags:{
    flexDirection:'row',
    backgroundColor:'#FFFFFF',
    padding:5,
  }
})

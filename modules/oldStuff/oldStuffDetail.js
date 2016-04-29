/**
 * Yancy 2016-3-29
 */
'use strict';
import React, {
  Component,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView
} from 'react-native';
var FontAwesome = require('react-native-vector-icons/FontAwesome');

import OldStuffIndex from './oldStuffIndex';
import Button from './../../template/button';
export default class Detail extends Component {
  constructor(props){
    super(props);
    this.state={
      OldStuffId:null,
      Name: null,
      Introduction:null,
      MemberId:null,
      ProvideName:null,
      ProvidePhone:null,
      ProvideAddress:null,
      UserId:null,
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
  _deleteBook=()=>{
    fetch(Url+'api/OldStuff/'+this.state.OldStuffId,{
      method:'Delete'
    })
    .then((response) => response.json())
    .then((responseData) => {
      if(responseData.success){
        this._goBack();
      }
      else{
        alert(responseDate.msg);
      }
      
    })
    .done();
  };
  componentDidMount(){
    this.setState({
      OldStuffId:this.props.Data.Id,
      Name: this.props.Data.Name,
      Introduction:this.props.Data.Introduction,
      MemberId:this.props.Data.MemberId,
      ProvideName:this.props.Data.ProvideName,
      ProvidePhone:this.props.Data.ProvidePhone,
      ProvideAddress:this.props.Data.ProvideAddress,
      UserId:this.props.User.id,
    });
  }
  render(){
    const { name }=this.props
    return(
      <ScrollView>
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
        <View style={{flexDirection:'row',padding:20}}>
          <Text style={{fontSize:15}}>旧物名称:</Text>
          <Text style={{fontSize:15}}>{this.state.Name}</Text>
        </View>
        <View style={{flexDirection:'row',padding:20}}>
          <Text style={{fontSize:15}}>旧物说明:</Text>
          <Text style={{fontSize:15}}>{this.state.Introduction}</Text>
        </View>
        <View style={{flexDirection:'row',padding:20}}>
          <Text style={{fontSize:15}}>提供者姓名:</Text>
          <Text style={{fontSize:15}}>{this.state.ProvideName}</Text>
        </View>
        <View style={{flexDirection:'row',padding:20}}>
          <Text style={{fontSize:15}}>提供者联系电话:</Text>
          <Text style={{fontSize:15}}>{this.state.ProvidePhone}</Text>
        </View>
        <View style={{flexDirection:'row',padding:20}}>
          <Text style={{fontSize:15}}>提供者住址:</Text>
          <Text style={{fontSize:15}}>{this.state.ProvideAddress}</Text>
        </View>
        <View>
          {
            this.state.MemberId==this.state.UserId
            ?
            <Button bColor="green" text="取消捐赠" click={()=>this._deleteBook()}></Button>
            :
            null
          }
        </View>
      </ScrollView>
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

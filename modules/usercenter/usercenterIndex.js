/**
 * Yancy 2016-4-4
 */
'use strict';
import React, {
  Component,
  StyleSheet,
  Dimensions,
  View,
  ScrollView,
  TouchableOpacity,
  Text
} from 'react-native';
var FontAwesome = require('react-native-vector-icons/FontAwesome');

// let deviceWidth=Dimensions.get('window').width;

import BookIndex from './../book/bookIndex';
import WorkIndex from './../work/workIndex';
import OldStuffIndex from './../oldStuff/oldStuffIndex';

export default class Index extends Component {
  constructor(props){
    super(props);
    this.state={
      UserName:null,
      UserId:null,
      UserType:null,
    };
  };
  _onPress=(name,component,url)=>{
    const { navigator } = this.props;
    navigator.push({
        name: name,
        component: component,
        params:{
          URL:url+this.state.UserId,
        },
    })
  };
  _goBack=()=>{
    const { navigator } = this.props;
    navigator.pop();
    // navigator.replace({
    //     name: '爱心图书',
    //     component: BookIndex,
    // });
  };
  _Personal=()=>{
    return(
      <View>
        <View style={{borderBottomWidth :1}}>
          <View >
            <Text style={{fontSize:20,textAlign:'center'}}>爱心图书角</Text>
          </View>
          <View style={{flexDirection:'row',justifyContent:'center'}}>
            <View style={{flex:1,alignItems:'center'}}>
              <TouchableOpacity 
                style={{alignItems:'center'}}
                onPress={()=>this._onPress('借阅图书',BookIndex,'/api/Book/BorrowBook?memberId=')}
              >
                <View style={[styles.Radius,{flexDirection:'row'}]}>
                  <FontAwesome
                    name='cloud-download'
                    size={20}
                    color='white'/>
                </View>
                <Text style={{fontSize:15}}>借阅</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex:1,alignItems:'center'}}>
              <TouchableOpacity 
                style={{alignItems:'center'}}
                onPress={()=>this._onPress('捐赠图书',BookIndex,'/api/Book/ProivideBook?memberId=')}
              >
                <View style={[styles.Radius,{flexDirection:'row'}]}>
                  <FontAwesome
                    name='cloud-upload'
                    size={20}
                    color='white'/>
                </View>
                <Text style={{fontSize:15}}>捐赠</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{borderBottomWidth :1}}>
          <View >
            <Text style={{fontSize:20,textAlign:'center'}}>勤工助学岗</Text>
          </View>
          <View style={{flexDirection:'row',justifyContent:'center'}}>
            <View style={{flex:1,alignItems:'center'}}>
              <TouchableOpacity 
                style={{alignItems:'center'}}
                onPress={()=>this._onPress('我的求职',WorkIndex,'/api/Work?memberId=')}
              >
                <View style={[styles.Radius,{flexDirection:'row'}]}>
                  <FontAwesome
                    name='search'
                    size={20}
                    color='white'/>
                </View>
                <Text style={{fontSize:15}}>求职</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex:1,alignItems:'center'}}></View>
          </View>
        </View>
        <View style={{borderBottomWidth :1}}>
          <View >
            <Text style={{fontSize:20,textAlign:'center'}}>旧物回收站</Text>
          </View>
          <View style={{flexDirection:'row',justifyContent:'center'}}>
            <View style={{flex:1,alignItems:'center'}}>
              <TouchableOpacity 
                style={{alignItems:'center'}}
                onPress={()=>this._onPress('旧物',OldStuffIndex,'/api/OldStuff?memberId=')}
              >
                <View style={[styles.Radius,{flexDirection:'row'}]}>
                  <FontAwesome
                    name='trash'
                    size={20}
                    color='white'/>
                </View>
                <Text style={{fontSize:15}}>旧物</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex:1,alignItems:'center'}}></View>
          </View>
        </View>
      </View>
      
    );
  };
  _Enterprise=()=>{
    return(
      <View style={{borderBottomWidth :1}}>
        <View >
          <Text style={{fontSize:20,textAlign:'center'}}>勤工助学岗</Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'center'}}>
          <View style={{flex:1,alignItems:'center'}}>
            <TouchableOpacity 
              style={{alignItems:'center'}}
              onPress={()=>this._onPress('我的招聘',WorkIndex,'/api/Work?memberId=')}
            >
              <View style={[styles.Radius,{flexDirection:'row'}]}>
                <FontAwesome
                  name='search'
                  size={20}
                  color='white'/>
              </View>
              <Text style={{fontSize:15}}>招聘</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex:1,alignItems:'center'}}></View>
        </View>
     </View>
    );
  };
  componentDidMount(){
    storage.load({
      key: 'loginState',
      autoSync: true,
      syncInBackground: true,
    }).then( ret => {
        this.setState({
          UserName:ret.userName,
          UserId:ret.id,
          UserType:ret.type,
        });
    }).catch( err => {
    });
  }
  render(){
    const { name }=this.props;
    return(
      <ScrollView>
        <View style={{flexDirection:'row',height:50,padding:10,backgroundColor:'green'}}>
          <TouchableOpacity
            style={{flex:1,flexDirection:'row'}}
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
          <View style={{borderBottomWidth :1}}>
            <View>
              <Text style={{fontSize:20,textAlign:'center'}}>当前用户信息</Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'center'}}>
              <View style={{flex:1,alignItems:'flex-end',padding:5}}>
                <Text style={{fontSize:15}}>账号:</Text>
                <Text style={{fontSize:15}}>类型:</Text>
              </View>
              <View style={{flex:1,alignItems:'flex-start',padding:5}}>
                <Text style={{fontSize:15}}>{this.state.UserName}</Text>
                <Text style={{fontSize:15}}>
                  {this.state.UserType==0?'个人':'企业'}
                </Text>
              </View>
            </View>
          </View>
          {this.state.UserType==0?this._Personal():this._Enterprise()}
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  Radius:{
    flex:1,
    width:40,
    height:40,
    borderRadius:20,
    borderWidth:1,
    alignItems:'center',
    justifyContent:'center',
    borderColor:'#D8D8D8',
    backgroundColor:'#8358F2',
  },
})

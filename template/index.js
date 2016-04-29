/**
 * Yancy 2016-3-20
 */
'use strict';
import React, {
  Component,
  StyleSheet,
  Dimensions,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Platform,
  BackAndroid,
  ToastAndroid,
} from 'react-native';
global.FontAwesome = require('react-native-vector-icons/FontAwesome');
global.deviceWidth=Dimensions.get('window').width;
// import Default from './default';
// 登录
import Login from './login';
// 爱心图书角
import BookIndex from './../modules/book/bookIndex';
// 勤工助学岗
import WorkIndex from './../modules/work/workIndex';
// 旧物回收站
import OldStuffIndex from './../modules/oldStuff/oldStuffIndex';
// 个人中心
import UsercenterIndex from './../modules/usercenter/usercenterIndex';

import {LogoImg} from './logoImg';
import {Developing} from './error';
export default class Index extends Component {
  constructor(props){
    super(props);
    this.state={
      UserType:null,
    };
  };
  _onPress=(name,component,url='')=>{
    const { navigator } = this.props;
    navigator.push({
        name: name,
        component: component,
        params:{
          URL:url,
        },
    })
  };
  _loginOut=()=>{
    storage.remove({
        key: 'loginState'
    });
    const { navigator } = this.props;
    // let navigatorLsit=navigator.getCurrentRoutes();
    // alert(navigatorLsit);
    // navigator.popToRoute(navigatorLsit[1])
    // navigator.push({
    //     name: name,
    //     component: component,
    //     params:{
    //       BookData:bookData
    //     }
    // });
    // navigator.popToTop();
    navigator.push({
        name: '登陆',
        component: Login,
    });
  };
  _Personal=()=>{
    return(
      <View>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={()=>this._onPress('爱心图书角',BookIndex,'/api/Book')} style={styles.Radius}>
            <Text style={{fontSize:15}}>爱心图书角</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this._onPress('勤工助学岗',WorkIndex,'/api/Work')} style={styles.Radius}>
            <Text style={{fontSize:15}}>勤工助学岗</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={()=>this._onPress('旧物回收站',OldStuffIndex,'/api/OldStuff')} style={styles.Radius}>
            <Text style={{fontSize:15}}>旧物回收站</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this._onPress('希望义卖坊',Developing,'')} style={styles.Radius}>
            <Text style={{fontSize:15}}>希望义卖坊</Text>
          </TouchableOpacity>
        </View>
      </View>
      
    );
  };
  _Enterprise=()=>{
    return(
      <View>
        <TouchableOpacity onPress={()=>this._onPress('勤工助学岗',WorkIndex,'/api/Work')} style={styles.Radius1}>
            <View>
              <Text style={{fontSize:15}}>勤工助学岗</Text>
            </View>
        </TouchableOpacity>
      </View>
    );
  };
  onBackAndroid = () => {
    const nav = this.props.navigator;
    const routers = nav.getCurrentRoutes();
    if (routers.length > 1) {
      nav.pop();
      return true;
    }
    // return true;
    if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
      //最近2秒内按过back键，可以退出应用。
      return false;
    }
    this.lastBackPressed = Date.now();
    ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT);
    return true;
  };
  componentWillMount() {
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }
  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }
  componentDidMount(){
    
    storage.load({
      key: 'loginState',
      autoSync: true,
      syncInBackground: true,
    }).then( ret => {
        this.setState({
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
            style={{flex:1}}
            onPress={()=>this._onPress('个人中心',UsercenterIndex)}
          >
            <FontAwesome
              name='user'
              size={30}
              color='white'
              style={{width:30,height:50}}/>
          </TouchableOpacity>
          <Text style={{flex:1,fontSize:20,color:'white',textAlign:'center'}}>爱心接力站</Text>
          <TouchableOpacity
            style={{flex:1,  alignItems:'flex-end',}}
            onPress={this._loginOut}
          >
            <Text style={{fontSize:20,color:'white'}}>注销</Text>
          </TouchableOpacity>
        </View>
        <View>
          <LogoImg/>
        </View>
        {this.state.UserType==0?this._Personal():this._Enterprise()}
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  Radius:{
    flex:1,
    // width:50,
    height:deviceWidth/4,
    borderRadius:5,
    borderWidth:2,
    alignItems:'center',
    justifyContent:'center',
    borderColor:'#438962',
    padding:5,
  },
  header:{
    flexDirection:'row',
    backgroundColor:'#69C01B',
    padding:5,
  },
  Radius1:{
    flex:1,
    borderRadius:5,
    borderWidth:2,
    alignItems:'center',
    justifyContent:'center',
    borderColor:'#438962',
    padding:5,
  },
})

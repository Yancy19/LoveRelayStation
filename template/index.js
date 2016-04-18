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
  Text
} from 'react-native';
let deviceWidth=Dimensions.get('window').width;
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

export default class Index extends Component {
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
  render(){
    const { name }=this.props;
    return(
      <ScrollView>
        <View style={{flexDirection:'row',height:50,padding:10,backgroundColor:'green'}}>
          <TouchableOpacity
            style={{flex:1}}
            onPress={()=>this._onPress('个人中心',UsercenterIndex)}
          >
            <Text style={{fontSize:20,color:'white'}}>个人中心</Text>
          </TouchableOpacity>
          <Text style={{flex:1,fontSize:20,color:'white',textAlign:'center'}}>{name}</Text>
          <TouchableOpacity
            style={{flex:1,  alignItems:'flex-end',}}
            onPress={this._loginOut}
          >
            <Text style={{fontSize:20,color:'white'}}>注销</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={()=>this._onPress('爱心图书',BookIndex,'/api/Book')} style={styles.Radius}>
              <View>
                <Text style={{fontSize:15}}>爱心图书角</Text>
              </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={()=>this._onPress('勤工助学岗',WorkIndex,'/api/Work')} style={styles.Radius}>
              <View>
                <Text style={{fontSize:15}}>勤工助学岗</Text>
              </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={()=>this._onPress('旧物回收站',OldStuffIndex,'/api/OldStuff')} style={styles.Radius}>
              <View>
                <Text style={{fontSize:15}}>旧物回收站</Text>
              </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  Radius:{
    flex:1,
    // width:50,
    height:50,
    borderRadius:5,
    borderWidth:2,
    alignItems:'flex-start',
    justifyContent:'center',
    borderColor:'#438962',
    padding:5,
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
  },
  imgs:{
    flex:1,
    width:deviceWidth,
    height:200,
    marginBottom:5,
  },
})

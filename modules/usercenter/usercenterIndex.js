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
let deviceWidth=Dimensions.get('window').width;

import BookIndex from './../book/bookIndex';
// import UsercenterIndex from './../modules/usercenter/usercenterIndex'
export default class Index extends Component {
  constructor(props){
    super(props);
    this.state={
      UserName:null,
      UserId:null,
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
  componentDidMount(){
    storage.load({
      key: 'loginState',
      autoSync: true,
      syncInBackground: true,
    }).then( ret => {
        this.setState({
          UserName:ret.userName,
          UserId:ret.id,
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
            onPress={this._goBack}
          >
            <Text style={{fontSize:20,color:'white'}}>返回</Text>
          </TouchableOpacity>
          <Text style={{flex:1,fontSize:20,color:'white',textAlign:'center'}}>{name}</Text>
          <TouchableOpacity
            style={{flex:1,  alignItems:'flex-end',}}
            onPress={()=>this._goToAddBook("新增读物",AddBook)}
          >
          </TouchableOpacity>
        </View>
        <View>
          <View style={{flexDirection:'row',justifyContent:'center'}}>
            <Text style={{fontSize:20}}>账号:</Text>
            <Text style={{fontSize:20}}>{this.state.UserName}</Text>
          </View>
          <View style={{borderWidth:1}}>
            <View style={{borderBottomWidth:1,justifyContent:'center'}}>
              <Text style={{fontSize:20}}>图书</Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'center'}}>
              <View >
                <TouchableOpacity 
                  style={[styles.Radius,{flexDirection:'row'}]}
                  onPress={()=>this._onPress('借阅图书',BookIndex,'/api/Book/BorrowBook?memberId=')}
                >
                  <Text style={{fontSize:15}}>我借阅</Text>
                </TouchableOpacity>
              </View>
              <View >
                <TouchableOpacity 
                  style={[styles.Radius,{flexDirection:'row'}]}
                  onPress={()=>this._onPress('捐赠图书',BookIndex,'/api/Book/ProivideBook?memberId=')}
                >
                  <Text style={{fontSize:15}}>我捐赠</Text>
                </TouchableOpacity>
              </View>
              
            </View>
          </View>
          
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  Radius:{
    flex:1,
    width:80,
    height:80,
    borderRadius:40,
    borderWidth:1,
    alignItems:'center',
    justifyContent:'center',
    borderColor:'#D8D8D8',
    backgroundColor:'gray',
  },
})

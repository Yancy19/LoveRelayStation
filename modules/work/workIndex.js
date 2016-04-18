/**
 * Yancy 2016-4-17
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
  ListView
} from 'react-native';
// let deviceWidth=Dimensions.get('window').width;
import AddWork from './addWork';
import WorkDetail from './workDetail';
export default class Index extends Component {
  constructor(props){
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state={
      dataSource: ds,
      loaded:false,
      User:null,
    };
  };
  _goToAdd=(name,component)=>{
    const { navigator } = this.props;
    navigator.replace({
        name: name,
        component: component,
    })
  };
  _goToDetail=(name,component,Data)=>{
    const { navigator } = this.props;
    navigator.replace({
        name: name,
        component: component,
        params:{
          Data:Data,
          User:this.state.User,
        }
    })
  };
  _goBack=()=>{
    const { navigator } = this.props;
    navigator.pop();
  };
  _fetchDate=(url)=>{
    // this.setState({
    //   dataSource: this.state.dataSource.cloneWithRows(['row 1', 'row 2']),
    //   loaded: true,
    // });
    // fetch(Url+'/api/Book'+url)
    fetch(Url+url)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        });
      })
      .done();
  };
  _canBorrow=(data)=>{
    alert(data.Id);
  };
  _RendToview=(data)=>{
    return(
      <View >
        <TouchableOpacity
          onPress={()=>this._goToDetail("勤工助学信息",WorkDetail,data)}
          style={{flexDirection:'row',padding:20,borderTopWidth :5,borderColor:'#DDDDDE'}}
        >
          <View style={{flex:2}}>
            <Text style={{fontSize:15}}>{data.Title}</Text>
          </View>
          <View style={{flex:1}}>
            <Text style={{fontSize:15,textAlign:'right'}}>查看详情</Text>
          </View>
        </TouchableOpacity>
        
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
          User:ret,
        });
    }).catch( err => {
        // navigator.replace({
        //     name: "登陆",
        //     component: Login,
        // });
    });
    this._fetchDate(this.props.URL);
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
            onPress={()=>this._goToAdd("发布求职信息",AddWork)}
          >
            <Text style={{fontSize:20,color:'white'}}>发布求职信息</Text>
          </TouchableOpacity>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData)=>this._RendToview(rowData)}
        />
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

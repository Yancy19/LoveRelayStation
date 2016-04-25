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
  ListView,
  ProgressBarAndroid,
} from 'react-native';
var FontAwesome = require('react-native-vector-icons/FontAwesome');

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
      hasData:true,
    };
  };
  _goToAdd=(name,component)=>{
    if(this.state.User.type==1){
      name='发布招聘信息';
    }
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
        if(responseData.length==0){
          this.setState({
            hasData:false,
          });
        }
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
          onPress={()=>this._goToDetail("勤工助学岗",WorkDetail,data)}
          style={{flexDirection:'row',padding:20,borderTopWidth :5,borderColor:'#DDDDDE'}}
        >
          <View style={{flex:2}}>
            <Text style={{fontSize:15}}>{data.Title}</Text>
          </View>
          <View style={{flex:1,alignItems:'flex-end'}}>
            <FontAwesome
              name='angle-right'
              size={35}
              color='gray'
              style={[styles.beer,{width:35,height:35,marginTop:-7}]}/>
          </View>
        </TouchableOpacity>
        
      </View>
    );
  };
  _NoData=()=>{
    return(
      <View
       style={{alignItems:'center',padding:20,borderTopWidth :5,borderColor:'#DDDDDE'}}>
        <Text>暂无数据</Text>
      </View>
    );
  };
  _renderLoadingView=()=>{
    return(
      <View style={styles.container}>
        <ProgressBarAndroid styleAttr="Inverse" />
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
            <FontAwesome
              name='angle-left'
              size={35}
              color='white'
              style={[styles.beer,{width:35,height:35,marginTop:-5}]}/>
          </TouchableOpacity>
          <Text style={{flex:2,fontSize:20,color:'white',textAlign:'center'}}>{name}</Text>
          <TouchableOpacity
            style={{flex:1,  alignItems:'flex-end',}}
            onPress={()=>this._goToAdd("发布求职信息",AddWork)}
          >
            <FontAwesome
              name='plus'
              size={20}
              color='white'
              style={{width:30,height:50,marginTop:5}}/>
          </TouchableOpacity>
        </View>
        {
          this.state.loaded==false?this._renderLoadingView():
            <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData)=>this._RendToview(rowData)}/>
        }
        {this.state.hasData==true?null:this._NoData()}
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

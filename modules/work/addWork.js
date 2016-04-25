/**
 * Yancy 2016-4-17
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

// import Select from './../../template/select'
import WorkIndex from './workIndex';
import Button from './../../template/button';
export default class Add extends Component {
  constructor(props){
    super(props);
    this.state={
      // Name: '',
      // Author:'',
      // Classify:0,
      // FaceToPeople:0,
      // Level:0,
      MemberId:0,
      Position:null,
      WorkingTime:null,
      WorkingAddress:null,
      Salary:null,
      Number:null,
      Title:null,
      Description:null,
      UserType:null,
      // ProvideName:null,
      // ProvidePhone:null,
      // ProvideAddress:null,
    };
  };

  _goBack=()=>{
    const { navigator } = this.props;
    navigator.replace({
        name: '勤工助学岗',
        component: WorkIndex,
        params:{
          URL:'/api/Work',
        },
    });
  };
  _submit=()=>{
    console.log(this.state);
    fetch(Url+'api/Work',{
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        MemberId:this.state.MemberId,
        Position:this.state.Position,
        WorkingTime:this.state.WorkingTime,
        WorkingAddress:this.state.WorkingAddress,
        Salary:this.state.Salary,
        Number:this.state.Number,
        Title:this.state.Title,
        Description:this.state.Description,
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
          UserType:ret.type,
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
            placeholder="标题"
            onChangeText={(text) => this.setState({Title: text})} />
          <TextInput
            style={{height:40}}
            placeholder="职位"
            onChangeText={(text) => this.setState({Position: text})} />
          <TextInput
            style={{height:40}}
            placeholder="工作时间"
            onChangeText={(text) => this.setState({WorkingTime: text})} />
          <TextInput
            style={{height:40}}
            placeholder="工作地点"
            onChangeText={(text) => this.setState({WorkingAddress: text})} />
          <TextInput
            style={{height:40}}
            placeholder="薪资"
            onChangeText={(text) => this.setState({Salary: text})} />
          {
            this.state.UserType==0?null:
              <TextInput
                style={{height:40}}
                placeholder="人数"
                onChangeText={(text) => this.setState({Number: text})} />
          }
          
          <TextInput
            style={{height:40}}
            placeholder="备注"
            onChangeText={(text) => this.setState({Description: text})} />
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

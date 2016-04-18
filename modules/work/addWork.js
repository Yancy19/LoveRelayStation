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
import DropDown,{
  Select,
  Option,
  OptionList
} from 'react-native-selectme'

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
      // Storage:null,
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
  _getOptionList() {
    return this.refs['OPTIONLIST'];
  }
  _canada(optionText,optionValue,selectName) {//2016-3-20 添加参数text，<Option value=''>text</Option>,同时修改了react-native-selectme/lib/select.js
    if(selectName=='分类'){
      this.setState({
          Classify: optionValue
        });
    }
    else if(selectName=='新旧程度'){
      this.setState({
          Level: optionValue
        });
    }
    else if(selectName=='面向人群'){
      this.setState({
          FaceToPeople: optionValue
        });
    }

  }
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
            <Text style={{fontSize:20,color:'white'}}>返回</Text>
          </TouchableOpacity>
          <Text style={{flex:1,fontSize:20,color:'white',textAlign:'center'}}>{name}</Text>
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
          <TextInput
            style={{height:40}}
            placeholder="人数"
            onChangeText={(text) => this.setState({Number: text})} />
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

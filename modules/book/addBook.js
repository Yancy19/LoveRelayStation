/**
 * Yancy 2016-3-20
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
import BookIndex from './bookIndex';
import Button from './../../template/button';
export default class Add extends Component {
  constructor(props){
    super(props);
    this.state={
      Name: '',
      Author:'',
      Classify:0,
      FaceToPeople:0,
      Level:0,
      MemberId:0,
      Storage:null,
      ProvideName:null,
      ProvidePhone:null,
      ProvideAddress:null,
    };
  };

  _goBack=()=>{
    const { navigator } = this.props;
    navigator.replace({
        name: '爱心图书',
        component: BookIndex,
        params:{
          URL:'/api/Book',
        },
    });
  };
  _submit=()=>{
    console.log(this.state);
    fetch(Url+'api/Book',{
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        Name: this.state.Name,
        Author: this.state.Author,
        Classify: this.state.Classify,
        FaceToPeople: this.state.FaceToPeople,
        Level: this.state.Level,
        MemberId: this.state.MemberId,
        Storage:this.state.Storage,
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
            onPress={()=>this._goToAddBook("新增读物",AddBook)}
          >
          </TouchableOpacity>
        </View>
        <View>
          <TextInput
            style={{height:40}}
            placeholder="书名"
            onChangeText={(text) => this.setState({Name: text})} />
          <TextInput
            style={{height:40}}
            placeholder="作者"
            onChangeText={(text) => this.setState({ProvideAddress: text})} />
          <View>
            <Select
              width={deviceWidth}
              ref="SELECT1"
              optionListRef={this._getOptionList.bind(this)}
              defaultValue="分类"
              onSelect={this._canada.bind(this)}
              // onSelect={()=>this._canada('3333')}
              height={40}
              style={{justifyContent:'flex-start'}}
              >
              <Option value="0">文学巨作</Option>
              <Option value="1">人文历史</Option>
              <Option value="2">时尚杂志</Option>
            </Select>
            <OptionList ref="OPTIONLIST1"/>
          </View>
          <View>
            <Select
              width={deviceWidth}
              ref="SELECT2"
              optionListRef={this._getOptionList.bind(this)}
              defaultValue="新旧程度"
              onSelect={this._canada.bind(this)}
              height={40}
              style={{justifyContent:'flex-start'}}
              >
              <Option value="0">九成新</Option>
              <Option value="1">八成新</Option>
              <Option value="2">七成新</Option>
              <Option value="3">六成新</Option>
            </Select>
            <OptionList ref="OPTIONLIST"/>
          </View>
          <View>
            <Select
              width={deviceWidth}
              ref="SELECT3"
              optionListRef={this._getOptionList.bind(this)}
              defaultValue="面向人群"
              onSelect={this._canada.bind(this)}
              height={40}
              style={{justifyContent:'flex-start'}}
              >
              <Option value="0">儿童</Option>
              <Option value="1">青少年</Option>
              <Option value="2">成人</Option>
              <Option value="3">老年人</Option>
            </Select>
            <OptionList ref="OPTIONLIST" height={200}/>
          </View>
          <TextInput
            style={{height:40}}
            placeholder="数量"
            onChangeText={(text) => this.setState({Storage: text})} />
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
            onChangeText={(text) => this.setState({Author: text})} />
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

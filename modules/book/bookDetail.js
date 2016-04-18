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

import BookIndex from './bookIndex';
import Button from './../../template/button';
export default class Detail extends Component {
  constructor(props){
    super(props);
    this.state={
      BookId:0,
      Name: '',
      Author:'',
      Classify:0,
      FaceToPeople:0,
      Level:0,
      MemberId:0,
      Storage:0,
      ProvideName:null,
      ProvidePhone:null,
      ProvideAddress:null,
      UserId:null,
      isBorrow:0,
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
  _operationBorrowBookRecord=(method)=>{
    fetch(Url+'api/Book/BorrowBookRecord?memberId='+this.state.UserId+'&bookId='+this.state.BookId,{
      method:method
    })
    .then((response)=>response.json())
    .then((responseData)=>{
      if(responseData.success){
        if(method=='Post'){
          this.setState({
            IsBorrow:1,
            Storage:this.state.Storage-1,
          });
        }
        else{
          this.setState({
            IsBorrow:0,
            Storage:this.state.Storage+1,
          });
        }
      }
      else{
        alert(responseData.msg);
      }
      
      
    })
    .done();
  };
  _deleteBook=()=>{
    fetch(Url+'api/Book/'+this.state.BookId,{
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
  _getMember=(bookId,memberId)=>{
    fetch(Url+'api/Book/CheckBorrowBookRecord?memberId='+memberId+'&bookId='+bookId,{
      method:"Get"
    })
    .then((response) => response.json())
    .then((responseData) => {
      if(responseData.success){
        this.setState({
          IsBorrow:1,
        });
      }
    })
    .done();
    
  };
  componentDidMount(){
    this.setState({
      BookId:this.props.Data.Id,
      Name: this.props.Data.Name,
      Author:this.props.Data.Author,
      Classify:this.props.Data.Classify,
      FaceToPeople:this.props.Data.FaceToPeople,
      Level:this.props.Data.Level,
      MemberId:this.props.Data.MemberId,
      Storage:this.props.Data.Storage,
      ProvideName:this.props.Data.ProvideName,
      ProvidePhone:this.props.Data.ProvidePhone,
      ProvideAddress:this.props.Data.ProvideAddress,
      UserId:this.props.User.id,
    });
    this._getMember(this.props.Data.Id,this.props.User.id);
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
            <Text style={{fontSize:20,color:'white'}}>返回</Text>
          </TouchableOpacity>
          <Text style={{flex:1,fontSize:20,color:'white',textAlign:'center'}}>{name}</Text>
          <TouchableOpacity
            style={{flex:1,  alignItems:'flex-end',}}
            onPress={()=>this._goToAddBook("新增读物",AddBook)}
          >
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row',padding:20}}>
          <Text style={{fontSize:15}}>书名:</Text>
          <Text style={{fontSize:15}}>{this.state.Name}</Text>
        </View>
        <View style={{flexDirection:'row',padding:20}}>
          <Text style={{fontSize:15}}>作者:</Text>
          <Text style={{fontSize:15}}>{this.state.Author}</Text>
        </View>
        <View style={{flexDirection:'row',padding:20}}>
          <Text style={{fontSize:15}}>分类:</Text>
          <Text style={{fontSize:15}}>{this.state.Classify}</Text>
        </View>
        <View style={{flexDirection:'row',padding:20}}>
          <Text style={{fontSize:15}}>面向人群:</Text>
          <Text style={{fontSize:15}}>{this.state.FaceToPeople}</Text>
        </View>
        <View style={{flexDirection:'row',padding:20}}>
          <Text style={{fontSize:15}}>新旧程度:</Text>
          <Text style={{fontSize:15}}>{this.state.Level}</Text>
        </View>
        <View style={{flexDirection:'row',padding:20}}>
          <Text style={{fontSize:15}}>可借阅数量:</Text>
          <Text style={{fontSize:15}}>{this.state.Storage}</Text>
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
              this.state.IsBorrow>0
              ?
              <Button bColor="green" text="还书" click={()=>this._operationBorrowBookRecord('Delete')}></Button>
              :
                this.state.Storage>0
                ?
                <Button bColor="green" text="可借阅" click={()=>this._operationBorrowBookRecord('Post')}></Button>
                :
                <Button bColor="green" text="无法借阅" click={this._operationBorrowBookRecord.bind(this)}></Button>
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

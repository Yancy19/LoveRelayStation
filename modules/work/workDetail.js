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
  ScrollView
} from 'react-native';

import WorkIndex from './workIndex';
import Button from './../../template/button';
export default class Detail extends Component {
  constructor(props){
    super(props);
    this.state={
      WorkId:null,
      MemberId:0,
      Position:null,
      WorkingTime:null,
      WorkingAddress:null,
      Salary:null,
      Number:null,
      Title:null,
      Description:null,
      UserId:null,
      isBorrow:0,
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
  // _operationBorrowBookRecord=(method)=>{
  //   fetch(Url+'api/Book/BorrowBookRecord?memberId='+this.state.UserId+'&bookId='+this.state.BookId,{
  //     method:method
  //   })
  //   .then((response)=>response.json())
  //   .then((responseData)=>{
  //     if(responseData.success){
  //       if(method=='Post'){
  //         this.setState({
  //           IsBorrow:1,
  //           Storage:this.state.Storage-1,
  //         });
  //       }
  //       else{
  //         this.setState({
  //           IsBorrow:0,
  //           Storage:this.state.Storage+1,
  //         });
  //       }
  //     }
  //     else{
  //       alert(responseData.msg);
  //     }
      
      
  //   })
  //   .done();
  // };
  _deleteBook=()=>{
    fetch(Url+'api/Work/'+this.state.WorkId,{
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
  // _getMember=(bookId,memberId)=>{
  //   fetch(Url+'api/Book/CheckBorrowBookRecord?memberId='+memberId+'&bookId='+bookId,{
  //     method:"Get"
  //   })
  //   .then((response) => response.json())
  //   .then((responseData) => {
  //     if(responseData.success){
  //       this.setState({
  //         IsBorrow:1,
  //       });
  //     }
  //   })
  //   .done();
    
  // };
  componentDidMount(){
    this.setState({
      WorkId:this.props.Data.Id,
      MemberId:this.props.Data.MemberId,
      Position:this.props.Data.Position,
      WorkingTime:this.props.Data.WorkingTime,
      WorkingAddress:this.props.Data.WorkingAddress,
      Salary:this.props.Data.Salary,
      Number:this.props.Data.Number,
      Title:this.props.Data.Title,
      Description:this.props.Data.Description,
      UserId:this.props.User.id,
    });
    // this._getMember(this.props.Data.Id,this.props.User.id);
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
          >
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row',padding:20}}>
          <Text style={{fontSize:15}}>标题:</Text>
          <Text style={{fontSize:15}}>{this.state.Title}</Text>
        </View>
        <View style={{flexDirection:'row',padding:20}}>
          <Text style={{fontSize:15}}>职位:</Text>
          <Text style={{fontSize:15}}>{this.state.Position}</Text>
        </View>
        <View style={{flexDirection:'row',padding:20}}>
          <Text style={{fontSize:15}}>工作时间:</Text>
          <Text style={{fontSize:15}}>{this.state.WorkingTime}</Text>
        </View>
        <View style={{flexDirection:'row',padding:20}}>
          <Text style={{fontSize:15}}>工作地点:</Text>
          <Text style={{fontSize:15}}>{this.state.WorkingAddress}</Text>
        </View>
        <View style={{flexDirection:'row',padding:20}}>
          <Text style={{fontSize:15}}>薪资:</Text>
          <Text style={{fontSize:15}}>{this.state.Salary}</Text>
        </View>
        <View style={{flexDirection:'row',padding:20}}>
          <Text style={{fontSize:15}}>人数:</Text>
          <Text style={{fontSize:15}}>{this.state.Number}</Text>
        </View>
        <View style={{flexDirection:'row',padding:20}}>
          <Text style={{fontSize:15}}>备注:</Text>
          <Text style={{fontSize:15}}>{this.state.Description}</Text>
        </View>
        <View>
          {
            this.state.MemberId==this.state.UserId
            ?
            <Button bColor="green" text="取消发布" click={()=>this._deleteBook()}></Button>
            :
              null
              // this.state.IsBorrow>0
              // ?
              // <Button bColor="green" text="还书" click={()=>this._operationBorrowBookRecord('Delete')}></Button>
              // :
              //   this.state.Storage>0
              //   ?
              //   <Button bColor="green" text="可借阅" click={()=>this._operationBorrowBookRecord('Post')}></Button>
              //   :
              //   <Button bColor="green" text="无法借阅" click={this._operationBorrowBookRecord.bind(this)}></Button>
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

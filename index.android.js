/**
 * Sample React Native App
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TextInput,
  Navigator,
  TouchableOpacity,
  ScrollView
} from 'react-native';

// global.Url='http://58.154.51.219:8010/';
global.Url='http://114.215.100.136:8010/';
import FirstRout from './template/firstRout';

class Project extends Component {

  componentDidMount(){
    // this.fetchDate();
  }
  // fetchDate(){
  //   fetch("http://58.154.51.219:8011/api/products",{
  //       method:'GET',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //       // body:JSON.stringify({
  //       //   username: "yygmember",
  //       //   password: "123123",
  //       //   checkCode:"",
  //       //   keep:false
  //       // })
  //     })
  //     .then((response)=>response.json())
  //     .then((responseDate)=>{
  //       this.setState({
  //         login:true
  //       });
  //     })
  //     .done();
  // }
  render() {
    return (
      <FirstRout/>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

AppRegistry.registerComponent('Project', () => Project);

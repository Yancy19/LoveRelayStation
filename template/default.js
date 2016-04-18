/**
 * Yancy 2016-3-18
 */
'use strict';
import React, {
  Component,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text
} from 'react-native';
import Storage from 'react-native-storage';

import Login from './login';
// import TabBar from './tabNav';
import Index from './index';


global.storage = new Storage({
    // maximum capacity, default 1000 
    size: 1000,    

    // expire time, default 1 day(1000 * 3600 * 24 secs)
    defaultExpires: 1000 * 3600 * 24,

    // cache data in the memory. default is true.
    enableCache: true,

    // if data was not found in storage or expired,
    // the corresponding sync method will be invoked and return 
    // the latest data.
    sync : {
        // we'll talk about the details later.
    }
  });

export default class Default extends Component {
  constructor(props){
    super(props);
    this.state={
      login:false,
    }
  }
  componentDidMount (){
    const { navigator } = this.props;
    storage.load({
      key: 'loginState',

      // autoSync(default true) means if data not found or expired,
      // then invoke the corresponding sync method
      autoSync: true,

      // syncInBackground(default true) means if data expired,
      // return the outdated data first while invoke the sync method.
      // It can be set to false to always return data provided by sync method when expired.(Of course it's slower)
      syncInBackground: true,
    }).then( ret => {
        // found data goes to then()
        navigator.replace({
            name: "welcome",
            component: Index,
        });
        // console.log(this);
    }).catch( err => {
        // any exception including data not found 
        // goes to catch()
        navigator.replace({
            name: "登陆",
            component: Login,
        });
        // console.warn(this);
    });
    
  }
  render(){
    return(
      <Text>正在加载电影数据……</Text>
    );
  }
}

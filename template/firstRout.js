/**
 * Yancy 2016-3-18
 */
'use strict';
import React, {
  Component,
  StyleSheet,
  View,
  Navigator
} from 'react-native';
import Default from './default';
// import Default from './../modules/book/addBook';
export default class Rout extends Component {

  render(){
    let defaultName = 'index/login';
    let defaultComponent = Default;
    return (
      <Navigator
        initialRoute={{ name: defaultName, component: defaultComponent }}
        configureScene={() => {
          // return Navigator.SceneConfigs.VerticalDownSwipeJump;
          // return Navigator.SceneConfigs.FloatFromRight;
          return Navigator.SceneConfigs.FadeAndroid;
        }}
        renderScene={(route, navigator) => {
          let Component = route.component;
          if(route.component) {
            return <Component {...route.params} navigator={navigator} name={route.name}/>
          }
        }} />
    );
  }
}

/**
 * Yancy 2016-4-24
 */
'use strict';
import React, {
  Component,
  StyleSheet,
  View,
  Dimensions,
  Image,
} from 'react-native';
let deviceWidth=Dimensions.get('window').width;
export class LogoImg extends Component {
  render(){
    const { name }=this.props;
    return (
	    <View>
	      <Image
	        style={styles.Logo}
	        source={require('./../images/logo.png')}/>
	    </View>
    );
  }
};
const styles=StyleSheet.create({
  Logo:{
    width:deviceWidth,
  }
});

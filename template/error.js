/**
 * Yancy 2016-4-24
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
} from 'react-native';

export class Developing extends Component{
	constructor(props){
		super(props);
		this.state={
			Time:5,
		}
	}
	_GoBack=()=>{
		

		// let setTime=setTimeout(
	 //      (timer) => {
	 //      	clearInterval(timer);
	 //      },
	 //      5000
	 //    );
	};
	componentDidMount() {
	    // this.timer = setTimeout(
	    //   () => { console.log('把一个定时器的引用挂在this上'); },
	    //   500
	    // );
	    let setInter=setInterval(()=>{
			this.setState({Time:this.state.Time-1});
		},1000);
		this.timer = setTimeout(
	      () => { 
	      	clearInterval(setInter);
	      	const { navigator } = this.props;
		    navigator.pop();
	      },
	      5000
	    );
	  }
  	componentWillUnmount() {
	    // 如果存在this.timer，则使用clearTimeout清空。
	    // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
	    this.timer && clearTimeout(this.timer);
  	}
	render(){
	    const { name }=this.props;
	    return(
	      <View style={styles.Error}>
	        <Text>该模块暂时未开放，正在研发中...</Text>
	        <Text>{this.state.Time}秒后自动跳回首页</Text>
	      </View>
	    );
  	}
};

const styles = StyleSheet.create({
  Error:{
  	flex:1,
    borderWidth:1,
    alignItems:'center',
    justifyContent:'center',
    borderColor:'#D8D8D8',
  },
})
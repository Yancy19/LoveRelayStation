/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */


/*使用方法：
 <TabBar tabBarPosition="bottom">
  <Index key='首页'/>
  <Img key='热销' />
  <JestPage key='故事' />
  <Drawer key='关于' />
</TabBar>
*/
'use strict';
import React,{
  Component,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import dimensions from 'Dimensions'
var deviceWidth=dimensions.get('window').width;
// var deviceWidth=Dimensions.get('window').width;
export default class MyComponent extends React.Component{
  // static propTypes = {
  //   style: View.propTypes.style,
  // };
  constructor(props){
    super(props);
    this.state={
      totla:0,
    }
  }
  componentWillMount(){
    // this.currentPage=0;
    // this.springSystem=new rebound.SpringSystem();
    // this.
    // this.scrollView.setNativeProps
  }
  goToPage(pageNumber){
    // this._scrollSpring.setEndValue(pageNumber);
    // this.props.onChangeTab&&this.props.onChangeTab({i:page,ref:this.props.children[pageNumber]})
    // this.setState(){
    //   return {totla:1}
    // }
    this.setState({
      totla: pageNumber,
    })
  }
  renderTabOption(name,page,numberOfTabs){
    return (
      <TouchableOpacity key={name} onPress={()=>this.goToPage(page)}>
        <View style={[styles.tab,{width:deviceWidth/numberOfTabs,}]}>
          <Image source={{uri:'http://sc5.io/blog/wp-content/uploads/2014/06/react.png'}} style={{flex:1,height:50,width:15}}/>
          <Text style={{fontSize:8}}>{name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  tabBar(numberOfTabs){
    var tabUnderLineStyel={
      position:'absolute',
      width:deviceWidth/numberOfTabs,
      height:2,
      backgroundColor:'blue',
      bottom:0,
    }
    return (
      <View style={styles.tabs}>
        {this.props.children.map((child,i)=>this.renderTabOption(child.key,i,numberOfTabs))}
        <View style={[tabUnderLineStyel,{transform:[{translateX:-(deviceWidth-(this.state.totla*(deviceWidth/numberOfTabs)))}]}]} />
      </View>
    )
  }
  render(){
    var numberOfTabs=this.props.children.length;
    var sceneContainerStyle={
      width:deviceWidth*numberOfTabs,
      flex:1,
      flexDirection:'row',
    }
    return (
      <View style={{flex:1}}>
        {this.props.tabBarPosition === 'top' ? this.tabBar(numberOfTabs) : null}
        <View style={[sceneContainerStyle,{transform:[{translateX:-(this.state.totla*deviceWidth)}]}]}>
          {this.props.children}
        </View>
        {this.props.tabBarPosition === 'bottom' ? this.tabBar(numberOfTabs) : null}
      </View>
    );
  }
};
const styles = StyleSheet.create({
  tab:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    marginTop:5,
  },
  tabs:{
    height:30,
    flexDirection:'row',
    borderWidth:1,
    borderTopWidth:0,
    borderLeftWidth:0,
    borderRightWidth:0,
    borderBottomColor:'#ccc',
  },
});

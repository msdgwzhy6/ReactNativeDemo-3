
import React, { Component } from 'react';
var BannerDetail = require('./BannerDetail');

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicatorIOS,
  Image,
  NavigatorIOS,
  ListView,
  TouchableHighlight,
} from 'react-native';

/*--  首页页面组件 --*/
class HomeScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,  //如果两次的数据不同的话，告诉数据源该数据发生了改变
      }),
      loaded: false,
      haha: null
    };
  }

  componentWillMount() {   //React会在react-native组件加载完成后，使用componentDidMount方法发送请求
    fetch('http://182.254.231.237/interface/banner.php?action=getBanner')
    .then((response) => response.json())
    .then((response) =>  {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(response.data),
            loaded: true,
        });
    })
    .done()
  }

  render() {
    var contents;
    if (!this.state.loaded) {
      contents = (
        <View style = {styles.loading}>
          <Text style = {styles.loadingText}>Loading</Text>
          <ActivityIndicatorIOS />
        </View>
      )
    }else {
      contents = (
        <ListView
         dataSource = {this.state.dataSource}
         renderRow = {(item) => {
           return (
             <TouchableHighlight
              underlayColor = "rgba(34,26,38,0.1)"  //设置点击后的背景颜色
              onPress = {() => {
                var _this = this;
                this.props.navigator.push({
                  title: item.photo_abstract,
                  component: BannerDetail,
                  passProps: { //传参到下一个界面
                    url: item.link_url,
                    valueFromBannerDetail(value) { //回调传值
                      _this.setState({
                        haha: value
                      });
                      console.log(_this.state.haha);
                    }
                  }
                })
             }}>
               <View>
                 <View style = {styles.row}>
                   <Image
                     source = {{uri:item.out_url}}
                     style = {styles.Img}>
                   </Image>
                   <View>
                     <Text style = {styles.name}>
                       {item.photo_abstract}
                     </Text>
                     <Text style = {styles.name}>
                       Star:{item.serial_num}
                     </Text>
                   </View>
                 </View>
                 <View style = {styles.cellBorder}></View>
               </View>
             </TouchableHighlight>
           );
         }}
         style = {styles.listView} />
      )
    }

    return (
      <View style = {styles.container_scene}>
        {contents}
      </View>
    );
  }

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    container_scene: {
      flex: 1,
      marginTop:64
    },
    loading: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center'
    },
    loadingText: {
       fontSize: 14,
       marginBottom: 20
    },
    listView: {
      paddingTop: 0,
      backgroundColor: '#F5FCFF',
    },
    row:{
      flexDirection:'row',
      padding:10,
    },
    name:{
      marginBottom:8,
      marginLeft:8,
    },
    Img:{
      width:50,
      height:50,
    },
    cellBorder:{
      height:1,
      marginLeft:2,
      backgroundColor:'#EAEAEA',
    }

});

module.exports = HomeScene;

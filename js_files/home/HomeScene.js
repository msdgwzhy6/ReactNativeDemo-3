
import React, {Component} from 'react';
import BannerDetail from './BannerDetail';
import Button from '../src/Button';

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
    TouchableOpacity
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
            .then((jsondata) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(jsondata.data),
                    loaded: true,
                });
            })
            .done()
    }

    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer);
    }

    render() {
        var contents;
        if (!this.state.loaded) {
            contents = (
                <View style={styles.loading}>
                    <Text style={styles.loadingText}>Loading</Text>
                    <ActivityIndicatorIOS />
                </View>
            )
        } else {
            contents = (
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.listViewRow}
                    style={styles.listView}/>
            )
        }
        return (
            <View style={styles.container_scene}>
                {contents}
            </View>
        );
    }

    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer);
    }

    //ListView行样式
    listViewRow = (item) => {
        var _this = this;
        return (
            <TouchableHighlight
                underlayColor="rgba(34,26,38,0.1)"      //设置点击后的背景颜色
                onPress={() => {
                    this.props.navigator.push({
                        title: item.photo_abstract,
                        component: BannerDetail,
                        passProps: {                    //传参到下一个界面
                            url: item.link_url,
                            valueFromBannerDetail(value) {          //回调传值
                                _this.setState({
                                    haha: value
                                });
                            }
                        }
                     })
                }}>
                <View >
                    <View style={{flexDirection:'row', justifyContent:'space-between', padding:10}}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Image
                                source={{uri:item.out_url}}
                                style={{width:150, height:80}}>
                            </Image>
                            <View style={{flexDirection:'column', marginLeft:10}}>
                                <Text style={{marginBottom:35}}>
                                    {item.photo_abstract}
                                </Text>
                                <Text>
                                    Star:{item.serial_num}
                                </Text>
                            </View>
                        </View>
                        <Button title="hah"
                                width="50"
                                height="50"
                                color="black"
                                backgroundColor="pink"
                                borderRadius="25"
                                onPress={this.fetchData} />
                    </View>
                    <View style={styles.cellBorder}></View>
                </View>
            </TouchableHighlight>
        );
    };

    fetchData = (enableCallBack) => {
        this.timer = setTimeout(() => {
            enableCallBack();
        },3000);
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    container_scene: {
        flex: 1,
        marginTop: 64
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
    cellBorder: {
        height: 1,
        marginLeft: 10,
        backgroundColor: '#EAEAEA',
    }

});

module.exports = HomeScene;

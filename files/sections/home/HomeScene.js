
import React, {Component} from 'react';
import BannerDetail from './BannerDetail';
//插件
import Swiper from 'react-native-swiper';
//自定义组件
import Button from '../../src/Button';
import NavigationBar from '../../src/NavigationBar';
import BusinnessButton from  './customUI/BussinessButton';


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
    TouchableOpacity,
    ScrollView
} from 'react-native';

/*--  首页页面组件 --*/
export default class HomeScene extends Component {

    /*--实例化阶段
        state:组件的属性,主要是用来存储组件自身需要的数据,
        每次数据的更新都是通过修改state属性的值,
        ReactJS内部会监听state属性的变化,
        一旦发生变化的话,就会主动触发组件的render方法来更新虚拟DOM结构。
        --*/
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            dataArr: null
        };
    }

    //在render前调用
    //业务逻辑处理都应该放在这里,如对state的操作等
    componentWillMount() {   //React会在react-native组件加载完成后，使用componentDidMount方法发送请求
        fetch('http://119.29.87.127/interface/banner.php?action=getBanner')
            .then((response) => response.json())
            .then((jsondata) => {
                this.setState({
                    loaded: true,
                    dataArr: jsondata.data
                });
            })
            .catch((error) => {
                console.warn(error);
            });
    }

    //根据state值,渲染并返回一个虚拟DOM
    render() {
        //添加轮播图图片
        let arr = [];
        for (let ob in this.state.dataArr) {
            arr.push(this.state.dataArr[ob]);
        }
        let bannerContents = [];
        for (let i = 0; i < arr.length; i++) {
            bannerContents.push(
                <TouchableOpacity
                    style={{flex: 1}}
                    key={i}
                    underlayColor="rgba(34,26,38,0.1)"
                    onPress={() => {
                        this.props.navigator.push({
                            component: BannerDetail,
                            params: {
                                url: arr[i].link_url,
                                title: arr[i].photo_abstract
                            }
                        })
                    }}>
                    <Image key={arr[i].serial_num} style={{flex: 1}} source={{uri:arr[i].out_url}} />
                </TouchableOpacity>
            );
        }

        var contents;
        if (!this.state.loaded) {
            contents = (
                <View style={styles.loading}>
                    <Text style={styles.loadingText}>Loading</Text>
                    <ActivityIndicatorIOS/>
                </View>
            )
        } else {
            //设置轮播图点的样式
            let dot = <View style={{backgroundColor:'white', width: 6, height: 6,borderRadius: 0, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />;
            let activeDot = <View style={{backgroundColor: 'gray', width: 10, height: 10, borderRadius: 0, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />;
            contents = (
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <View>
                        <Swiper height={160} showsButtons={false} showsPagination={true} paginationStyle={{justifyContent: 'flex-end',marginRight: 5,bottom: 5}} dot={dot} activeDot={activeDot} autoplay={true} autoplayTimeout={3}>
                            {bannerContents}
                        </Swiper>
                    </View>
                    <View style={{height: 15,backgroundColor: '#f0eff5'}}></View>
                    <View>
                        <View style={{flexDirection: 'row',justifyContent: 'space-around',marginTop: 15}}>
                            <BusinnessButton title="保障服务" index="0"/>
                            <BusinnessButton title="非诉讼业务" index="1"/>
                            <BusinnessButton title="诉讼业务" index="2"/>
                            <BusinnessButton title="免费咨询" index="3"/>
                        </View>
                        <View style={{height: 90,marginTop: 10,backgroundColor: '#2596FF'}}>
                            <Image style={{marginLeft: 30,marginTop: 12,width: 85, height: 66}} source={require('../../images/mainpage/kjds.png')} />
                        </View>
                    </View>
                </ScrollView>
            )
        }
        return (
            <View style={{flex: 1}}>
                <View style={styles.container_scene}>
                    {contents}
                </View>
            </View>

        );
    }

    bussiness = () => {

    }

    //在该方法中,ReactJS会使用render返回的虚拟DOM来创建一个真实DOM
    //组件内部可以通过this.getDOMNode()来获取当前组件的节点
    componentDidMount() {}

    /*--更新阶段
     主要发生在用户操作之后或父组件有更新的时候,
     此时会根据用户的操作行为进行相应的页面结构的调整
     --*/
    componentWillReceiveProps() {
        //该方法发生在this.props被修改或父组件调用setProps()方法之后
        //调用this.setState方法来完成对state的修改
    }

    shouldComponentUpdate() {
        //用来拦截新的props或state,根据逻辑来判断是否需要更新
        return true;//false
    }

    //shouldComponentUpdate() 返回true的时候执行
    componentWillUpdate() {
        //组件将更新
    }
    componentDidUpdate() {
        //组件更新完毕,经常在这里做一些DOM操作
    }

    /*--销毁阶段
        销毁时被调用,通常做一些取消事件绑定,移除虚拟DOM中对应的组件数据结构,销毁一些无效的定时器等工作--*/
    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer);
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    container_scene: {
        flex: 1,
        marginTop: 64,
        marginBottom: 49,
        backgroundColor: 'white'
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
        backgroundColor: 'white',
    },
    cellBorder: {
        height: 1,
        marginLeft: 10,
        backgroundColor: '#EAEAEA',
    },
    contentContainer: {
        backgroundColor: 'white',
    },

});


import React, {Component} from 'react';
import HomeScene from './home/HomeScene';
import Personal from './personal/Personal';
import ListSence from './list/ListSence';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TabBarIOS,
    StatusBar,
    NavigatorIOS,
    Navigator,
    TouchableOpacity,
    Image
} from 'react-native';

export default class Root extends Component {

    constructor(props) {
        super(props);
        StatusBar.setBarStyle(0); //设置状态栏颜色（0:黑色 1：白色）
        this.state = {
            selectedTab: 'home'
        };
    }

    changeTab = (tabName) => {
        this.setState({
            selectedTab: tabName
        });
    };

    render() {
        return (
            <TabBarIOS selectedTab={this.state.selectedTab}>
                <TabBarIOS.Item
                    title="首页"
                    icon={require('../images/tabBar/home@2x.png')}
                    selected={this.state.selectedTab === 'home'}
                    //onPress: 检测用户按下tab
                    onPress={() => this.changeTab('home')}>
                    <Home/>
                </TabBarIOS.Item>

                <TabBarIOS.Item
                    title="我的"
                    icon={require('../images/tabBar/personal@2x.png')}
                    selected={this.state.selectedTab === 'personal'}
                    onPress={() => this.changeTab('personal')}>
                    <Personal/>
                </TabBarIOS.Item>

                <TabBarIOS.Item
                    title="list"
                    icon={require('../images/tabBar/list@2x.png')}
                    selected={this.state.selectedTab === 'list'}
                    onPress={() => this.changeTab('list')}>
                    <List/>
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }
}

var NavigationBarRouteMapper = {
    LeftButton(route, navigator, index, navState) {
        //通过index判断栈内是否有其他页面,才显示返回按钮
        if (index > 0) {
            return (
                <View style={{}}>
                    <TouchableOpacity
                        underlayColor='transparent'
                        onPress={() => {if (index > 0) {navigator.pop()}}}>
                        <Image style={{width: 20,height: 20,marginTop: 10,marginLeft: 10}} source={require('../src/images/return.png')} />
                    </TouchableOpacity>
                </View>
            );
        }
    },
    RightButton(route, navigator, index, navState) {
        var view = route.component.name;
        var contents;
        var action = function () {};
        if (view == 'BannerDetail') {
            contents = (
                <Text style={{marginTop: 12,marginRight:10}}>
                    ALERT
                </Text>
            );
            action = () => {
                alert(route.params.title);
            }
        }
        return (
            <View style={{}}>
                <TouchableOpacity
                    onPress={action}>
                    {contents}
                </TouchableOpacity>
            </View>
        );
    },
    Title(route, navigator, index, navState) {
        var params = route.params;
        var title;

        if (route.name != null) {
            title = (
                <Image style={{width: 100,height: 20}} source={require('../images/toplogo.png')} />
            );
        }else {
            for (const key in params) {
                if (key == "title") {
                    let t = params[key];
                    title = (
                        <Text style={{fontSize: 17}}>
                            {t}
                        </Text>
                    );
                }
            }
        }

        return (
            <View style={{marginTop: 10}}>
                {title}
            </View>
        );
    }
};


class Home extends Component {
    render() {
        return (
            <Navigator
                style= {styles.container}
                initialRoute= {{
                    component: HomeScene,
                    name: 'home',
                }}
                navigationBar={
                    <Navigator.NavigationBar
                        routeMapper={NavigationBarRouteMapper}
                        style={{backgroundColor: '#F5FCFF',flexDirection:'row'}}
                    />
                }
                configureScene={() => {
                    return Navigator.SceneConfigs.FloatFromRight;  //切换动画
                }}
                renderScene={(route, navigator) => {
                    let Component = route.component;    //获取initialRoute中的compont
                    if(route.component) {
                        return <Component {...route.params} navigator={navigator} />
                    }
                }} >
            </Navigator>

            /*--
             <NavigatorIOS
                style={styles.container}
                initialRoute={{
                    component: HomeScene,
                    title: '第e律师',
                    //rightButtonTitle: 'more',
                    //onRightButtonPress: this.onRightButtonPress,
                }}>
             </NavigatorIOS>
             --*/

        );
    }
}

class List extends Component {
    render() {
        return (
            <Navigator
                style= {styles.container}
                initialRoute= {{
                    component: ListSence,
                    name: 'list',
                }}
                navigationBar={
                    <Navigator.NavigationBar
                        routeMapper={NavigationBarRouteMapper}
                        style={{backgroundColor: '#F5FCFF',flexDirection:'row'}}
                    />
                }
                configureScene={() => {
                    return Navigator.SceneConfigs.FloatFromRight;  //切换动画
                }}
                renderScene={(route, navigator) => {
                    let Component = route.component;    //获取initialRoute中的compont
                    if(route.component) {
                        return <Component {...route.params} navigator={navigator} />
                    }
                }} >
            </Navigator>

            /*--
             <NavigatorIOS
                style={styles.container}
                initialRoute={{
                    component: HomeScene,
                    title: '第e律师',
                    //rightButtonTitle: 'more',
                    //onRightButtonPress: this.onRightButtonPress,
             }}>
             </NavigatorIOS>
             --*/

        );
    }
}




const styles = StyleSheet.create({
    container: {
        flex: 1, //使得标记为容器的元素只占用的屏幕中的剩余空间，也就是只占用适应其内容的足够空间
        backgroundColor: '#F5FCFF',
    }

});


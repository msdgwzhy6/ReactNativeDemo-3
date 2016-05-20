import React, {Component} from 'react';
const HomeScene = require('./home/HomeScene');
const Personal = require('./personal/Personal');

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TabBarIOS,
    StatusBar,
    NavigatorIOS
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
                    icon={require('image!home')}
                    selected={this.state.selectedTab === 'home'}
                    //onPress: 检测用户按下tab
                    onPress={() => this.changeTab('home')}>
                    <Home/>

                </TabBarIOS.Item>

                <TabBarIOS.Item
                    title="我的"
                    icon={require('image!personal')}
                    selected={this.state.selectedTab === 'personal'}
                    onPress={() => this.changeTab('personal')}>
                    <Personal/>
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }
}

class Home extends Component {
    render() {
        return (
            <NavigatorIOS
                style={styles.container}
                initialRoute={{
                    component: HomeScene,
                    title: '第e律师',
                    //rightButtonTitle: 'more',
                    //onRightButtonPress: this.onRightButtonPress,
                }}>
            </NavigatorIOS>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, //使得标记为容器的元素只占用的屏幕中的剩余空间，也就是只占用适应其内容的足够空间
        backgroundColor: '#F5FCFF',
    }

});

